// Required imports
import { Box, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'

export function HeroSectionHomePageComponent() {
    // Fix: Handle null context
    const themeContext = useContext(ThemeContext)
    
    // Throw error if context is null (should never happen if used within provider)
    if (!themeContext) {
        throw new Error('HeroSectionHomePageComponent must be used within a ThemeContextComponent')
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
            className="hero"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: { xs: 4, md: 6 },
                mb: 6,
                flexWrap: 'wrap'
            }}
        >
            {/* Hero Content */}
            <Box 
                className="hero-content"
                sx={{
                    flex: { xs: '1 1 100%', md: '1 1 350px' },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Box
                    component="h1"
                    sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        fontWeight: 700,
                        lineHeight: 1.2,
                        background: getGradientColors(),
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        m: 0,
                        mb: 1.2
                    }}
                >
                    Improve Your Typing Speed and Accuracy
                </Box>
                
                <Box
                    component="p"
                    sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                        lineHeight: 1.5,
                        color: muiTheme.palette.text.secondary,
                        maxWidth: '500px',
                        my: 2
                    }}
                >
                    Minimal, smart, and distraction‑free. Get real‑time WPM, accuracy, 
                    and progress — start right now.
                </Box>
                
                <Box
                    className="hero-cta"
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        my: 2
                    }}
                >
                    <Box
                        component="a"
                        href="#quick-test"
                        className="btn"
                        sx={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textDecoration: 'none',
                            padding: '0.6rem 1.4rem',
                            borderRadius: '40px',
                            background: muiTheme.palette.primary.main,
                            color: '#fff',
                            border: 'none',
                            boxShadow: `0 4px 10px -3px ${muiTheme.palette.primary.main}20`,
                            transition: 'transform 0.15s, box-shadow 0.2s',
                            cursor: 'pointer',
                            display: 'inline-block',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: `0 10px 20px -7px ${muiTheme.palette.primary.main}`
                            }
                        }}
                    >
                        Start Typing Test
                    </Box>
                    
                    <Box
                        component="a"
                        href="#features"
                        className="btn-outline"
                        sx={{
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textDecoration: 'none',
                            padding: '0.6rem 1.4rem',
                            borderRadius: '40px',
                            background: 'transparent',
                            color: muiTheme.palette.text.primary,
                            border: '2px solid',
                            borderColor: muiTheme.palette.primary.main + '40', // Adding 40 for 25% opacity (hex 40 = 64 in decimal)
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            display: 'inline-block',
                            '&:hover': {
                                borderColor: muiTheme.palette.primary.main,
                                color: muiTheme.palette.primary.main
                            }
                        }}
                    >
                        See Features
                    </Box>
                </Box>
            </Box>
            
            {/* Empty spacer for original design */}
            <Box sx={{ flex: 1, minWidth: '200px' }} />
        </Box>
    )
}