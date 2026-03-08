// Required imports
import { Box, useTheme } from '@mui/material'
import { useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'

// Timeline item data structure
interface TimelineItem {
    status: 'completed' | 'in-progress' | 'planned'
    featureName: string
    version: string
    date: string
    description: string
    progress?: number // Only for in-progress items
}

export function TimelineSectionFeaturePageComponent() {
    // Fix: Handle null context
    const themeContext = useContext(ThemeContext)
    const timelineRef = useRef<HTMLDivElement>(null)
    const muiTheme = useTheme()
    
    // Throw error if context is null (should never happen if used within provider)
    if (!themeContext) {
        throw new Error('TimelineSectionFeaturePageComponent must be used within a ThemeContextComponent')
    }
    
    const { currentTheme } = themeContext
    
    // Add active class to reveal elements on mount and scroll
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal')
        
        const reveal = () => {
            revealElements.forEach(element => {
                const windowHeight = window.innerHeight
                const elementTop = element.getBoundingClientRect().top
                const elementVisible = 150
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active')
                }
            })
        }
        
        // Initial reveal
        reveal()
        
        // Add scroll listener
        window.addEventListener('scroll', reveal)
        
        // Cleanup
        return () => window.removeEventListener('scroll', reveal)
    }, [])
    
    // Get status colors based on theme
    const getStatusColors = () => {
        switch (currentTheme) {
            case 'dark':
                return {
                    completed: muiTheme.palette.success.main, // #34d399
                    inProgress: muiTheme.palette.primary.main, // #f97316
                    planned: muiTheme.palette.text.secondary, // #94a3b8
                    completedBg: 'rgba(52, 211, 153, 0.15)',
                    inProgressBg: 'rgba(249, 115, 22, 0.15)',
                    plannedBg: 'rgba(148, 163, 184, 0.15)',
                }
            case 'highcontrast':
                return {
                    completed: '#ffaa33',
                    inProgress: '#ff6b00',
                    planned: '#808080',
                    completedBg: '#333333',
                    inProgressBg: '#333333',
                    plannedBg: '#333333',
                }
            default: // light
                return {
                    completed: muiTheme.palette.success.main, // #10b981
                    inProgress: muiTheme.palette.primary.main, // #6366f1
                    planned: muiTheme.palette.text.disabled, // #94a3b8
                    completedBg: 'rgba(16, 185, 129, 0.1)',
                    inProgressBg: 'rgba(99, 102, 241, 0.1)',
                    plannedBg: 'rgba(148, 163, 184, 0.1)',
                }
        }
    }
    
    const statusColors = getStatusColors()
    
    // Timeline data
    const timelineItems: TimelineItem[] = [
        {
            status: 'completed',
            featureName: 'Basic Structure',
            version: 'v1.0.0',
            date: 'Feb 2026',
            description: 'Established the core architecture and foundation of the practice typing. Implemented responsive layout system, routing structure, and state management for seamless user experience.'
        },
        {
            status: 'completed',
            featureName: 'Home UI',
            version: 'v1.1.0',
            date: 'Feb 2026',
            description: 'Crafted an elegant and intuitive homepage with glassmorphism design. Features include animated hero section, clear call-to-action buttons, and smooth transitions that welcome users to the platform.'
        },
        {
            status: 'completed',
            featureName: 'Theme Implementation',
            version: 'v1.2.0',
            date: 'Mar 2026',
            description: 'Integrated comprehensive theming system with light, dark, and high-contrast modes. Ensured perfect color harmony, accessibility compliance, and seamless theme switching across all components.'
        },
        {
            status: 'completed',
            featureName: 'Features Timeline',
            version: 'v1.3.0',
            date: 'Mar 2026',
            description: 'Designed and developed an interactive roadmap timeline showcasing past achievements and future milestones. Features visual status indicators, progress tracking, and smooth reveal animations.'
        },
        {
            status: 'in-progress',
            featureName: 'About Us',
            version: 'v1.4.0',
            date: 'Mar 2026',
            description: 'Creating an engaging About page that tells our story, showcases the team behind the project, and communicates our mission to revolutionize typing practice through minimalist design.',
            progress: 10
        },
        {
            status: 'planned',
            featureName: 'Practice Module',
            version: 'v2.0.0',
            date: 'Q2 2026',
            description: 'Launch the core practice interface with real-time typing feedback, WPM tracking, accuracy metrics, and customizable test durations. Includes multiple paragraph selections and progress indicators.'
        },
        {
            status: 'planned',
            featureName: 'Progress Tracking',
            version: 'v2.1.0',
            date: 'Q2 2026',
            description: 'Implement comprehensive progress tracking with detailed session history, performance graphs, and improvement analytics. Users can monitor their typing journey and identify areas for growth.'
        },
        {
            status: 'planned',
            featureName: 'Local Dashboard',
            version: 'v2.2.0',
            date: 'Q2 2026',
            description: 'Develop a personal dashboard for users to track their local statistics, set goals, and review past performances. Includes visual charts, streak tracking, and personalized insights.'
        },
        {
            status: 'planned',
            featureName: 'Custom Paragraphs',
            version: 'v2.3.0',
            date: 'Q3 2026',
            description: 'Empower users to create and practice with their own text content. Support for importing custom paragraphs, saving favorites, and organizing practice material by category.'
        },
        {
            status: 'planned',
            featureName: 'Programming Code',
            version: 'v2.4.0',
            date: 'Q3 2026',
            description: 'Introduce specialized typing modes for programmers. Practice typing syntax from popular languages including JavaScript, Python, HTML, CSS, and more with proper syntax highlighting.'
        },
        {
            status: 'planned',
            featureName: 'Typing Lessons',
            version: 'v2.5.0',
            date: 'Q4 2026',
            description: 'Launch structured typing lessons for all skill levels. From home row basics to advanced speed techniques, with progressive difficulty and targeted exercises for specific problem keys.'
        },
        {
            status: 'planned',
            featureName: 'One-Hand Typing Lessons',
            version: 'v2.6.0',
            date: 'Q4 2026',
            description: 'Specialized lessons designed for one-hand typists. Includes custom layouts for left and right-handed users, accessibility-focused exercises, and techniques to maximize efficiency.'
        }
    ]
    
    // Get status badge styles
    const getStatusBadgeStyles = (status: string) => {
        const baseStyles = {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 1rem',
            borderRadius: '40px',
            fontWeight: 600,
            fontSize: '0.85rem',
            fontFamily: '"Inter", sans-serif',
            border: '1px solid'
        }
        
        switch (status) {
            case 'completed':
                return {
                    ...baseStyles,
                    background: statusColors.completedBg,
                    color: statusColors.completed,
                    borderColor: statusColors.completed
                }
            case 'in-progress':
                return {
                    ...baseStyles,
                    background: statusColors.inProgressBg,
                    color: statusColors.inProgress,
                    borderColor: statusColors.inProgress
                }
            case 'planned':
                return {
                    ...baseStyles,
                    background: statusColors.plannedBg,
                    color: statusColors.planned,
                    borderColor: statusColors.planned
                }
            default:
                return baseStyles
        }
    }
    
    // Get status icon
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <i className="fas fa-check-circle"></i>
            case 'in-progress':
                return <i className="fas fa-spinner fa-pulse"></i>
            case 'planned':
                return <i className="fas fa-clock"></i>
            default:
                return null
        }
    }
    
    // Get status text
    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Completed'
            case 'in-progress':
                return 'In Progress'
            case 'planned':
                return 'Planned'
            default:
                return status
        }
    }
    
    return (
        <Box 
            ref={timelineRef}
            className="timeline"
            sx={{
                position: 'relative',
                padding: '2rem 0',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '3px',
                    height: '100%',
                    background: `linear-gradient(to bottom, 
                        ${statusColors.completed} 0%,
                        ${statusColors.completed} 33%,
                        ${statusColors.inProgress} 33%,
                        ${statusColors.inProgress} 66%,
                        ${statusColors.planned} 66%,
                        ${statusColors.planned} 100%
                    )`,
                    borderRadius: '3px',
                    opacity: 0.3
                },
                '@media (max-width: 768px)': {
                    '&::before': {
                        left: '30px'
                    }
                }
            }}
        >
            {timelineItems.map((item, index) => {
                const isEven = index % 2 === 1
                
                return (
                    <Box
                        key={index}
                        className={`timeline-item ${item.status} reveal`}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '3rem',
                            position: 'relative',
                            flexDirection: isEven ? 'row-reverse' : 'row',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: muiTheme.palette.background.paper,
                                border: '3px solid',
                                zIndex: 2,
                                transition: 'all 0.3s ease'
                            },
                            // Status-specific node styles
                            '&.completed::before': {
                                borderColor: statusColors.completed,
                                background: statusColors.completed,
                                boxShadow: `0 0 0 4px ${statusColors.completedBg}`
                            },
                            '&.in-progress::before': {
                                borderColor: statusColors.inProgress,
                                background: statusColors.inProgress,
                                boxShadow: `0 0 0 4px ${statusColors.inProgressBg}`,
                                animation: 'pulse 2s infinite'
                            },
                            '&.planned::before': {
                                borderColor: statusColors.planned,
                                background: statusColors.planned,
                                boxShadow: `0 0 0 4px ${statusColors.plannedBg}`
                            },
                            '@media (max-width: 768px)': {
                                flexDirection: 'column !important',
                                marginLeft: '60px',
                                '&::before': {
                                    left: '30px'
                                }
                            },
                            '@keyframes pulse': {
                                '0%': { boxShadow: `0 0 0 0 ${statusColors.inProgressBg}` },
                                '70%': { boxShadow: `0 0 0 10px rgba(99, 102, 241, 0)` },
                                '100%': { boxShadow: `0 0 0 0 rgba(99, 102, 241, 0)` }
                            }
                        }}
                    >
                        <Box
                            className="timeline-content"
                            sx={{
                                width: '40%',
                                background: muiTheme.palette.background.paper,
                                borderRadius: '2rem',
                                padding: '1.8rem',
                                border: `1px solid ${muiTheme.palette.divider}`,
                                boxShadow: muiTheme.shadows[3],
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                position: 'relative',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: `0 25px 35px -12px ${muiTheme.palette.primary.a20 || '#a5b4fc'}`
                                },
                                '@media (max-width: 768px)': {
                                    width: '100%'
                                }
                            }}
                        >
                            <Box
                                className="feature-header"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '1rem',
                                    flexWrap: 'wrap',
                                    gap: '0.8rem',
                                    '@media (max-width: 768px)': {
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }
                                }}
                            >
                                <Box
                                    component="span"
                                    className="feature-name"
                                    sx={{
                                        fontFamily: '"Inter", sans-serif',
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: muiTheme.palette.text.primary
                                    }}
                                >
                                    {item.featureName}
                                </Box>
                                <Box
                                    component="span"
                                    className="feature-date"
                                    sx={{
                                        fontFamily: '"Inter", sans-serif',
                                        color: muiTheme.palette.text.secondary,
                                        fontSize: '0.9rem',
                                        background: muiTheme.palette.background.default,
                                        padding: '0.2rem 1rem',
                                        borderRadius: '40px',
                                        border: `1px solid ${muiTheme.palette.divider}`
                                    }}
                                >
                                    {item.version} · {item.date}
                                </Box>
                            </Box>
                            
                            <Box
                                component="span"
                                className={`status-badge ${item.status}`}
                                sx={getStatusBadgeStyles(item.status)}
                            >
                                {getStatusIcon(item.status)} {getStatusText(item.status)}
                            </Box>
                            
                            <Box
                                component="p"
                                className="feature-description"
                                sx={{
                                    fontFamily: '"Inter", sans-serif',
                                    color: muiTheme.palette.text.secondary,
                                    margin: '1rem 0',
                                    lineHeight: 1.6
                                }}
                            >
                                {item.description}
                            </Box>
                            
                            {item.status === 'in-progress' && item.progress && (
                                <Box
                                    className="progress-container"
                                    sx={{
                                        marginTop: '1.2rem',
                                        padding: '1rem',
                                        background: muiTheme.palette.background.default,
                                        borderRadius: '1.5rem',
                                        border: `1px solid ${muiTheme.palette.divider}`
                                    }}
                                >
                                    <Box
                                        className="progress-header"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.5rem',
                                            color: muiTheme.palette.text.secondary,
                                            fontSize: '0.9rem',
                                            fontFamily: '"Inter", sans-serif'
                                        }}
                                    >
                                        <span>Development progress</span>
                                        <span>{item.progress}%</span>
                                    </Box>
                                    <Box
                                        className="progress-bar"
                                        sx={{
                                            height: '8px',
                                            background: muiTheme.palette.divider,
                                            borderRadius: '10px',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Box
                                            className="progress-fill"
                                            sx={{
                                                height: '100%',
                                                background: `linear-gradient(90deg, ${statusColors.inProgress}, #a78bfa)`,
                                                borderRadius: '10px',
                                                transition: 'width 1s ease',
                                                width: `${item.progress}%`
                                            }}
                                        />
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}