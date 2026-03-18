import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../context/theme/theme.context.component'

export function HeroSectionHomePageComponent() {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('HeroSectionHomePageComponent must be used within a ThemeContextComponent')

  const { currentTheme } = themeContext
  const muiTheme = useTheme()
  const isDark = currentTheme === 'dark'

  return (
    <Box
      sx={{
        pt: { xs: '5rem', md: '7rem' },
        pb: { xs: '4rem', md: '6rem' },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-120px',
          right: '-80px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Keyboard grid decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: '45%',
          display: { xs: 'none', lg: 'block' },
          pointerEvents: 'none',
          zIndex: 0,
          opacity: isDark ? 0.035 : 0.06,
          backgroundImage: `
            linear-gradient(${muiTheme.palette.text.primary} 1px, transparent 1px),
            linear-gradient(90deg, ${muiTheme.palette.text.primary} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow tag */}
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
            mb: '1.5rem',
          }}
        >
          <Box
            component="span"
            sx={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#f5c842',
              display: 'inline-block',
              animation: 'pulse 2s ease infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.4 },
              },
            }}
          />
          <Box
            component="span"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isDark ? '#f5c842' : '#9a7c10',
              fontWeight: 500,
            }}
          >
            Personal Dev Typing Tool
          </Box>
        </Box>

        {/* Headline */}
        <Box
          component="h1"
          sx={{
            fontFamily: '"Syne", sans-serif',
            fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            color: muiTheme.palette.text.primary,
            mb: '1.5rem',
            maxWidth: '780px',
            '& em': {
              fontStyle: 'normal',
              color: '#f5c842',
            },
          }}
        >
          Type faster.<br />
          Think <em>sharper.</em><br />
          Ship quicker.
        </Box>

        {/* Subheadline */}
        <Box
          component="p"
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.7,
            color: muiTheme.palette.text.secondary,
            maxWidth: '480px',
            mb: '2.5rem',
            fontWeight: 400,
          }}
        >
          A distraction-free typing trainer built for developers.
          Paste your own code, drill real syntax, and track your WPM
          on text that actually matters.
        </Box>

        {/* CTAs */}
        <Box sx={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Box
            component={Link}
            to="/test"
            sx={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontWeight: 600,
              fontSize: '0.92rem',
              textDecoration: 'none',
              px: '1.6rem',
              py: '0.75rem',
              borderRadius: '6px',
              background: '#f5c842',
              color: '#0d0d0f',
              letterSpacing: '-0.01em',
              transition: 'all 0.15s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              '&:hover': {
                background: '#ffd93d',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 24px rgba(245,200,66,0.3)',
              },
            }}
          >
            Start Test
            <Box component="span" sx={{ fontSize: '1rem' }}>→</Box>
          </Box>

          <Box
            component={Link}
            to="/custom"
            sx={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontWeight: 500,
              fontSize: '0.92rem',
              textDecoration: 'none',
              px: '1.6rem',
              py: '0.75rem',
              borderRadius: '6px',
              background: 'transparent',
              color: muiTheme.palette.text.primary,
              border: '1px solid',
              borderColor: muiTheme.palette.divider,
              letterSpacing: '-0.01em',
              transition: 'all 0.15s',
              '&:hover': {
                borderColor: muiTheme.palette.text.secondary,
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              },
            }}
          >
            Paste Custom Text
          </Box>
        </Box>

        {/* Stat strip */}
        <Box
          sx={{
            mt: '3.5rem',
            pt: '2rem',
            borderTop: '1px solid',
            borderColor: muiTheme.palette.divider,
            display: 'flex',
            gap: { xs: '2rem', md: '4rem' },
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '3', label: 'Modes' },
            { value: 'WPM', label: 'Live Tracking' },
            { value: '∞', label: 'Custom Pastes' },
          ].map((stat) => (
            <Box key={stat.label}>
              <Box
                sx={{
                  fontFamily: '"Syne", sans-serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: muiTheme.palette.text.primary,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  mb: '0.25rem',
                }}
              >
                {stat.value}
              </Box>
              <Box
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: muiTheme.palette.text.secondary,
                }}
              >
                {stat.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}