// Required imports
import { Box, useTheme, Grid } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'
// Required objects

export function FeaturesSectionHomePageComponent ({  }) {
    
    const { currentTheme } = useContext(ThemeContext)
    const theme = useTheme()

    const getFeatureIconGradient = () => {
        switch (currentTheme) {
            case 'dark':
                return 'linear-gradient(145deg, #818cf8, #c084fc)'
            case 'highcontrast':
                return 'linear-gradient(145deg, #ffffff, #ffff00)'
            default:
                return 'linear-gradient(145deg, #6366f1, #c084fc)'
        }
    }

    const features = [
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
                        fontFamily: theme.typography.fontFamily,
                        fontSize: { xs: '2rem', md: '2.2rem' },
                        fontWeight: 700,
                        textAlign: 'center',
                        color: theme.palette.text.primary,
                        mb: 4,
                        letterSpacing: theme.typography.h2?.letterSpacing || '-0.02em'
                    }}
                >
                    Why you'll love it
                </Box>

                <Grid container spacing={3}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                className="feature-card"
                                sx={{
                                    background: theme.palette.background.paper,
                                    borderRadius: '2rem',
                                    padding: '2rem 1.5rem',
                                    border: '1px solid',
                                    borderColor: theme.palette.divider,
                                    boxShadow: theme.shadows[2],
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: theme.shadows[8]
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
                                        fontFamily: theme.typography.fontFamily,
                                        fontSize: theme.typography.h6?.fontSize || '1.25rem',
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
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
                                        fontFamily: theme.typography.fontFamily,
                                        fontSize: '0.95rem',
                                        fontWeight: 400,
                                        color: theme.palette.text.secondary,
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