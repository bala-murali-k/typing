import { Box, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'

type Mode = 'text' | 'code'

const CODE_LANGUAGES = ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Bash', 'JSON', 'CSS', 'Rust']

interface HeroSectionCustomPageProps {
  onStart: (text: string, mode: Mode, language?: string) => void
}

export function HeroSectionCustomPageComponent({ onStart }: HeroSectionCustomPageProps) {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error('HeroSectionCustomPageComponent must be used within a ThemeContextComponent')
  }

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  const [mode, setMode] = useState<Mode>('text')
  const [language, setLanguage] = useState('JavaScript')
  const [pastedText, setPastedText] = useState('')
  const [error, setError] = useState('')

  const charCount = pastedText.trim().length
  const wordCount = pastedText.trim() ? pastedText.trim().split(/\s+/).length : 0
  const isReady = charCount >= 20

  const handleStart = () => {
    if (!isReady) {
      setError('Please paste at least 20 characters to start.')
      return
    }
    setError('')
    onStart(pastedText.trim(), mode, mode === 'code' ? language : undefined)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPastedText(e.target.value)
    if (error && e.target.value.trim().length >= 20) setError('')
  }

  return (
    <Box
      sx={{
        pt: { xs: '4rem', md: '5.5rem' },
        pb: { xs: '3rem', md: '4rem' },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-80px',
          left: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(245,200,66,0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(245,200,66,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            px: '0.85rem',
            py: '0.35rem',
            borderRadius: '4px',
            border: '1px solid',
            borderColor: isDark ? 'rgba(245,200,66,0.3)' : 'rgba(180,140,20,0.35)',
            background: isDark ? 'rgba(245,200,66,0.07)' : 'rgba(245,200,66,0.08)',
            mb: '1.25rem',
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isDark ? '#f5c842' : '#9a7c10',
              fontWeight: 500,
            }}
          >
            Custom Practice
          </Box>
        </Box>

        {/* Headline + description */}
        <Box
          component="h1"
          sx={{
            fontFamily: '"Syne", sans-serif',
            fontSize: { xs: '2.4rem', md: '3.2rem' },
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: muiTheme.palette.text.primary,
            mb: '0.75rem',
            '& em': { fontStyle: 'normal', color: '#f5c842' },
          }}
        >
          Paste it. <em>Type it.</em> Own it.
        </Box>

        <Box
          component="p"
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: muiTheme.palette.text.secondary,
            maxWidth: '500px',
            mb: '2.5rem',
            fontWeight: 400,
          }}
        >
          Drop any text or code snippet below. TypeForge turns it into a
          live typing drill — character by character, no shortcuts.
        </Box>

        {/* Main card */}
        <Box
          sx={{
            background: muiTheme.palette.background.paper,
            border: '1px solid',
            borderColor: muiTheme.palette.divider,
            borderRadius: '12px',
            overflow: 'hidden',
            maxWidth: '780px',
          }}
        >
          {/* Mode selector bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: muiTheme.palette.divider,
              px: '1rem',
              gap: '0',
            }}
          >
            {/* Mode tabs */}
            <Box sx={{ display: 'flex', gap: '0' }}>
              {(['text', 'code'] as Mode[]).map((m) => (
                <Box
                  key={m}
                  component="button"
                  onClick={() => setMode(m)}
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    px: '1rem',
                    py: '0.85rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: mode === m ? '#f5c842' : muiTheme.palette.text.secondary,
                    borderBottom: mode === m ? '2px solid #f5c842' : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                    '&:hover': { color: mode === m ? '#f5c842' : muiTheme.palette.text.primary },
                  }}
                >
                  {m === 'text' ? '¶ Text' : '</> Code'}
                </Box>
              ))}
            </Box>

            {/* Language picker — only visible in code mode */}
            {mode === 'code' && (
              <Box
                sx={{
                  ml: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Box
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    color: muiTheme.palette.text.disabled,
                    textTransform: 'uppercase',
                  }}
                >
                  lang:
                </Box>
                <Box
                  component="select"
                  value={language}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.78rem',
                    color: muiTheme.palette.text.primary,
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    border: '1px solid',
                    borderColor: muiTheme.palette.divider,
                    borderRadius: '4px',
                    px: '0.5rem',
                    py: '0.25rem',
                    outline: 'none',
                    cursor: 'pointer',
                    '&:focus': { borderColor: '#f5c842' },
                  }}
                >
                  {CODE_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </Box>
              </Box>
            )}

            {/* Char / word count */}
            <Box
              sx={{
                ml: mode === 'code' ? '1rem' : 'auto',
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.05em',
                color: muiTheme.palette.text.disabled,
                whiteSpace: 'nowrap',
              }}
            >
              {charCount} chars · {wordCount} words
            </Box>
          </Box>

          {/* Textarea */}
          <Box
            component="textarea"
            value={pastedText}
            onChange={handleTextChange}
            placeholder={
              mode === 'text'
                ? 'Paste any paragraph, article, or notes here…'
                : 'Paste your code snippet here — functions, queries, configs, anything…'
            }
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            sx={{
              width: '100%',
              minHeight: '200px',
              fontFamily: mode === 'code' ? '"IBM Plex Mono", monospace' : '"IBM Plex Sans", sans-serif',
              fontSize: mode === 'code' ? '0.9rem' : '1rem',
              lineHeight: 1.75,
              color: muiTheme.palette.text.primary,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              p: '1.25rem 1.5rem',
              display: 'block',
              boxSizing: 'border-box',
              letterSpacing: mode === 'code' ? '0.01em' : 'normal',
              '&::placeholder': {
                color: muiTheme.palette.text.disabled,
                fontStyle: 'italic',
              },
            }}
          />

          {/* Bottom action bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid',
              borderColor: muiTheme.palette.divider,
              px: '1.25rem',
              py: '0.85rem',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Error or hint */}
            <Box
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                color: error ? '#f87171' : muiTheme.palette.text.disabled,
                transition: 'color 0.2s',
              }}
            >
              {error || (isReady ? '✓ ready to start' : `paste at least 20 chars to start`)}
            </Box>

            {/* Clear + Start */}
            <Box sx={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              {pastedText && (
                <Box
                  component="button"
                  onClick={() => { setPastedText(''); setError('') }}
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    px: '0.9rem',
                    py: '0.55rem',
                    border: '1px solid',
                    borderColor: muiTheme.palette.divider,
                    borderRadius: '6px',
                    background: 'transparent',
                    color: muiTheme.palette.text.secondary,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    '&:hover': {
                      borderColor: muiTheme.palette.text.secondary,
                      color: muiTheme.palette.text.primary,
                    },
                  }}
                >
                  Clear
                </Box>
              )}

              <Box
                component="button"
                onClick={handleStart}
                disabled={!isReady}
                sx={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  letterSpacing: '-0.01em',
                  px: '1.4rem',
                  py: '0.6rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: isReady ? 'pointer' : 'not-allowed',
                  background: isReady ? '#f5c842' : (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'),
                  color: isReady ? '#0d0d0f' : muiTheme.palette.text.disabled,
                  transition: 'all 0.15s',
                  '&:hover': isReady ? {
                    background: '#ffd93d',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(245,200,66,0.25)',
                  } : {},
                }}
              >
                Start Typing →
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}