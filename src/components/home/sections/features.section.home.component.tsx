import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'

interface Feature {
  icon: string
  title: string
  description: string
  accent?: boolean
}

export function FeaturesSectionHomePageComponent() {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('FeaturesSectionHomePageComponent must be used within a ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  const features: Feature[] = [
    {
      icon: 'edit_note',
      title: 'Paste Any Text',
      description: 'Drop your own code, SQL queries, config files, or prose. Practice exactly what you type at work.',
      accent: true,
    },
    {
      icon: 'speed',
      title: 'Live WPM Counter',
      description: 'Real-time words per minute updates as you type. No waiting for results.',
    },
    {
      icon: 'code',
      title: 'Code Mode',
      description: 'Dedicated snippets in JS, Python, SQL and more. Symbols, brackets and indents included.',
    },
    {
      icon: 'track_changes',
      title: 'Character Accuracy',
      description: 'Every keystroke colour-coded instantly. Green for correct, red for wrong — no ambiguity.',
    },
    {
      icon: 'hourglass_empty',
      title: 'Flexible Timers',
      description: '1, 2, or 3 minute sessions. Or go untimed in Practice mode to just flow.',
    },
    {
      icon: 'psychology',
      title: 'Zero Distraction',
      description: 'No ads, no accounts, no noise. Just you, the text, and the cursor.',
    },
  ]

  return (
    <Box sx={{ mb: '5rem' }}>
      {/* Section header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          mb: '2.5rem',
        }}
      >
        <Box
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: muiTheme.palette.text.secondary,
          }}
        >
          Features
        </Box>
        <Box sx={{ flex: 1, height: '1px', background: muiTheme.palette.divider }} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: '1px',
          background: muiTheme.palette.divider,
          border: '1px solid',
          borderColor: muiTheme.palette.divider,
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              background: feature.accent
                ? isDark ? 'rgba(245,200,66,0.05)' : 'rgba(245,200,66,0.07)'
                : muiTheme.palette.background.paper,
              padding: '2rem',
              position: 'relative',
              transition: 'background 0.2s',
              '&:hover': {
                background: feature.accent
                  ? isDark ? 'rgba(245,200,66,0.09)' : 'rgba(245,200,66,0.12)'
                  : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              },
            }}
          >
            {/* Accent corner line */}
            {feature.accent && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '3px',
                  height: '100%',
                  background: '#f5c842',
                }}
              />
            )}

            {/* Icon */}
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{
                fontSize: '1.5rem',
                display: 'block',
                mb: '1rem',
                color: feature.accent ? '#f5c842' : muiTheme.palette.text.secondary,
                fontVariationSettings: '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24',
              }}
            >
              {feature.icon}
            </Box>

            {/* Title */}
            <Box
              component="h3"
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: muiTheme.palette.text.primary,
                mb: '0.5rem',
                lineHeight: 1.3,
              }}
            >
              {feature.title}
            </Box>

            {/* Description */}
            <Box
              component="p"
              sx={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 400,
                color: muiTheme.palette.text.secondary,
                lineHeight: 1.65,
                m: 0,
              }}
            >
              {feature.description}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}