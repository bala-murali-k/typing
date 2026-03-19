import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'
import type { ContentMode, TestResult } from './test.utils'
import { DURATIONS, buildTokens } from './test.utils'

interface TypingSessionTestPageProps {
  // config
  contentMode: ContentMode
  isCode: boolean
  // text
  renderText: string
  // session state
  typed: string[]
  focused: boolean
  finished: boolean
  timeLeft: number
  wpm: number
  accuracy: number
  errors: number
  // timer progress 0-100
  timerProgress: number
  // results
  lastResult: TestResult | null
  isNewBest: boolean
  // refs
  inputRef: React.RefObject<HTMLInputElement | null>
  // callbacks
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onPaste: (e: React.ClipboardEvent) => void
  onFocus: () => void
  onBlur: () => void
  onReset: () => void
  onFocusArea: () => void
}

export function TypingSessionTestPageComponent({
  contentMode, isCode,
  renderText,
  typed, focused, finished, timeLeft, wpm, accuracy, errors, timerProgress,
  lastResult, isNewBest,
  inputRef,
  onKeyDown, onPaste, onFocus, onBlur, onReset, onFocusArea,
}: TypingSessionTestPageProps) {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('Must be used within ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  const correctColor = isDark ? '#4ade80' : '#16a34a'
  const wrongColor   = isDark ? '#f87171' : '#dc2626'

  return (
    <Box sx={{
      background: muiTheme.palette.background.paper,
      border: '1px solid',
      borderColor: focused ? 'rgba(245,200,66,0.45)' : muiTheme.palette.divider,
      borderRadius: '12px', overflow: 'hidden',
      transition: 'border-color 0.2s',
      position: 'relative',
      mb: '2rem',
    }}>

      {/* ── Stats bar ── */}
      <Box sx={{
        display: 'flex', alignItems: 'stretch',
        borderBottom: '1px solid', borderColor: muiTheme.palette.divider,
      }}>
        {[
          { label: 'WPM',  value: wpm,      unit: '' },
          { label: 'ACC',  value: accuracy,  unit: '%' },
          { label: 'TIME', value: timeLeft,  unit: 's' },
          { label: 'ERR',  value: errors,    unit: '' },
        ].map((s, i) => (
          <Box key={s.label} sx={{
            flex: 1, py: '1rem', px: '1.25rem',
            borderRight: i < 3 ? '1px solid' : 'none',
            borderColor: muiTheme.palette.divider,
            textAlign: 'center',
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
              color:
                s.label === 'TIME' && timeLeft <= 10 ? wrongColor
                : s.label === 'TIME' && timeLeft <= 20 ? '#f59e0b'
                : muiTheme.palette.text.primary,
            }}>
              {s.value}{s.unit}
            </Box>
          </Box>
        ))}

        <Box
          component="button" onClick={onReset}
          sx={{
            px: '1.25rem', background: 'transparent', border: 'none',
            borderLeft: '1px solid', borderColor: muiTheme.palette.divider,
            cursor: 'pointer', color: muiTheme.palette.text.secondary,
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem',
            letterSpacing: '0.05em', transition: 'color 0.15s',
            '&:hover': { color: '#f5c842' },
          }}
        >
          ↺ Reset
        </Box>
      </Box>

      {/* ── Timer progress bar ── */}
      <Box sx={{ height: '2px', background: muiTheme.palette.divider }}>
        <Box sx={{
          height: '100%', width: `${timerProgress}%`,
          background: timeLeft <= 10 ? wrongColor : 'linear-gradient(90deg, #f5c842, #ff9500)',
          transition: 'width 0.3s linear, background 0.3s',
        }} />
      </Box>

      {/* ── Typing area ── */}
      <Box
        onClick={onFocusArea}
        sx={{ p: { xs: '1.5rem', md: '2rem 2.5rem' }, cursor: 'text', position: 'relative' }}
      >
        {/* Hidden input — zero size, invisible, captures all keystrokes */}
        <Box
          component="input"
          ref={inputRef}
          type="text"
          value=""
          onChange={() => {}}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onFocus={onFocus}
          onBlur={onBlur}
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
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '0.4rem', zIndex: 2,
            background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(4px)', borderRadius: '0 0 12px 12px',
          }}>
            <Box sx={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.8rem',
              letterSpacing: '0.08em', color: muiTheme.palette.text.secondary,
            }}>
              click here or press any key to start
            </Box>
            <Box sx={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.68rem',
              color: muiTheme.palette.text.disabled,
            }}>
              ⌨️ timer starts on first keystroke
            </Box>
          </Box>
        )}

        {/* ── Text display ── */}
        <Box sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: { xs: '1rem', md: '1.15rem' },
          lineHeight: 2.1, letterSpacing: '0.01em',
          userSelect: 'none', wordBreak: 'normal', overflowWrap: 'break-word',
          whiteSpace: isCode ? 'pre-wrap' : 'normal',
          // Words mode: fixed typewriter window. Passages mode: natural height
          maxHeight: contentMode === 'words' ? '9.5em' : 'none',
          overflow:  contentMode === 'words' ? 'hidden'  : 'visible',
        }}>
          {buildTokens(renderText).map((token, ti) => (
            <Box
              key={ti} component="span"
              sx={{ display: token.isSpace ? 'inline' : 'inline-block', whiteSpace: 'pre' }}
            >
              {token.chars.map(({ ch, idx }) => {
                const isCorrect = idx < typed.length && typed[idx] === ch
                const isWrong   = idx < typed.length && typed[idx] !== ch
                const isCursor  = idx === typed.length
                return (
                  <Box key={idx} component="span" sx={{
                    position: 'relative',
                    color:
                      isCorrect ? correctColor
                      : isWrong  ? wrongColor
                      : isCursor ? muiTheme.palette.text.primary
                      : muiTheme.palette.text.disabled,
                    background: isWrong
                      ? (isDark ? 'rgba(248,113,113,0.12)' : 'rgba(220,38,38,0.08)')
                      : 'transparent',
                    borderRadius: isWrong ? '2px' : '0',
                    ...(isCursor && {
                      '&::before': {
                        content: '""', position: 'absolute',
                        left: '-1px', top: '10%', height: '80%', width: '2px',
                        background: '#f5c842', borderRadius: '1px',
                        animation: focused ? 'testblink 1s step-end infinite' : 'none',
                        opacity: focused ? undefined : 0.3,
                      },
                      '@keyframes testblink': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0 },
                      },
                    }),
                  }}>
                    {ch === ' ' ? '\u00A0' : ch}
                  </Box>
                )
              })}
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Results overlay ── */}
      {finished && lastResult && (
        <Box sx={{
          position: 'absolute', inset: 0,
          background: isDark ? 'rgba(13,13,15,0.94)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '1.25rem',
          borderRadius: '12px', zIndex: 10,
        }}>
          {isNewBest && (
            <Box sx={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#0d0d0f', background: '#f5c842',
              px: '0.85rem', py: '0.3rem', borderRadius: '4px',
            }}>
              🏆 New Personal Best!
            </Box>
          )}

          <Box sx={{
            fontFamily: '"Syne", sans-serif', fontSize: '5.5rem',
            fontWeight: 800, color: '#f5c842', letterSpacing: '-0.04em', lineHeight: 1,
          }}>
            {lastResult.wpm}
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
              { l: 'Accuracy', v: `${lastResult.accuracy}%` },
              { l: 'Errors',   v: lastResult.errors },
              { l: 'Duration', v: DURATIONS.find(d => d.value === lastResult.duration)?.label ?? '' },
              { l: 'Mode',     v: lastResult.mode === 'words' ? '∞ Words' : '¶ Passage' },
            ].map(s => (
              <Box key={s.l} sx={{ textAlign: 'center' }}>
                <Box sx={{
                  fontFamily: '"Syne", sans-serif', fontSize: '1.4rem',
                  fontWeight: 700, color: muiTheme.palette.text.primary,
                  letterSpacing: '-0.02em',
                }}>
                  {s.v}
                </Box>
                <Box sx={{
                  fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.65rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: muiTheme.palette.text.secondary,
                }}>
                  {s.l}
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            component="button" onClick={onReset}
            sx={{
              fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600,
              fontSize: '0.88rem', px: '1.4rem', py: '0.6rem',
              background: '#f5c842', color: '#0d0d0f',
              border: 'none', borderRadius: '6px', cursor: 'pointer',
              transition: 'all 0.15s',
              '&:hover': { background: '#ffd93d', transform: 'translateY(-1px)' },
            }}
          >
            Try Again →
          </Box>
        </Box>
      )}
    </Box>
  )
}