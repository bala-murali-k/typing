// Required imports
import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'

export function WorkHowSectionHomePageComponent() {
    // Fix: Handle null context
    const themeContext = useContext(ThemeContext)
    
    // Throw error if context is null (should never happen if used within provider)
    if (!themeContext) {
        throw new Error('WorkHowSectionHomePageComponent must be used within a ThemeContextComponent')
    }
    
    const { currentTheme } = themeContext
    const muiTheme = useTheme()

    // Helper function for step number background
    const getStepNumberBackground = (): string => {
        switch (currentTheme) {
            case 'dark':
                return 'linear-gradient(145deg, #818cf8, #c084fc)'
            case 'highcontrast':
                return '#ffff00'
            default:
                return 'linear-gradient(145deg, #6366f1, #c084fc)'
        }
    }

    // Steps data array with proper typing
    interface Step {
        number: string
        title: string
        description: string
    }

    const steps: Step[] = [
        { number: '1', title: 'Choose level', description: 'Select difficulty or timer.' },
        { number: '2', title: 'Type paragraph', description: 'See real‑time highlighting.' },
        { number: '3', title: 'Get results', description: 'WPM, accuracy & errors.' }
    ]
    
    return (
        <Box>
            {/* How it works Section */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Box
                    component="h2"
                    className="section-title"
                    sx={{
                        fontFamily: muiTheme.typography.fontFamily,
                        fontSize: { xs: '2rem', md: '2.2rem' },
                        fontWeight: 700,
                        textAlign: 'center',
                        color: muiTheme.palette.text.primary,
                        mb: 4,
                        letterSpacing: muiTheme.typography.h2?.letterSpacing
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
                                background: muiTheme.palette.background.paper,
                                borderRadius: '2rem',
                                padding: '2rem',
                                textAlign: 'center',
                                border: '1px solid',
                                borderColor: muiTheme.palette.divider,
                                boxShadow: muiTheme.shadows[2],
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: muiTheme.shadows[4]
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
                                    boxShadow: muiTheme.shadows[1],
                                    fontFamily: muiTheme.typography.fontFamily
                                }}
                            >
                                {step.number}
                            </Box>
                            <Box
                                component="h3"
                                sx={{
                                    fontFamily: muiTheme.typography.fontFamily,
                                    fontSize: muiTheme.typography.h6?.fontSize || '1.25rem',
                                    fontWeight: 600,
                                    color: muiTheme.palette.text.primary,
                                    mb: 1,
                                    lineHeight: 1.4
                                }}
                            >
                                {step.title}
                            </Box>
                            <Box
                                component="p"
                                sx={{
                                    fontFamily: muiTheme.typography.fontFamily,
                                    fontSize: '0.95rem',
                                    fontWeight: 400,
                                    color: muiTheme.palette.text.secondary,
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