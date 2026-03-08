// Required imports
import { Box, useTheme, Grid } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'

// Define feature item interface
interface Feature {
    icon: string
    title: string
    description: string
}

export function FeaturesSectionHomePageComponent() {
    // Fix Issue 1: Handle null context
    const themeContext = useContext(ThemeContext)
    
    // Throw error if context is null (should never happen if used within provider)
    if (!themeContext) {
        throw new Error('FeaturesSectionHomePageComponent must be used within a ThemeContextComponent')
    }
    
    const { currentTheme } = themeContext
    const muiTheme = useTheme()

    // Helper function with proper return type
    const getFeatureIconGradient = (): string => {
        switch (currentTheme) {
            case 'dark':
                return 'linear-gradient(145deg, #818cf8, #c084fc)'
            case 'highcontrast':
                return 'linear-gradient(145deg, #ffffff, #ffff00)'
            default:
                return 'linear-gradient(145deg, #6366f1, #c084fc)'
        }
    }

    // Fix Issue 2: Properly type the features array
    const features: Feature[] = [
        { icon: 'speed', title: 'Real-time WPM', description: 'Live words per minute as you type.' },
        { icon: 'track_changes', title: 'Accuracy analytics', description: 'Correct/incorrect highlights.' },
        { icon: 'layers', title: 'Difficulty levels', description: 'Easy, medium, hard paragraphs.' },
        { icon: 'hourglass_empty', title: 'Timer modes', description: '30s / 60s / 120s (60s default).' },
        { icon: 'psychology', title: 'Distraction‑free', description: 'Clean, focused environment.' },
        { icon: 'show_chart', title: 'Progress tracking', description: 'Review your last results.' }
    ]
    
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mt: 8, mb: 6 }}>
                <Box
                    component="h2"
                    id="features"
                    sx={{
                        fontFamily: muiTheme.typography.fontFamily,
                        fontSize: { xs: '2rem', md: '2.2rem' },
                        fontWeight: 700,
                        textAlign: 'center',
                        color: muiTheme.palette.text.primary,
                        mb: 4,
                        letterSpacing: muiTheme.typography.h2?.letterSpacing || '-0.02em'
                    }}
                >
                    Why you'll love it
                </Box>

                {/* Fix Issue 3: Fix Grid implementation - MUI v5 uses different Grid props */}
                <Grid container spacing={3}>
                    {features.map((feature, index) => (
                        // In MUI v5, Grid item uses the 'grid' prop pattern
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Box
                                className="feature-card"
                                sx={{
                                    background: muiTheme.palette.background.paper,
                                    borderRadius: '2rem',
                                    padding: '2rem 1.5rem',
                                    border: '1px solid',
                                    borderColor: muiTheme.palette.divider,
                                    boxShadow: muiTheme.shadows[2],
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    height: '100%', // Make cards equal height
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: muiTheme.shadows[8]
                                    }
                                }}
                            >
                                <Box
                                    component="span"
                                    className="material-symbols-outlined"
                                    sx={{
                                        fontSize: '2.5rem',
                                        background: getFeatureIconGradient(),
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        mb: 2,
                                        display: 'inline-block',
                                        fontFamily: '"Material Symbols Outlined", "Inter", sans-serif',
                                        fontWeight: 400,
                                        fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48'
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Box
                                    component="h3"
                                    sx={{
                                        fontFamily: muiTheme.typography.fontFamily,
                                        fontSize: muiTheme.typography.h6?.fontSize || '1.25rem',
                                        fontWeight: 600,
                                        color: muiTheme.palette.text.primary,
                                        mb: 1,
                                        lineHeight: 1.4,
                                        letterSpacing: 'normal'
                                    }}
                                >
                                    {feature.title}
                                </Box>
                                <Box
                                    component="p"
                                    sx={{
                                        fontFamily: muiTheme.typography.fontFamily,
                                        fontSize: '0.95rem',
                                        fontWeight: 400,
                                        color: muiTheme.palette.text.secondary,
                                        lineHeight: 1.6,
                                        m: 0,
                                        letterSpacing: 'normal'
                                    }}
                                >
                                    {feature.description}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}