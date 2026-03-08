// Required imports
import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'

export function HeroSectionFeaturePageComponent() {
    // Fix: Handle null context
    const themeContext = useContext(ThemeContext)
    
    // Throw error if context is null (should never happen if used within provider)
    if (!themeContext) {
        throw new Error('HeroSectionFeaturePageComponent must be used within a ThemeContextComponent')
    }
    
    const { currentTheme } = themeContext
    const muiTheme = useTheme()
    
    // Helper function for gradient text with proper return type
    const getGradientColors = (): string => {
        switch (currentTheme) {
            case 'dark':
                return 'linear-gradient(to right, #e2e8f0, #818cf8)'
            case 'highcontrast':
                return 'linear-gradient(to right, #ffffff, #ffff00)'
            default:
                return 'linear-gradient(to right, #1e293b, #6366f1)'
        }
    }
    
    return (
        <Box 
            className="hero timeline-hero reveal"
            sx={{
                textAlign: 'center',
                mb: 6,
            }}
        >
            <Box
                component="h1"
                sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    background: getGradientColors(),
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    m: 0,
                    mb: 2
                }}
            >
                Development Roadmap
            </Box>
            
            <Box
                component="p"
                sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                    lineHeight: 1.5,
                    color: muiTheme.palette.text.secondary,
                    maxWidth: '600px',
                    mx: 'auto',
                    my: 2
                }}
            >
                Follow our journey as we build the ultimate typing experience. See what's completed, 
                what we're working on, and what's coming next.
            </Box>
        </Box>
    )
}