import { Box } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme/theme.context.component'
import { HeroSectionHomePageComponent } from './sections/hero.section.home.component'
import { QuicktestSectionHomePageComponent } from './sections/quicktest.section.home.component'
import { FeaturesSectionHomePageComponent } from './sections/features.section.home.component'
import { WorkHowSectionHomePageComponent } from './sections/howitworks.section.home.component'

export function CoreHomePageComponent() {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('CoreHomePageComponent must be used within a ThemeContextComponent')

  const { currentTheme } = themeContext
  const isDark = currentTheme === 'dark'

  return (
    <>
      {/* Google Fonts — Syne (display) + IBM Plex Mono + IBM Plex Sans */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <Box
        sx={{
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Subtle full-page noise texture */}
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: isDark ? 0.025 : 0.018,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <HeroSectionHomePageComponent />
          <QuicktestSectionHomePageComponent />
          <FeaturesSectionHomePageComponent />
          <WorkHowSectionHomePageComponent />
        </Box>
      </Box>
    </>
  )
}