// Required imports
import { Box, useTheme } from '@mui/material'
import { useContext, useState, useEffect, useRef } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'


export function QuicktestSectionHomePageComponent() {
    // Fix Issue 1: Handle null context
    const themeContext = useContext(ThemeContext)
    
    // Throw error if context is null (should never happen if used within provider)
    if (!themeContext) {
        throw new Error('QuicktestSectionHomePageComponent must be used within a ThemeContextComponent')
    }
    
    const { currentTheme } = themeContext
    const muiTheme = useTheme()

    // Typing test state
    const [paragraphs] = useState<string[]>([
        "The sun dipped below the horizon, painting the sky in shades of orange and purple. A gentle breeze rustled the leaves, carrying the scent of pine and distant rain.",
        "Typing fast is not just about speed; it's about rhythm and accuracy. Focus on each keystroke and let your fingers dance across the keyboard.",
        "Minimalist design removes distractions. It brings clarity to your thoughts and helps you concentrate on what truly matters: your progress."
    ])
    const [currentParagraph] = useState<string>(paragraphs[0]) // Changed from setCurrentParagraph since it's not used
    const [timerMode] = useState<number>(60)
    const [timeLeft, setTimeLeft] = useState<number>(60)
    const [active, setActive] = useState<boolean>(false)
    const [typed, setTyped] = useState<string>("")
    const [startTime, setStartTime] = useState<number | null>(null)
    const [wpm, setWpm] = useState<number>(0)
    const [accuracy, setAccuracy] = useState<number>(100)
    const [errors, setErrors] = useState<number>(0)
    const [showModal, setShowModal] = useState<boolean>(false)
    // Removed unused mobileMenuOpen state

    // Refs - Fix Issue 2: Properly type the ref
    const inputRef = useRef<HTMLInputElement>(null)
    const timerIntervalRef = useRef<number | null>(null)

    // Render paragraph with character highlighting
    const renderParagraph = (): string => {
        let html = ''
        for (let i = 0; i < currentParagraph.length; i++) {
            let char = currentParagraph[i]
            if (i < typed.length) {
                html += (typed[i] === char) 
                    ? `<span class="char correct">${char === ' ' ? '&nbsp;' : char}</span>`
                    : `<span class="char incorrect">${char === ' ' ? '&nbsp;' : char}</span>`
            } else if (i === typed.length) {
                html += `<span class="char current">${char === ' ' ? '&nbsp;' : char}</span>`
            } else {
                html += `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
            }
        }
        return html
    }

    // Calculate accuracy
    const calculateAccuracy = (): number => {
        if (typed.length === 0) return 100
        let correct = 0
        for (let i = 0; i < typed.length; i++) {
            if (i < currentParagraph.length && typed[i] === currentParagraph[i]) correct++
        }
        const incorrect = typed.length - correct
        setErrors(incorrect)
        return typed.length ? Math.round((correct / typed.length) * 100) : 100
    }

    // Calculate WPM - Fix Issue 4: Handle null startTime
    const calculateWPM = (): number => {
        if (!startTime || typed.length === 0) return 0
        const minutes = (Date.now() - startTime) / 60000
        if (minutes <= 0) return 0
        return Math.round((typed.length / 5) / minutes)
    }

    // Finish test
    const finishTest = (): void => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            timerIntervalRef.current = null
        }
        setActive(false)
        if (inputRef.current) {
            inputRef.current.disabled = true
        }
        setShowModal(true)
    }

    // Reset test
    const resetTest = (): void => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            timerIntervalRef.current = null
        }
        setActive(false)
        setTyped("")
        setStartTime(null)
        setTimeLeft(timerMode)
        setWpm(0)
        setAccuracy(100)
        setErrors(0)
        setShowModal(false)
        if (inputRef.current) {
            inputRef.current.disabled = false
            inputRef.current.value = ''
            inputRef.current.focus()
        }
    }

    // Start timer - Fix Issue 3: startTime null issue
    const startTimer = (): void => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            timerIntervalRef.current = null
        }
        
        const now = Date.now()
        setStartTime(now)

        timerIntervalRef.current = window.setInterval(() => {
            if (!active) return
            
            // Use the current startTime from state, not the closure variable
            setStartTime(prevStartTime => {
                if (!prevStartTime) return prevStartTime
                
                const elapsed = (Date.now() - prevStartTime) / 1000
                const remaining = Math.max(0, Math.round(timerMode - elapsed))
                setTimeLeft(remaining)
                
                if (remaining <= 0) {
                    finishTest()
                }
                return prevStartTime
            })
        }, 200)
    }

    // Handle input change - Fix Issue 5: Type the event parameter
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value

        if (!active && value.length > 0) {
            setActive(true)
            startTimer()
            setTyped(value)
        } else if (active) {
            if (value.length <= currentParagraph.length) {
                setTyped(value)
            }
        } else {
            setTyped("")
        }

        // Check if finished
        if (value.length === currentParagraph.length && active) {
            finishTest()
        }
    }

    // Update stats when typed changes
    useEffect(() => {
        setWpm(calculateWPM())
        setAccuracy(calculateAccuracy())
    }, [typed, startTime])

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
            }
        }
    }, [])

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <Box>

            <Box
                className="container"
                sx={{
                    margin: '0 auto',
                }}
            >

                {/* Quick typing test section */}
                <Box
                    id="quick-test"
                    className="test-section"
                    sx={{
                        background: muiTheme.palette.background.paper,
                        borderRadius: '2rem',
                        padding: '2rem',
                        boxShadow: muiTheme.shadows[3],
                        border: '1px solid',
                        borderColor: muiTheme.palette.divider,
                        margin: '4rem 0'
                    }}
                >
                    {/* Stats Bar */}
                    <Box
                        className="stats-bar"
                        sx={{
                            display: 'flex',
                            gap: '2rem',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1.8rem'
                        }}
                    >
                        <Box className="stat-item" sx={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', background: muiTheme.palette.background.default, padding: '0.5rem 1.2rem', borderRadius: '40px' }}>
                            <span className="stat-label" style={{ color: muiTheme.palette.text.secondary, fontWeight: 500 }}>WPM</span>
                            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.6rem', color: muiTheme.palette.primary.main }}>{wpm}</span>
                        </Box>
                        <Box className="stat-item" sx={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', background: muiTheme.palette.background.default, padding: '0.5rem 1.2rem', borderRadius: '40px' }}>
                            <span className="stat-label" style={{ color: muiTheme.palette.text.secondary, fontWeight: 500 }}>Acc</span>
                            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.6rem', color: muiTheme.palette.primary.main }}>{accuracy}</span>%
                        </Box>
                        <Box className="stat-item" sx={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', background: muiTheme.palette.background.default, padding: '0.5rem 1.2rem', borderRadius: '40px' }}>
                            <span className="stat-label" style={{ color: muiTheme.palette.text.secondary, fontWeight: 500 }}>⏱️</span>
                            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.6rem', color: muiTheme.palette.primary.main }}>{timeLeft}s</span>
                        </Box>
                        <Box
                            component="button"
                            className="restart-btn"
                            onClick={resetTest}
                            sx={{
                                background: muiTheme.palette.background.default,
                                border: `1px solid ${muiTheme.palette.divider}`,
                                borderRadius: '40px',
                                padding: '0.7rem 1.8rem',
                                cursor: 'pointer',
                                fontWeight: 600,
                                color: muiTheme.palette.text.primary,
                                '&:hover': {
                                    background: muiTheme.palette.action.hover,
                                }
                            }}
                        >
                            <i className="fas fa-redo-alt"></i> Restart
                        </Box>
                    </Box>

                    {/* Timer Progress */}
                    <Box className="timer-progress" sx={{ height: '8px', background: muiTheme.palette.divider, borderRadius: '10px', width: '100%', margin: '1rem 0 1.5rem' }}>
                        <Box
                            className="progress-fill"
                            sx={{
                                height: '8px',
                                background: `linear-gradient(90deg, ${muiTheme.palette.primary.main}, #a78bfa)`,
                                width: `${((timerMode - timeLeft) / timerMode) * 100}%`,
                                borderRadius: '10px',
                                transition: 'width 0.1s linear'
                            }}
                        />
                    </Box>

                    {/* Paragraph Display */}
                    <Box
                        className="paragraph-display"
                        sx={{
                            background: muiTheme.palette.background.default,
                            padding: '2rem',
                            borderRadius: '2rem',
                            fontSize: '1.3rem',
                            lineHeight: 1.8,
                            margin: '1rem 0 1.5rem',
                            border: '1px solid',
                            borderColor: muiTheme.palette.divider,
                            fontWeight: 400,
                            wordBreak: 'break-word',
                            color: muiTheme.palette.text.primary,
                            '& .char': { 
                                display: 'inline-block', 
                                whiteSpace: 'pre-wrap',
                                color: 'inherit'
                            },
                            '& .char.correct': { 
                                color: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return '#4ade80'
                                        case 'highcontrast':
                                            return '#00ff00'
                                        default:
                                            return '#10b981'
                                    }
                                })(),
                                background: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return 'rgba(74,222,128,0.2)'
                                        case 'highcontrast':
                                            return 'rgba(0,255,0,0.3)'
                                        default:
                                            return 'rgba(16,185,129,0.1)'
                                    }
                                })(),
                                borderRadius: '2px'
                            },
                            '& .char.incorrect': { 
                                color: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return '#f87171'
                                        case 'highcontrast':
                                            return '#ffff00'
                                        default:
                                            return '#ef4444'
                                    }
                                })(),
                                background: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return 'rgba(248,113,113,0.2)'
                                        case 'highcontrast':
                                            return 'rgba(255,255,0,0.3)'
                                        default:
                                            return 'rgba(239,68,68,0.1)'
                                    }
                                })(),
                                textDecoration: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return 'underline wavy #f87171'
                                        case 'highcontrast':
                                            return 'underline wavy #ffff00'
                                        default:
                                            return 'underline wavy #ef4444'
                                    }
                                })()
                            },
                            '& .char.current': {
                                background: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return muiTheme.palette.primary.main
                                        case 'highcontrast':
                                            return '#ff00ff'
                                        default:
                                            return muiTheme.palette.primary.main
                                    }
                                })(),
                                color: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return '#0b1120'
                                        case 'highcontrast':
                                            return '#000000'
                                        default:
                                            return '#ffffff'
                                    }
                                })(),
                                borderRadius: '3px',
                                animation: 'pulseCaret 1s infinite',
                                boxShadow: currentTheme === 'highcontrast' ? '0 0 0 2px #ffffff' : 'none',
                                '@keyframes pulseCaret': {
                                    '0%': { opacity: 1 },
                                    '50%': { opacity: 0.6 },
                                    '100%': { opacity: 1 }
                                }
                            },
                            '& .char:not(.correct):not(.incorrect):not(.current)': {
                                color: muiTheme.palette.text.secondary,
                                opacity: currentTheme === 'dark' ? 0.8 : 0.7
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: renderParagraph() }}
                    />

                    {/* Typing Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        className="typing-area"
                        id="typingInput"
                        placeholder="Start typing here..."
                        autoFocus
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '1.2rem',
                            fontSize: '1.2rem',
                            borderRadius: '60px',
                            border: '2px solid',
                            borderColor: muiTheme.palette.divider,
                            background: muiTheme.palette.background.default,
                            color: muiTheme.palette.text.primary,
                            outline: 'none',
                            margin: '1rem 0',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = muiTheme.palette.primary.main}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = muiTheme.palette.divider}
                    />

                    {/* Progress bar under input */}
                    <Box sx={{ height: '6px', background: muiTheme.palette.divider, borderRadius: '10px', margin: '1rem 0' }}>
                        <Box
                            id="typeProgress"
                            sx={{
                                height: '6px',
                                background: muiTheme.palette.primary.main,
                                width: `${(typed.length / currentParagraph.length) * 100}%`,
                                borderRadius: '10px',
                                transition: 'width 0.1s ease'
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Result Modal */}
            {showModal && (
                <Box
                    className="modal active"
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 100
                    }}
                >
                    <Box className="modal-content" sx={{
                        background: muiTheme.palette.background.paper,
                        borderRadius: '2.5rem',
                        padding: '2.5rem',
                        maxWidth: '400px',
                        width: '90%',
                        border: '1px solid',
                        borderColor: muiTheme.palette.divider,
                        boxShadow: muiTheme.shadows[3],
                        textAlign: 'center'
                    }}>
                        <h2 style={{ color: muiTheme.palette.text.primary }}>📊 Test finished!</h2>
                        <Box className="modal-stats" sx={{ margin: '2rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Box>
                                <span className="stat-label" style={{ color: muiTheme.palette.text.secondary, fontWeight: 500 }}>WPM</span>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: muiTheme.palette.text.primary }}>{wpm}</div>
                            </Box>
                            <Box>
                                <span className="stat-label" style={{ color: muiTheme.palette.text.secondary, fontWeight: 500 }}>Accuracy</span>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: muiTheme.palette.text.primary }}>{accuracy}%</div>
                            </Box>
                            <Box>
                                <span className="stat-label" style={{ color: muiTheme.palette.text.secondary, fontWeight: 500 }}>Chars</span>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: muiTheme.palette.text.primary }}>{typed.length}</div>
                            </Box>
                            <Box>
                                <span className="stat-label" style={{ color: muiTheme.palette.text.secondary, fontWeight: 500 }}>Errors</span>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: muiTheme.palette.text.primary }}>{errors}</div>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Box
                                component="button"
                                className="btn"
                                onClick={resetTest}
                                sx={{
                                    background: muiTheme.palette.primary.main,
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.6rem 1.4rem',
                                    borderRadius: '40px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: muiTheme.palette.primary.dark,
                                    }
                                }}
                            >
                                Restart test
                            </Box>
                            <Box
                                component="button"
                                className="btn btn-outline"
                                onClick={() => setShowModal(false)}
                                sx={{
                                    background: 'transparent',
                                    color: muiTheme.palette.text.primary,
                                    border: '1px solid',
                                    borderColor: muiTheme.palette.divider,
                                    padding: '0.6rem 1.4rem',
                                    borderRadius: '40px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: muiTheme.palette.action.hover,
                                    }
                                }}
                            >
                                Close
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}