import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Box } from '@mui/material'
import { PRACTICE_CONTENT } from './sections/practice.content'
import type { ContentMode, TestResult, StoredData } from './sections/test.utils'
import {
  generateWords, randomPassage, calcWpm, bestKey,
  loadData, saveResult, LS_KEY,
} from './sections/test.utils'
import { HeroSectionTestPageComponent } from './sections/hero.section.test.component'
import { ControlsSectionTestPageComponent } from './sections/controls.section.test.component'
import { TypingSessionTestPageComponent } from './sections/typingsession.section.test.component'
import { HistoryTableTestPageComponent } from './sections/historytable.section.test.component'

// Flatten all practice passages once at module level
const ALL_PASSAGES = Object.values(PRACTICE_CONTENT)
  .flatMap(byDiff => Object.values(byDiff).flat())

export function CoreTestPageComponent() {
  // ── Config ────────────────────────────────────────────────────────────────
  const [duration, setDuration] = useState(60)
  const [contentMode, setContentMode] = useState<ContentMode>('words')
  const [words, setWords] = useState<string[]>(() => generateWords(120))
  const [passage, setPassage] = useState(() => randomPassage())

  // ── Session ───────────────────────────────────────────────────────────────
  const [typed, setTyped] = useState<string[]>([])
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [errors, setErrors] = useState(0)

  // ── Persistence ───────────────────────────────────────────────────────────
  const [storedData, setStoredData] = useState<StoredData>(() => loadData())
  const [lastResult, setLastResult] = useState<TestResult | null>(null)
  const [isNewBest, setIsNewBest] = useState(false)

  // ── Refs ──────────────────────────────────────────────────────────────────
  const inputRef = useRef<HTMLInputElement | null>(null)
  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const typedRef = useRef<string[]>([])
  const activeRef = useRef(false)
  const wordsRef = useRef<string[]>(words)

  // ── Derived ───────────────────────────────────────────────────────────────
  const fullText = useMemo(
    () => contentMode === 'words' ? words.join(' ') : passage.text,
    [contentMode, words, passage]
  )

  const isCode = contentMode === 'passages' && passage.lang != null
  const timerProgress = ((duration - timeLeft) / duration) * 100
  const renderText = contentMode === 'words'
    ? fullText.slice(0, typed.length + 300)
    : fullText

  // ── calcAccuracy ──────────────────────────────────────────────────────────
  const calcAccuracy = useCallback((arr: string[]): number => {
    if (!arr.length) return 100
    let correct = 0
    arr.forEach((ch, i) => { if (ch === fullText[i]) correct++ })
    setErrors(arr.length - correct)
    return Math.round((correct / arr.length) * 100)
  }, [fullText])

  // ── finish ────────────────────────────────────────────────────────────────
  const finish = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    activeRef.current = false
    setActive(false)
    setFinished(true)

    if (!startTimeRef.current) return
    const finalWpm    = calcWpm(typedRef.current.length, startTimeRef.current)
    const finalAcc    = calcAccuracy(typedRef.current)
    const finalErrors = typedRef.current.filter((ch, i) => ch !== fullText[i]).length
    const prevBest    = loadData().bests[bestKey(duration, contentMode)] ?? 0

    const result: TestResult = {
      wpm: finalWpm, accuracy: finalAcc, errors: finalErrors,
      duration, mode: contentMode, date: new Date().toISOString(),
    }
    const updated = saveResult(result)
    setStoredData(updated)
    setLastResult(result)
    setIsNewBest(finalWpm > prevBest)
  }, [calcAccuracy, duration, contentMode, fullText])

  // ── reset ─────────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    activeRef.current = false
    startTimeRef.current = null
    typedRef.current = []

    if (contentMode === 'words') {
      const next = generateWords(120)
      wordsRef.current = next
      setWords(next)
    } else {
      setPassage(randomPassage())
    }

    setTyped([])
    setActive(false)
    setFinished(false)
    setTimeLeft(duration)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setLastResult(null)
    setIsNewBest(false)
    inputRef.current?.focus({ preventScroll: true })
  }, [duration, contentMode])

  // Reset on duration or mode change
  useEffect(() => { reset() }, [duration, contentMode]) // eslint-disable-line

  // ── handleKeyDown ─────────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (finished) return
    if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) { e.preventDefault(); return }
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape', 'Tab'].includes(e.key)) { e.preventDefault(); return }

    if (e.key === 'Backspace') {
      e.preventDefault()
      setTyped(prev => {
        const next = prev.slice(0, -1)
        typedRef.current = next
        setAccuracy(calcAccuracy(next))
        if (startTimeRef.current) setWpm(calcWpm(next.length, startTimeRef.current))
        return next
      })
      return
    }

    if (e.key.length !== 1) return
    e.preventDefault()

    setTyped(prev => {
      if (prev.length >= fullText.length) return prev
      const next = [...prev, e.key]
      typedRef.current = next

      // Start timer on first keystroke
      if (!activeRef.current && next.length === 1) {
        const now = Date.now()
        startTimeRef.current = now
        activeRef.current = true
        setActive(true)

        intervalRef.current = window.setInterval(() => {
          if (!startTimeRef.current) return
          const elapsed = (Date.now() - startTimeRef.current) / 1000
          const rem = Math.max(0, Math.round(duration - elapsed))
          setTimeLeft(rem)
          setWpm(calcWpm(typedRef.current.length, startTimeRef.current))
          if (rem <= 0) finish()
        }, 300)
      }

      if (startTimeRef.current) setWpm(calcWpm(next.length, startTimeRef.current))
      setAccuracy(calcAccuracy(next))

      // Words mode: extend bank near end
      if (contentMode === 'words' && next.length > wordsRef.current.join(' ').length - 200) {
        const more = generateWords(60)
        wordsRef.current = [...wordsRef.current, ...more]
        setWords([...wordsRef.current])
      }

      // Passages mode: finish on completion
      if (contentMode === 'passages' && next.length >= fullText.length) finish()

      return next
    })
  }, [finished, fullText, calcAccuracy, finish, duration, contentMode])

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])
  useEffect(() => { inputRef.current?.focus({ preventScroll: true }) }, [])

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ pt: { xs: '4rem', md: '5.5rem' }, pb: '5rem', position: 'relative' }}>

      {/* Ambient glow */}
      <Box sx={{
        position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(245,200,66,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>

        <HeroSectionTestPageComponent
          duration={duration}
          contentMode={contentMode}
          storedData={storedData}
        />

        <ControlsSectionTestPageComponent
          duration={duration}
          contentMode={contentMode}
          passage={passage}
          onDurationChange={setDuration}
          onModeChange={setContentMode}
          onReset={reset}
        />

        <TypingSessionTestPageComponent
          contentMode={contentMode}
          isCode={isCode}
          renderText={renderText}
          typed={typed}
          focused={focused}
          finished={finished}
          timeLeft={timeLeft}
          wpm={wpm}
          accuracy={accuracy}
          errors={errors}
          timerProgress={timerProgress}
          lastResult={lastResult}
          isNewBest={isNewBest}
          inputRef={inputRef}
          onKeyDown={handleKeyDown}
          onPaste={(e) => e.preventDefault()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onReset={reset}
          onFocusArea={() => inputRef.current?.focus({ preventScroll: true })}
        />

        <HistoryTableTestPageComponent
          storedData={storedData}
          lastResult={lastResult}
          onClear={() => {
            localStorage.removeItem(LS_KEY)
            setStoredData({ history: [], bests: {} })
          }}
        />

      </Box>
    </Box>
  )
}