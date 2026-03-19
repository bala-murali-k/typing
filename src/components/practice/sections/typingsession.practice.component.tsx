import { Box, useTheme } from '@mui/material'
import { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'
import { type PracticeSnippet, type Category, type Difficulty, DIFFICULTY_META } from './practice.content'

interface TypingSessionPracticePageProps {
  snippet: PracticeSnippet
  category: Category
  difficulty: Difficulty
  onBack: () => void
  onNext: () => void
}

export function TypingSessionPracticePageComponent({
  snippet, category, difficulty, onBack, onNext,
}: TypingSessionPracticePageProps) {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('Must be used within ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  const [typed, setTyped] = useState<string[]>([])
  const [focused, setFocused] = useState(false)
  const [finished, setFinished] = useState(false)
//   const [active, setActive] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [errors, setErrors] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const typedRef = useRef<string[]>([])
  const activeRef = useRef(false)

  const text = snippet.text
  const isCode = category === 'code' || category === 'devtools'
  const diffColor = DIFFICULTY_META[difficulty].color

  const calcWpm = (len: number, start: number) => {
    const mins = (Date.now() - start) / 60000
    return mins > 0 ? Math.round((len / 5) / mins) : 0
  }

  const calcAccuracy = useCallback((arr: string[]): number => {
    if (!arr.length) return 100
    let correct = 0
    arr.forEach((ch, i) => { if (ch === text[i]) correct++ })
    setErrors(arr.length - correct)
    return Math.round((correct / arr.length) * 100)
  }, [text])

  const finish = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    activeRef.current = false
    // setActive(false)
    setFinished(true)
    if (startTimeRef.current) {
      setElapsedSeconds(Math.round((Date.now() - startTimeRef.current) / 1000))
      setWpm(calcWpm(typedRef.current.length, startTimeRef.current))
    }
  }, [])

  const retrySession = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    activeRef.current = false
    startTimeRef.current = null
    typedRef.current = []
    setTyped([])
    // setActive(false)
    setFinished(false)
    setElapsedSeconds(0)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    inputRef.current?.focus({ preventScroll: true })
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (finished) return
    if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) { e.preventDefault(); return }
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape'].includes(e.key)) { e.preventDefault(); return }

    // Allow Tab as a character in code/devtools mode (common in indented code)
    if (e.key === 'Tab') {
      if (!isCode) { e.preventDefault(); return }
      e.preventDefault()
      // Insert two spaces for tab in code mode
      setTyped(prev => {
        if (prev.length >= text.length) return prev
        const spaces = '  '
        const next = [...prev, ...spaces.split('')]
        typedRef.current = next
        setAccuracy(calcAccuracy(next))
        if (startTimeRef.current) setWpm(calcWpm(next.length, startTimeRef.current))
        if (next.length >= text.length) finish()
        return next
      })
      return
    }

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
      if (prev.length >= text.length) return prev
      const next = [...prev, e.key]
      typedRef.current = next

      if (!activeRef.current && next.length === 1) {
        const now = Date.now()
        startTimeRef.current = now
        activeRef.current = true
        // setActive(true)
        intervalRef.current = window.setInterval(() => {
          if (!startTimeRef.current) return
          const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
          setElapsedSeconds(elapsed)
          setWpm(calcWpm(typedRef.current.length, startTimeRef.current))
        }, 500)
      }

      if (startTimeRef.current) setWpm(calcWpm(next.length, startTimeRef.current))
      setAccuracy(calcAccuracy(next))
      if (next.length === text.length) finish()
      return next
    })
  }, [finished, text, calcAccuracy, finish, isCode])

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
    document.getElementById('practice-typing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [snippet])

  const progress = (typed.length / text.length) * 100
  const correctColor = isDark ? '#4ade80' : '#16a34a'
  const wrongColor = isDark ? '#f87171' : '#dc2626'

  const formatTime = (s: number) => s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`

  // Word-grouped token builder (same approach as custom test)
  const buildTokens = (src: string) => {
    const tokens: { chars: { ch: string; idx: number }[]; isNewline: boolean; isSpace: boolean }[] = []
    let current: { ch: string; idx: number }[] = []
    src.split('').forEach((ch, i) => {
      if (ch === '\n') {
        if (current.length) { tokens.push({ chars: current, isSpace: false, isNewline: false }); current = [] }
        tokens.push({ chars: [{ ch, idx: i }], isSpace: false, isNewline: true })
      } else if (ch === ' ') {
        if (current.length) { tokens.push({ chars: current, isSpace: false, isNewline: false }); current = [] }
        tokens.push({ chars: [{ ch, idx: i }], isSpace: true, isNewline: false })
      } else {
        current.push({ ch, idx: i })
      }
    })
    if (current.length) tokens.push({ chars: current, isSpace: false, isNewline: false })
    return tokens
  }

  return (
    <Box id="practice-typing" sx={{ mb: '5rem', pt: { xs: '2rem', md: '2.5rem' }, scrollMarginTop: '80px' }}>

      {/* Header bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem', mb: '1.5rem', flexWrap: 'wrap' }}>
        <Box sx={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: muiTheme.palette.text.secondary,
        }}>
          Practice
        </Box>
        {/* Difficulty badge */}
        <Box sx={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.65rem',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: diffColor, background: `${diffColor}18`,
          px: '0.5rem', py: '0.15rem', borderRadius: '3px',
        }}>
          {DIFFICULTY_META[difficulty].label}
        </Box>
        {snippet.lang && (
          <Box sx={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.65rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: muiTheme.palette.text.secondary,
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            px: '0.5rem', py: '0.15rem', borderRadius: '3px',
          }}>
            {snippet.lang}
          </Box>
        )}
        <Box sx={{ flex: 1, height: '1px', background: muiTheme.palette.divider }} />
        <Box
          component="button" onClick={onBack}
          sx={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem',
            letterSpacing: '0.08em', background: 'transparent',
            border: '1px solid', borderColor: muiTheme.palette.divider,
            borderRadius: '4px', px: '0.75rem', py: '0.3rem',
            color: muiTheme.palette.text.secondary, cursor: 'pointer',
            transition: 'all 0.15s',
            '&:hover': { borderColor: '#f5c842', color: '#f5c842' },
          }}
        >
          ← Back
        </Box>
      </Box>

      <Box sx={{
        background: muiTheme.palette.background.paper,
        border: '1px solid',
        borderColor: focused ? 'rgba(245,200,66,0.45)' : muiTheme.palette.divider,
        borderRadius: '12px', overflow: 'hidden',
        transition: 'border-color 0.2s', position: 'relative',
      }}>

        {/* Stats bar */}
        <Box sx={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid', borderColor: muiTheme.palette.divider }}>
          {[
            { label: 'WPM',      value: wpm,                    unit: '' },
            { label: 'ACC',      value: accuracy,               unit: '%' },
            { label: 'TIME',     value: formatTime(elapsedSeconds), unit: '' },
            { label: 'PROGRESS', value: Math.round(progress),   unit: '%' },
          ].map((s, i) => (
            <Box key={s.label} sx={{
              flex: 1, py: '1rem', px: '1.25rem',
              borderRight: i < 3 ? '1px solid' : 'none',
              borderColor: muiTheme.palette.divider, textAlign: 'center',
            }}>
              <Box sx={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.65rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: muiTheme.palette.text.secondary, mb: '0.2rem',
              }}>
                {s.label}
              </Box>
              <Box sx={{
                fontFamily: '"Syne", sans-serif', fontSize: '1.5rem',
                fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1,
                color: muiTheme.palette.text.primary,
              }}>
                {s.value}{s.unit}
              </Box>
            </Box>
          ))}
          <Box
            component="button" onClick={retrySession}
            sx={{
              px: '1.25rem', background: 'transparent', border: 'none',
              borderLeft: '1px solid', borderColor: muiTheme.palette.divider,
              cursor: 'pointer', color: muiTheme.palette.text.secondary,
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem',
              letterSpacing: '0.05em', transition: 'color 0.15s',
              '&:hover': { color: '#f5c842' },
            }}
          >
            ↺ Retry
          </Box>
        </Box>

        {/* Progress bar */}
        <Box sx={{ height: '2px', background: muiTheme.palette.divider }}>
          <Box sx={{
            height: '100%', width: `${progress}%`,
            background: `linear-gradient(90deg, #f5c842, ${diffColor})`,
            transition: 'width 0.05s ease',
          }} />
        </Box>

        {/* Typing area */}
        <Box
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          sx={{ p: { xs: '1.5rem', md: '2rem 2.5rem' }, cursor: 'text', position: 'relative' }}
        >
          {/* Hidden input */}
          <Box
            component="input" ref={inputRef}
            type="text" value="" onChange={() => {}}
            onKeyDown={handleKeyDown}
            onPaste={(e: React.ClipboardEvent) => e.preventDefault()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={finished}
            sx={{
              position: 'absolute', opacity: 0, pointerEvents: 'none',
              width: '1px', height: '1px', padding: 0, margin: 0,
              border: 'none', outline: 'none', top: 0, left: 0,
            }}
          />

          {/* Unfocused overlay */}
          {!focused && !finished && (
            <Box sx={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '0.4rem', zIndex: 2,
              background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(4px)', borderRadius: '0 0 12px 12px',
            }}>
              <Box sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.8rem', letterSpacing: '0.08em', color: muiTheme.palette.text.secondary }}>
                click here or press any key to start
              </Box>
              <Box sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.68rem', color: muiTheme.palette.text.disabled }}>
                ⌨️ keyboard only · no timer · no paste
              </Box>
            </Box>
          )}

          {/* Word-grouped character display */}
          <Box sx={{
            fontFamily: isCode ? '"IBM Plex Mono", monospace' : '"IBM Plex Sans", sans-serif',
            fontSize: { xs: '0.95rem', md: isCode ? '1rem' : '1.1rem' },
            lineHeight: isCode ? 1.9 : 2.0,
            letterSpacing: isCode ? '0.02em' : '0.01em',
            mb: '1.5rem', userSelect: 'none',
            wordBreak: 'normal', overflowWrap: 'break-word',
            whiteSpace: isCode ? 'pre-wrap' : 'normal',
          }}>
            {buildTokens(text).map((token, ti) => {
              if (token.isNewline) {
                const { idx } = token.chars[0]
                const isCorrect = idx < typed.length && typed[idx] === '\n'
                const isWrong   = idx < typed.length && typed[idx] !== '\n'
                const isCursor  = idx === typed.length
                return (
                  <Box key={ti} component="span" sx={{
                    position: 'relative',
                    ...(isCursor && {
                      '&::before': {
                        content: '""', position: 'absolute',
                        left: '-1px', top: '10%', height: '80%', width: '2px',
                        background: '#f5c842', borderRadius: '1px',
                        animation: focused ? 'pracblink 1s step-end infinite' : 'none',
                        opacity: focused ? undefined : 0.3,
                      },
                      '@keyframes pracblink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
                    }),
                    color: isCorrect ? correctColor : isWrong ? wrongColor : muiTheme.palette.text.disabled,
                  }}>
                    {'\n'}
                  </Box>
                )
              }

              return (
                <Box
                  key={ti}
                  component="span"
                  sx={{ display: token.isSpace ? 'inline' : 'inline-block', whiteSpace: 'pre' }}
                >
                  {token.chars.map(({ ch, idx }) => {
                    const isCorrect = idx < typed.length && typed[idx] === ch
                    const isWrong   = idx < typed.length && typed[idx] !== ch
                    const isCursor  = idx === typed.length
                    return (
                      <Box
                        key={idx} component="span"
                        sx={{
                          position: 'relative',
                          color: isCorrect ? correctColor : isWrong ? wrongColor : isCursor ? muiTheme.palette.text.primary : muiTheme.palette.text.disabled,
                          background: isWrong ? (isDark ? 'rgba(248,113,113,0.12)' : 'rgba(220,38,38,0.08)') : 'transparent',
                          borderRadius: isWrong ? '2px' : '0',
                          ...(isCursor && {
                            '&::before': {
                              content: '""', position: 'absolute',
                              left: '-1px', top: '10%', height: '80%', width: '2px',
                              background: '#f5c842', borderRadius: '1px',
                              animation: focused ? 'pracblink 1s step-end infinite' : 'none',
                              opacity: focused ? undefined : 0.3,
                            },
                          }),
                        }}
                      >
                        {ch}
                      </Box>
                    )
                  })}
                </Box>
              )
            })}
          </Box>

          {/* Completion progress bar */}
          <Box sx={{ height: '3px', background: muiTheme.palette.divider, borderRadius: '2px', overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: `${progress}%`, background: '#f5c842', borderRadius: '2px', transition: 'width 0.05s ease' }} />
          </Box>
        </Box>

        {/* Results overlay */}
        {finished && (
          <Box sx={{
            position: 'absolute', inset: 0,
            background: isDark ? 'rgba(13,13,15,0.92)' : 'rgba(255,255,255,0.93)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '1.25rem',
            borderRadius: '12px', zIndex: 10,
          }}>
            <Box sx={{
              fontFamily: '"Syne", sans-serif', fontSize: '5.5rem',
              fontWeight: 800, color: '#f5c842', letterSpacing: '-0.04em', lineHeight: 1,
            }}>
              {wpm}
            </Box>
            <Box sx={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.68rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: muiTheme.palette.text.secondary, mt: '-0.5rem',
            }}>
              words per minute
            </Box>
            <Box sx={{ display: 'flex', gap: '2.5rem' }}>
              {[
                { l: 'Accuracy', v: `${accuracy}%`            },
                { l: 'Errors',   v: errors                     },
                { l: 'Time',     v: formatTime(elapsedSeconds) },
              ].map(s => (
                <Box key={s.l} sx={{ textAlign: 'center' }}>
                  <Box sx={{ fontFamily: '"Syne", sans-serif', fontSize: '1.4rem', fontWeight: 700, color: muiTheme.palette.text.primary, letterSpacing: '-0.02em' }}>
                    {s.v}
                  </Box>
                  <Box sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: muiTheme.palette.text.secondary }}>
                    {s.l}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: '0.75rem', mt: '0.25rem' }}>
              <Box
                component="button" onClick={retrySession}
                sx={{
                  fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600,
                  fontSize: '0.88rem', px: '1.4rem', py: '0.6rem',
                  background: '#f5c842', color: '#0d0d0f',
                  border: 'none', borderRadius: '6px', cursor: 'pointer',
                  transition: 'all 0.15s',
                  '&:hover': { background: '#ffd93d', transform: 'translateY(-1px)' },
                }}
              >
                Retry
              </Box>
              <Box
                component="button" onClick={onNext}
                sx={{
                  fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 500,
                  fontSize: '0.88rem', px: '1.4rem', py: '0.6rem',
                  background: 'transparent', color: muiTheme.palette.text.secondary,
                  border: '1px solid', borderColor: muiTheme.palette.divider,
                  borderRadius: '6px', cursor: 'pointer', transition: 'all 0.15s',
                  '&:hover': { borderColor: '#f5c842', color: '#f5c842' },
                }}
              >
                Next Snippet →
              </Box>
              <Box
                component="button" onClick={onBack}
                sx={{
                  fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 500,
                  fontSize: '0.88rem', px: '1.4rem', py: '0.6rem',
                  background: 'transparent', color: muiTheme.palette.text.secondary,
                  border: '1px solid', borderColor: muiTheme.palette.divider,
                  borderRadius: '6px', cursor: 'pointer', transition: 'all 0.15s',
                  '&:hover': { borderColor: muiTheme.palette.text.secondary, color: muiTheme.palette.text.primary },
                }}
              >
                Back
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}