import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'
import type { StoredData, TestResult } from './test.utils'
import { DURATIONS, bestKey, formatDate } from './test.utils'

interface HistoryTableTestPageProps {
  storedData: StoredData
  lastResult: TestResult | null
  onClear: () => void
}

export function HistoryTableTestPageComponent({
  storedData,
  lastResult,
  onClear,
}: HistoryTableTestPageProps) {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('Must be used within ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  const correctColor = isDark ? '#4ade80' : '#16a34a'
  const wrongColor   = isDark ? '#f87171' : '#dc2626'

  if (storedData.history.length === 0) return null

  return (
    <Box>
      {/* Section header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem', mb: '1rem' }}>
        <Box sx={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: muiTheme.palette.text.secondary,
        }}>
          Recent Results
        </Box>
        <Box sx={{ flex: 1, height: '1px', background: muiTheme.palette.divider }} />
        <Box
          component="button"
          onClick={onClear}
          sx={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.65rem',
            background: 'transparent', border: 'none',
            color: muiTheme.palette.text.disabled,
            cursor: 'pointer', transition: 'color 0.15s',
            '&:hover': { color: wrongColor },
          }}
        >
          Clear history
        </Box>
      </Box>

      <Box sx={{
        border: '1px solid', borderColor: muiTheme.palette.divider,
        borderRadius: '8px', overflow: 'hidden',
      }}>
        {/* Table header */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 2fr',
          borderBottom: '1px solid', borderColor: muiTheme.palette.divider,
          background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        }}>
          {['WPM', 'ACC', 'ERR', 'DURATION', 'MODE', 'DATE'].map(h => (
            <Box key={h} sx={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.62rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: muiTheme.palette.text.disabled,
              px: '1rem', py: '0.65rem',
            }}>
              {h}
            </Box>
          ))}
        </Box>

        {/* Rows */}
        {storedData.history.slice(0, 8).map((r, i) => {
          const isBest = storedData.bests[bestKey(r.duration, r.mode)] === r.wpm
          const isLatest = i === 0 && lastResult != null

          return (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 2fr',
                borderBottom: i < Math.min(storedData.history.length, 8) - 1 ? '1px solid' : 'none',
                borderColor: muiTheme.palette.divider,
                background: isLatest
                  ? (isDark ? 'rgba(245,200,66,0.04)' : 'rgba(245,200,66,0.05)')
                  : 'transparent',
                transition: 'background 0.15s',
                '&:hover': {
                  background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                },
              }}
            >
              {/* WPM */}
              <Box sx={{
                fontFamily: '"Syne", sans-serif', fontSize: '1rem',
                fontWeight: 700, letterSpacing: '-0.02em',
                color: isBest ? '#f5c842' : muiTheme.palette.text.primary,
                px: '1rem', py: '0.75rem',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
              }}>
                {r.wpm}
                {isBest && <Box component="span" sx={{ fontSize: '0.7rem' }}>★</Box>}
              </Box>

              {/* ACC */}
              <Box sx={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.85rem',
                color: muiTheme.palette.text.secondary,
                px: '1rem', py: '0.75rem', display: 'flex', alignItems: 'center',
              }}>
                {r.accuracy}%
              </Box>

              {/* ERR */}
              <Box sx={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.85rem',
                color: r.errors > 0 ? wrongColor : correctColor,
                px: '1rem', py: '0.75rem', display: 'flex', alignItems: 'center',
              }}>
                {r.errors}
              </Box>

              {/* DURATION */}
              <Box sx={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.8rem',
                color: muiTheme.palette.text.secondary,
                px: '1rem', py: '0.75rem', display: 'flex', alignItems: 'center',
              }}>
                {DURATIONS.find(d => d.value === r.duration)?.label}
              </Box>

              {/* MODE */}
              <Box sx={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem',
                color: muiTheme.palette.text.disabled,
                px: '1rem', py: '0.75rem', display: 'flex', alignItems: 'center',
              }}>
                {r.mode === 'words' ? '∞' : '¶'}
              </Box>

              {/* DATE */}
              <Box sx={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem',
                color: muiTheme.palette.text.disabled,
                px: '1rem', py: '0.75rem', display: 'flex', alignItems: 'center',
              }}>
                {formatDate(r.date)}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}