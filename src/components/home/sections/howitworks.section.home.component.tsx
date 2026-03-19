import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../context/theme/theme.context.component'

interface Step {
  number: string
  title: string
  description: string
  cta?: { label: string; href: string }
}

export function WorkHowSectionHomePageComponent() {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('WorkHowSectionHomePageComponent must be used within a ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  const steps: Step[] = [
    {
      number: '01',
      title: 'Pick your mode',
      description: 'Run a timed speed test, open-ended practice, or paste your own code snippet to drill.',
      cta: { label: 'Go to Test →', href: '/test' },
    },
    {
      number: '02',
      title: 'Type and see feedback',
      description: 'Every character lights up instantly — green for correct, red for wrong. The cursor stays sharp.',
    },
    {
      number: '03',
      title: 'See your results',
      description: 'WPM, accuracy and error count at the end of every session. Hit reset and go again.',
      cta: { label: 'Try Custom →', href: '/custom' },
    },
  ]

  return (
    <Box sx={{ mb: '6rem' }}>
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
          How it works
        </Box>
        <Box sx={{ flex: 1, height: '1px', background: muiTheme.palette.divider }} />
      </Box>

      {/* Steps — horizontal on desktop, vertical on mobile */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: { xs: '0', md: '0' },
          position: 'relative',
        }}
      >
        {/* Connecting line on desktop */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: '28px',
            left: 'calc(16.66% + 16px)',
            right: 'calc(16.66% + 16px)',
            height: '1px',
            background: `linear-gradient(90deg, #f5c842, ${muiTheme.palette.divider}, #f5c842)`,
            zIndex: 0,
          }}
        />

        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              p: { xs: '1.5rem 0', md: '0 2rem' },
              position: 'relative',
              zIndex: 1,
              borderTop: { xs: index > 0 ? '1px solid' : 'none', md: 'none' },
              borderColor: muiTheme.palette.divider,
              pt: { xs: index > 0 ? '1.5rem' : '0', md: '0' },
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: { xs: '1.25rem', md: '1.25rem' },
              alignItems: { xs: 'flex-start', md: 'flex-start' },
            }}
          >
            {/* Step number circle */}
            <Box
              sx={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1px solid',
                borderColor: index === 0 ? '#f5c842' : muiTheme.palette.divider,
                background: index === 0
                  ? isDark ? 'rgba(245,200,66,0.1)' : 'rgba(245,200,66,0.12)'
                  : muiTheme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: index === 0 ? '#f5c842' : muiTheme.palette.text.secondary,
                }}
              >
                {step.number}
              </Box>
            </Box>

            {/* Text content */}
            <Box>
              <Box
                component="h3"
                sx={{
                  fontFamily: '"Syne", sans-serif',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: muiTheme.palette.text.primary,
                  mb: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </Box>
              <Box
                component="p"
                sx={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: '0.875rem',
                  color: muiTheme.palette.text.secondary,
                  lineHeight: 1.65,
                  m: 0,
                  mb: step.cta ? '1rem' : 0,
                }}
              >
                {step.description}
              </Box>
              {step.cta && (
                <Box
                  component={Link}
                  to={step.cta.href}
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: '#f5c842',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    transition: 'opacity 0.15s',
                    '&:hover': { opacity: 0.7 },
                  }}
                >
                  {step.cta.label}
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}