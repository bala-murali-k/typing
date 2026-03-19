import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from './../../../context/theme/theme.context.component'
import type { ContentMode, StoredData } from './test.utils'
import { DURATIONS, bestKey } from './test.utils'

interface HeroSectionTestPageProps {
  duration: number
  contentMode: ContentMode
  storedData: StoredData
}

export function HeroSectionTestPageComponent({
  duration,
  contentMode,
  storedData,
}: HeroSectionTestPageProps) {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('Must be used within ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  const personalBest = storedData.bests[bestKey(duration, contentMode)] ?? null
  const durationLabel = DURATIONS.find(d => d.value === duration)?.label ?? ''

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      mb: '2.5rem',
      flexWrap: 'wrap',
      gap: '1rem',
    }}>
      {/* Left — eyebrow + headline */}
      <Box>
        <Box sx={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          px: '0.85rem', py: '0.35rem', borderRadius: '4px',
          border: '1px solid',
          borderColor: isDark ? 'rgba(245,200,66,0.3)' : 'rgba(180,140,20,0.35)',
          background: isDark ? 'rgba(245,200,66,0.07)' : 'rgba(245,200,66,0.08)',
          mb: '1rem',
        }}>
          <Box component="span" sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.72rem', letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: isDark ? '#f5c842' : '#9a7c10',
            fontWeight: 500,
          }}>
            Speed Test · Timed
          </Box>
        </Box>

        <Box component="h1" sx={{
          fontFamily: '"Syne", sans-serif',
          fontSize: { xs: '2.2rem', md: '3rem' },
          fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1,
          color: muiTheme.palette.text.primary, mb: 0,
          '& em': { fontStyle: 'normal', color: '#f5c842' },
        }}>
          How fast <em>are you?</em>
        </Box>
      </Box>

      {/* Right — personal best badge (only when a best exists) */}
      {personalBest && (
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          px: '1.25rem', py: '0.85rem',
          border: '1px solid', borderColor: 'rgba(245,200,66,0.3)',
          borderRadius: '8px',
          background: isDark ? 'rgba(245,200,66,0.06)' : 'rgba(245,200,66,0.07)',
        }}>
          <Box sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.65rem', letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: isDark ? '#f5c842' : '#9a7c10', mb: '0.15rem',
          }}>
            Personal Best · {durationLabel} · {contentMode}
          </Box>
          <Box sx={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '2rem', fontWeight: 800,
            letterSpacing: '-0.03em', color: '#f5c842', lineHeight: 1,
          }}>
            {personalBest}{' '}
            <Box component="span" sx={{
              fontSize: '0.9rem',
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 400,
            }}>
              wpm
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}