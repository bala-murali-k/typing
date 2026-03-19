import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'
import type { ContentMode } from './test.utils'
import { DURATIONS } from './test.utils'
import type { PracticeSnippet } from './practice.content'

interface ControlsSectionTestPageProps {
  duration: number
  contentMode: ContentMode
  passage: PracticeSnippet
  onDurationChange: (d: number) => void
  onModeChange: (m: ContentMode) => void
  onReset: () => void
}

export function ControlsSectionTestPageComponent({
  duration,
  contentMode,
  passage,
  onDurationChange,
  onModeChange,
  onReset,
}: ControlsSectionTestPageProps) {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('Must be used within ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      mb: '1.5rem',
      flexWrap: 'wrap',
    }}>
      {/* Mode toggle — Words / Passages */}
      <Box sx={{
        display: 'flex',
        border: '1px solid', borderColor: muiTheme.palette.divider,
        borderRadius: '8px', overflow: 'hidden',
      }}>
        {(['words', 'passages'] as ContentMode[]).map((m, i) => (
          <Box
            key={m}
            component="button"
            onClick={() => onModeChange(m)}
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.04em',
              px: '1rem', py: '0.5rem', border: 'none',
              borderRight: i === 0 ? '1px solid' : 'none',
              borderColor: muiTheme.palette.divider,
              background: contentMode === m
                ? (isDark ? 'rgba(245,200,66,0.1)' : 'rgba(245,200,66,0.12)')
                : 'transparent',
              color: contentMode === m ? '#f5c842' : muiTheme.palette.text.secondary,
              cursor: 'pointer', transition: 'all 0.15s',
              '&:hover': {
                color: '#f5c842',
                background: isDark ? 'rgba(245,200,66,0.07)' : 'rgba(245,200,66,0.08)',
              },
            }}
          >
            {m === 'words' ? '∞ Words' : '¶ Passages'}
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Box sx={{ width: '1px', height: '24px', background: muiTheme.palette.divider }} />

      {/* Duration buttons */}
      {DURATIONS.map(d => (
        <Box
          key={d.value}
          component="button"
          onClick={() => onDurationChange(d.value)}
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.04em',
            px: '0.9rem', py: '0.5rem',
            border: '1px solid',
            borderColor: duration === d.value ? '#f5c842' : muiTheme.palette.divider,
            borderRadius: '6px',
            background: duration === d.value
              ? (isDark ? 'rgba(245,200,66,0.1)' : 'rgba(245,200,66,0.12)')
              : muiTheme.palette.background.paper,
            color: duration === d.value ? '#f5c842' : muiTheme.palette.text.secondary,
            cursor: 'pointer', transition: 'all 0.15s',
            '&:hover': { borderColor: '#f5c842', color: '#f5c842' },
          }}
        >
          {d.label}
        </Box>
      ))}

      {/* Passage language badge — only in passages mode */}
      {contentMode === 'passages' && passage.lang && (
        <Box sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase',
          color: muiTheme.palette.text.disabled,
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          px: '0.6rem', py: '0.25rem', borderRadius: '4px',
        }}>
          {passage.lang}
        </Box>
      )}

      {/* New words / new passage */}
      <Box
        component="button"
        onClick={onReset}
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.75rem', letterSpacing: '0.04em',
          px: '0.9rem', py: '0.5rem',
          border: '1px solid', borderColor: muiTheme.palette.divider,
          borderRadius: '6px', background: 'transparent',
          color: muiTheme.palette.text.secondary,
          cursor: 'pointer', ml: 'auto', transition: 'all 0.15s',
          '&:hover': { borderColor: '#f5c842', color: '#f5c842' },
        }}
      >
        ↺ {contentMode === 'words' ? 'New words' : 'New passage'}
      </Box>
    </Box>
  )
}