// Required imports
import { Box, useTheme, Grid } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'
// Required objects

export function WorkHowSectionHomePageComponent ({  }) {
    
    const { currentTheme } = useContext(ThemeContext)
    const theme = useTheme()
    
    // Helper function to get accent secondary color
    const getAccentSecondary = () => {
        switch (currentTheme) {
            case 'dark':
                return theme.palette.primary.a20 // #f9c74f
            case 'highcontrast':
                return theme.palette.primary.a20 // #ff00ff
            default:
                return theme.palette.primary.a40 // #facc15 for light theme
        }
    }
    
    // Helper function for typing animation background
    const getTypingAnimationBg = () => {
        switch (currentTheme) {
            case 'dark':
                return theme.palette.surface.a30 // #1d253b
            case 'highcontrast':
                return '#000'
            default:
                return theme.palette.surface.a10 // #ffffff
        }
    }
    
    // Helper function for gradient text
    const getGradientColors = () => {
        switch (currentTheme) {
            case 'dark':
                return 'linear-gradient(to right, #e2e8f0, #818cf8)'
            case 'highcontrast':
                return 'linear-gradient(to right, #ffffff, #ffff00)'
            default:
                return 'linear-gradient(to right, #1e293b, #6366f1)'
        }
    }

    // Helper function for feature icon gradient
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

    // Helper function for step number background
    const getStepNumberBackground = () => {
        switch (currentTheme) {
            case 'dark':
                return 'linear-gradient(145deg, #818cf8, #c084fc)'
            case 'highcontrast':
                return '#ffff00'
            default:
                return 'linear-gradient(145deg, #6366f1, #c084fc)'
        }
    }

    // Feature data array
    const features = [
        { icon: 'speed', title: 'Real-time WPM', description: 'Live words per minute as you type.' },
        { icon: 'track_changes', title: 'Accuracy analytics', description: 'Correct/incorrect highlights.' },
        { icon: 'layers', title: 'Difficulty levels', description: 'Easy, medium, hard paragraphs.' },
        { icon: 'hourglass_empty', title: 'Timer modes', description: '30s / 60s / 120s (60s default).' },
        { icon: 'psychology', title: 'Distraction‑free', description: 'Clean, focused environment.' },
        { icon: 'show_chart', title: 'Progress tracking', description: 'Review your last results.' }
    ]

    // Steps data array
    const steps = [
        { number: '1', title: 'Choose level', description: 'Select difficulty or timer.' },
        { number: '2', title: 'Type paragraph', description: 'See real‑time highlighting.' },
        { number: '3', title: 'Get results', description: 'WPM, accuracy & errors.' }
    ]
    
    return (
        <Box sx={{  }}>

            {/* How it works Section */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Box
                    component="h2"
                    className="section-title"
                    sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: { xs: '2rem', md: '2.2rem' },
                        fontWeight: 700,
                        textAlign: 'center',
                        color: theme.palette.text.primary,
                        mb: 4,
                        letterSpacing: theme.typography.h2?.letterSpacing
                    }}
                >
                    How it works
                </Box>

                <Box
                    className="steps"
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 3,
                        mt: 3
                    }}
                >
                    {steps.map((step, index) => (
                        <Box
                            key={index}
                            className="step"
                            sx={{
                                flex: { xs: '1 1 100%', sm: '1 1 200px' },
                                background: theme.palette.background.paper,
                                borderRadius: '2rem',
                                padding: '2rem',
                                textAlign: 'center',
                                border: '1px solid',
                                borderColor: theme.palette.divider,
                                boxShadow: theme.shadows[2],
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: theme.shadows[4]
                                }
                            }}
                        >
                            <Box
                                className="step-number"
                                sx={{
                                    background: getStepNumberBackground(),
                                    color: currentTheme === 'highcontrast' ? '#000' : '#fff',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '40px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    mb: 2,
                                    mx: 'auto',
                                    boxShadow: theme.shadows[1],
                                    fontFamily: theme.typography.fontFamily
                                }}
                            >
                                {step.number}
                            </Box>
                            <Box
                                component="h3"
                                sx={{
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: theme.typography.h6?.fontSize || '1.25rem',
                                    fontWeight: 600,
                                    color: theme.palette.text.primary,
                                    mb: 1,
                                    lineHeight: 1.4
                                }}
                            >
                                {step.title}
                            </Box>
                            <Box
                                component="p"
                                sx={{
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: '0.95rem',
                                    fontWeight: 400,
                                    color: theme.palette.text.secondary,
                                    lineHeight: 1.6,
                                    m: 0
                                }}
                            >
                                {step.description}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}