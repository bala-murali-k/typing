import { PRACTICE_CONTENT } from './practice.content'

// ── Word bank ─────────────────────────────────────────────────────────────────
export const WORD_BANK = [
  'the','be','to','of','and','a','in','that','have','it','for','not','on','with',
  'he','as','you','do','at','this','but','his','by','from','they','we','say','her',
  'she','or','an','will','my','one','all','would','there','their','what','so','up',
  'out','if','about','who','get','which','go','me','when','make','can','like','time',
  'no','just','him','know','take','people','into','year','your','good','some','could',
  'them','see','other','than','then','now','look','only','come','its','over','think',
  'also','back','after','use','two','how','our','work','first','well','way','even',
  'new','want','because','any','these','give','day','most','us','great','between',
  'need','large','often','hand','high','place','hold','real','life','few','open',
  'seem','together','next','white','begin','got','walk','group','always','music',
  'those','both','mark','book','letter','until','river','second','enough','plain',
  'ready','above','ever','list','though','feel','talk','soon','body','direct','focus',
  'build','change','system','point','play','small','number','off','move','live',
  'try','ask','turn','show','put','mean','differ','cause','much','before','long',
]

// ── Passage pool ──────────────────────────────────────────────────────────────
export const ALL_PASSAGES = Object.values(PRACTICE_CONTENT)
  .flatMap(byDiff => Object.values(byDiff).flat())

// ── Constants ─────────────────────────────────────────────────────────────────
export const DURATIONS = [
  { label: '30s',   value: 30  },
  { label: '1 min', value: 60  },
  { label: '2 min', value: 120 },
  { label: '3 min', value: 180 },
]

export const LS_KEY = 'typeforge_test_results'

// ── Types ─────────────────────────────────────────────────────────────────────
export type ContentMode = 'words' | 'passages'

export interface TestResult {
  wpm: number
  accuracy: number
  errors: number
  duration: number
  mode: ContentMode
  date: string
}

export interface StoredData {
  history: TestResult[]
  bests: Record<string, number> // `${duration}-${mode}` -> best wpm
}

// ── Utils ─────────────────────────────────────────────────────────────────────
export function bestKey(duration: number, mode: ContentMode): string {
  return `${duration}-${mode}`
}

export function loadData(): StoredData {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { history: [], bests: {} }
}

export function saveResult(result: TestResult): StoredData {
  const data = loadData()
  data.history = [result, ...data.history].slice(0, 10)
  const key = bestKey(result.duration, result.mode)
  const prev = data.bests[key] ?? 0
  if (result.wpm > prev) data.bests[key] = result.wpm
  localStorage.setItem(LS_KEY, JSON.stringify(data))
  return data
}

export function generateWords(count: number): string[] {
  return Array.from({ length: count }, () =>
    WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]
  )
}

export function randomPassage() {
  return ALL_PASSAGES[Math.floor(Math.random() * ALL_PASSAGES.length)]
}

export function buildTokens(src: string) {
  const tokens: { chars: { ch: string; idx: number }[]; isSpace: boolean }[] = []
  let current: { ch: string; idx: number }[] = []
  src.split('').forEach((ch, i) => {
    if (ch === ' ' || ch === '\n') {
      if (current.length) { tokens.push({ chars: current, isSpace: false }); current = [] }
      tokens.push({ chars: [{ ch, idx: i }], isSpace: true })
    } else {
      current.push({ ch, idx: i })
    }
  })
  if (current.length) tokens.push({ chars: current, isSpace: false })
  return tokens
}

export function calcWpm(len: number, start: number): number {
  const mins = (Date.now() - start) / 60000
  return mins > 0 ? Math.round((len / 5) / mins) : 0
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return (
    d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) +
    ' · ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  )
}