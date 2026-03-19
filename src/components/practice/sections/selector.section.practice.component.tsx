import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'
import {
  type Category, type Difficulty,
  CATEGORY_META, DIFFICULTY_META,
  PRACTICE_CONTENT, type PracticeSnippet,
} from './practice.content'

interface SelectorSectionPracticePageProps {
  selectedCategory: Category
  selectedDifficulty: Difficulty
  selectedSnippet: PracticeSnippet | null
  onCategoryChange: (c: Category) => void
  onDifficultyChange: (d: Difficulty) => void
  onSnippetChange: (s: PracticeSnippet) => void
  onStart: () => void
}

export function SelectorSectionPracticePageComponent({
  selectedCategory,
  selectedDifficulty,
  selectedSnippet,
  onCategoryChange,
  onDifficultyChange,
  onSnippetChange,
  onStart,
}: SelectorSectionPracticePageProps) {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('Must be used within ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  const snippets = PRACTICE_CONTENT[selectedCategory][selectedDifficulty]
  const diffColor = DIFFICULTY_META[selectedDifficulty].color

  return (
    <Box sx={{ pt: { xs: '4rem', md: '5.5rem' }, pb: '3rem', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <Box sx={{
        position: 'absolute', top: '-80px', right: '-60px',
        width: '480px', height: '480px', borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(245,200,66,0.05) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(245,200,66,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <Box sx={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          px: '0.85rem', py: '0.35rem', borderRadius: '4px',
          border: '1px solid',
          borderColor: isDark ? 'rgba(245,200,66,0.3)' : 'rgba(180,140,20,0.35)',
          background: isDark ? 'rgba(245,200,66,0.07)' : 'rgba(245,200,66,0.08)',
          mb: '1.25rem',
        }}>
          <Box component="span" sx={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.72rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: isDark ? '#f5c842' : '#9a7c10', fontWeight: 500,
          }}>
            Practice Mode · No Timer
          </Box>
        </Box>

        {/* Headline */}
        <Box component="h1" sx={{
          fontFamily: '"Syne", sans-serif',
          fontSize: { xs: '2.2rem', md: '3rem' },
          fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
          color: muiTheme.palette.text.primary, mb: '0.75rem',
          '& em': { fontStyle: 'normal', color: '#f5c842' },
        }}>
          Pick a drill. <em>Just type.</em>
        </Box>

        <Box component="p" sx={{
          fontFamily: '"IBM Plex Sans", sans-serif', fontSize: '1rem',
          lineHeight: 1.7, color: muiTheme.palette.text.secondary,
          maxWidth: '460px', mb: '2.5rem', fontWeight: 400,
        }}>
          No countdown, no pressure. Choose a category and difficulty,
          then focus on accuracy and flow.
        </Box>

        {/* ── Step 1: Category ── */}
        <Box sx={{ mb: '2rem' }}>
          <Box sx={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.68rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: muiTheme.palette.text.disabled, mb: '0.75rem',
          }}>
            01 · Category
          </Box>
          <Box sx={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
              const meta = CATEGORY_META[cat]
              const active = selectedCategory === cat
              return (
                <Box
                  key={cat}
                  component="button"
                  onClick={() => onCategoryChange(cat)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    px: '1rem', py: '0.65rem',
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '0.88rem', fontWeight: active ? 600 : 400,
                    border: '1px solid',
                    borderColor: active ? '#f5c842' : muiTheme.palette.divider,
                    borderRadius: '8px',
                    background: active
                      ? (isDark ? 'rgba(245,200,66,0.1)' : 'rgba(245,200,66,0.12)')
                      : muiTheme.palette.background.paper,
                    color: active ? '#f5c842' : muiTheme.palette.text.secondary,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    '&:hover': {
                      borderColor: active ? '#f5c842' : muiTheme.palette.text.secondary,
                      color: active ? '#f5c842' : muiTheme.palette.text.primary,
                    },
                  }}
                >
                  <Box
                    component="span"
                    className="material-symbols-outlined"
                    sx={{
                      fontSize: '1.1rem',
                      fontVariationSettings: '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 20',
                      color: 'inherit',
                    }}
                  >
                    {meta.icon}
                  </Box>
                  {meta.label}
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* ── Step 2: Difficulty ── */}
        <Box sx={{ mb: '2rem' }}>
          <Box sx={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.68rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: muiTheme.palette.text.disabled, mb: '0.75rem',
          }}>
            02 · Difficulty
          </Box>
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((diff) => {
              const meta = DIFFICULTY_META[diff]
              const active = selectedDifficulty === diff
              return (
                <Box
                  key={diff}
                  component="button"
                  onClick={() => onDifficultyChange(diff)}
                  sx={{
                    px: '1.1rem', py: '0.55rem',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.8rem', fontWeight: 500,
                    letterSpacing: '0.04em',
                    border: '1px solid',
                    borderColor: active ? meta.color : muiTheme.palette.divider,
                    borderRadius: '6px',
                    background: active
                      ? `${meta.color}18`
                      : muiTheme.palette.background.paper,
                    color: active ? meta.color : muiTheme.palette.text.secondary,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    '&:hover': {
                      borderColor: meta.color,
                      color: meta.color,
                    },
                  }}
                >
                  {meta.label}
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* ── Step 3: Snippet picker ── */}
        <Box sx={{ mb: '2.5rem' }}>
          <Box sx={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.68rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: muiTheme.palette.text.disabled, mb: '0.75rem',
          }}>
            03 · Snippet
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '680px' }}>
            {snippets.map((snippet) => {
              const active = selectedSnippet?.id === snippet.id
              const preview = snippet.text.replace(/\n/g, ' ').slice(0, 90)
              const isCode = selectedCategory === 'code' || selectedCategory === 'devtools'
              return (
                <Box
                  key={snippet.id}
                  component="button"
                  onClick={() => onSnippetChange(snippet)}
                  sx={{
                    textAlign: 'left',
                    px: '1.25rem', py: '1rem',
                    border: '1px solid',
                    borderColor: active ? '#f5c842' : muiTheme.palette.divider,
                    borderRadius: '8px',
                    background: active
                      ? (isDark ? 'rgba(245,200,66,0.07)' : 'rgba(245,200,66,0.06)')
                      : muiTheme.palette.background.paper,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    position: 'relative',
                    '&:hover': {
                      borderColor: active ? '#f5c842' : muiTheme.palette.text.secondary,
                      background: active
                        ? (isDark ? 'rgba(245,200,66,0.09)' : 'rgba(245,200,66,0.08)')
                        : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'),
                    },
                  }}
                >
                  {/* Active indicator */}
                  {active && (
                    <Box sx={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: '3px', borderRadius: '8px 0 0 8px',
                      background: '#f5c842',
                    }} />
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', mb: '0.3rem' }}>
                    {snippet.lang && (
                      <Box sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.65rem', letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: active ? '#f5c842' : diffColor,
                        background: `${diffColor}18`,
                        px: '0.45rem', py: '0.1rem', borderRadius: '3px',
                      }}>
                        {snippet.lang}
                      </Box>
                    )}
                    <Box sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.65rem', letterSpacing: '0.06em',
                      color: muiTheme.palette.text.disabled,
                    }}>
                      {snippet.text.length} chars
                    </Box>
                  </Box>
                  <Box sx={{
                    fontFamily: isCode ? '"IBM Plex Mono", monospace' : '"IBM Plex Sans", sans-serif',
                    fontSize: '0.85rem',
                    color: active ? muiTheme.palette.text.primary : muiTheme.palette.text.secondary,
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {preview}{snippet.text.length > 90 ? '…' : ''}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* ── Start button ── */}
        <Box
          component="button"
          onClick={onStart}
          disabled={!selectedSnippet}
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontWeight: 600, fontSize: '0.92rem', letterSpacing: '-0.01em',
            px: '1.8rem', py: '0.75rem',
            borderRadius: '8px', border: 'none',
            cursor: selectedSnippet ? 'pointer' : 'not-allowed',
            background: selectedSnippet ? '#f5c842' : (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'),
            color: selectedSnippet ? '#0d0d0f' : muiTheme.palette.text.disabled,
            transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            '&:hover': selectedSnippet ? {
              background: '#ffd93d',
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 20px rgba(245,200,66,0.25)',
            } : {},
          }}
        >
          Start Practice
          <Box component="span" sx={{ fontSize: '1rem' }}>→</Box>
        </Box>
      </Box>
    </Box>
  )
}