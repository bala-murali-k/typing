// Required imports
import { Box, useTheme } from '@mui/material'
import { useContext, useState, useEffect, useRef } from 'react'
import { ThemeContext } from '../../../context/theme/theme.context.component'

export function QuicktestSectionHomePageComponent() {
    const { currentTheme } = useContext(ThemeContext)
    const theme = useTheme()

    // Typing test state
    const [paragraphs] = useState([
        "The sun dipped below the horizon, painting the sky in shades of orange and purple. A gentle breeze rustled the leaves, carrying the scent of pine and distant rain.",
        "Typing fast is not just about speed; it's about rhythm and accuracy. Focus on each keystroke and let your fingers dance across the keyboard.",
        "Minimalist design removes distractions. It brings clarity to your thoughts and helps you concentrate on what truly matters: your progress."
    ])
    const [currentParagraph, setCurrentParagraph] = useState(paragraphs[0])
    const [timerMode] = useState(60)
    const [timeLeft, setTimeLeft] = useState(60)
    const [active, setActive] = useState(false)
    const [typed, setTyped] = useState("")
    const [startTime, setStartTime] = useState(null)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [errors, setErrors] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Refs
    const inputRef = useRef(null)
    const timerIntervalRef = useRef(null)

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

    // Render paragraph with character highlighting
    const renderParagraph = () => {
        let html = ''
        for (let i = 0; i < currentParagraph.length; i++) {
            let char = currentParagraph[i]
            let charClass = 'char'
            if (i < typed.length) {
                charClass += (typed[i] === char) ? ' correct' : ' incorrect'
            } else if (i === typed.length) {
                charClass += ' current'
            }
            html += `<span class="${charClass}">${char === ' ' ? '&nbsp;' : char}</span>`
        }
        return html
    }

    // Calculate accuracy
    const calculateAccuracy = () => {
        if (typed.length === 0) return 100
        let correct = 0
        for (let i = 0; i < typed.length; i++) {
            if (i < currentParagraph.length && typed[i] === currentParagraph[i]) correct++
        }
        const incorrect = typed.length - correct
        setErrors(incorrect)
        return typed.length ? Math.round((correct / typed.length) * 100) : 100
    }

    // Calculate WPM
    const calculateWPM = () => {
        if (!startTime || typed.length === 0) return 0
        const minutes = (Date.now() - startTime) / 60000
        if (minutes <= 0) return 0
        return Math.round((typed.length / 5) / minutes)
    }

    // Finish test
    const finishTest = () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
        setActive(false)
        if (inputRef.current) inputRef.current.disabled = true
        setShowModal(true)
    }

    // Reset test
    const resetTest = () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
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

    // Start timer
    const startTimer = () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
        setStartTime(Date.now())
        setTimeLeft(timerMode)

        timerIntervalRef.current = setInterval(() => {
            if (!active) return
            const elapsed = (Date.now() - startTime) / 1000
            const remaining = Math.max(0, Math.round(timerMode - elapsed))
            setTimeLeft(remaining)
            
            if (remaining <= 0) {
                finishTest()
            }
        }, 200)
    }

    // Handle input change
    const handleInputChange = (e) => {
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
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
        }
    }, [])

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])

    // Toggle theme
    const toggleTheme = () => {
        // This would need to be implemented in your ThemeContext
        // For now, just toggle a class or emit an event
        document.body.classList.toggle('dark')
    }

    return (
        <Box>

            <Box
                className="container"
                sx={{
                    // maxWidth: '1200px',
                    margin: '0 auto',
                    // padding: '2rem 2rem 3rem'
                }}
            >

                {/* Quick typing test section */}
                <Box
                    id="quick-test"
                    className="test-section"
                    sx={{
                        background: theme.palette.background.paper,
                        borderRadius: '2rem',
                        padding: '2rem',
                        boxShadow: theme.shadows[3],
                        border: '1px solid',
                        borderColor: theme.palette.divider,
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
                        <Box className="stat-item" sx={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', background: theme.palette.background.default, padding: '0.5rem 1.2rem', borderRadius: '40px' }}>
                            <span className="stat-label" style={{ color: theme.palette.text.secondary, fontWeight: 500 }}>WPM</span>
                            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.6rem', color: theme.palette.primary.main }}>{wpm}</span>
                        </Box>
                        <Box className="stat-item" sx={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', background: theme.palette.background.default, padding: '0.5rem 1.2rem', borderRadius: '40px' }}>
                            <span className="stat-label" style={{ color: theme.palette.text.secondary, fontWeight: 500 }}>Acc</span>
                            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.6rem', color: theme.palette.primary.main }}>{accuracy}</span>%
                        </Box>
                        <Box className="stat-item" sx={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', background: theme.palette.background.default, padding: '0.5rem 1.2rem', borderRadius: '40px' }}>
                            <span className="stat-label" style={{ color: theme.palette.text.secondary, fontWeight: 500 }}>⏱️</span>
                            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.6rem', color: theme.palette.primary.main }}>{timeLeft}s</span>
                        </Box>
                        <button
                            className="restart-btn"
                            onClick={resetTest}
                            style={{
                                background: theme.palette.background.default,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: '40px',
                                padding: '0.7rem 1.8rem',
                                cursor: 'pointer',
                                fontWeight: 600,
                                color: theme.palette.text.primary
                            }}
                        >
                            <i className="fas fa-redo-alt"></i> Restart
                        </button>
                    </Box>

                    {/* Timer Progress */}
                    <Box className="timer-progress" sx={{ height: '8px', background: theme.palette.divider, borderRadius: '10px', width: '100%', margin: '1rem 0 1.5rem' }}>
                        <Box
                            className="progress-fill"
                            sx={{
                                height: '8px',
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #a78bfa)`,
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
                            background: theme.palette.background.default,
                            padding: '2rem',
                            borderRadius: '2rem',
                            fontSize: '1.3rem',
                            lineHeight: 1.8,
                            margin: '1rem 0 1.5rem',
                            border: '1px solid',
                            borderColor: theme.palette.divider,
                            fontWeight: 400,
                            wordBreak: 'break-word',
                            color: theme.palette.text.primary, // Base text color now theme-aware
                            '& .char': { 
                                display: 'inline-block', 
                                whiteSpace: 'pre-wrap',
                                color: 'inherit' // Inherit base color by default
                            },
                            '& .char.correct': { 
                                color: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return '#4ade80' // Bright green for dark mode
                                        case 'highcontrast':
                                            return '#00ff00' // Pure green for high contrast
                                        default:
                                            return '#10b981' // Original green for light mode
                                    }
                                })(),
                                background: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return 'rgba(74,222,128,0.2)' // More visible in dark mode
                                        case 'highcontrast':
                                            return 'rgba(0,255,0,0.3)' // High contrast background
                                        default:
                                            return 'rgba(16,185,129,0.1)' // Original light mode
                                    }
                                })(),
                                borderRadius: '2px'
                            },
                            '& .char.incorrect': { 
                                color: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return '#f87171' // Bright red for dark mode
                                        case 'highcontrast':
                                            return '#ffff00' // Yellow for high contrast (more visible than red)
                                        default:
                                            return '#ef4444' // Original red for light mode
                                    }
                                })(),
                                background: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return 'rgba(248,113,113,0.2)' // More visible in dark mode
                                        case 'highcontrast':
                                            return 'rgba(255,255,0,0.3)' // Yellow background for high contrast
                                        default:
                                            return 'rgba(239,68,68,0.1)' // Original light mode
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
                                            return theme.palette.primary.main // #818cf8
                                        case 'highcontrast':
                                            return '#ff00ff' // Bright magenta for high contrast
                                        default:
                                            return theme.palette.primary.main // #6366f1 for light
                                    }
                                })(),
                                color: (() => {
                                    switch(currentTheme) {
                                        case 'dark':
                                            return '#0b1120' // Dark background color for contrast
                                        case 'highcontrast':
                                            return '#000000' // Black for maximum contrast
                                        default:
                                            return '#ffffff' // White for light theme
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
                            // Style for untyped characters (future characters)
                            '& .char:not(.correct):not(.incorrect):not(.current)': {
                                color: theme.palette.text.secondary, // Softer color for untyped characters
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
                            borderColor: theme.palette.divider,
                            background: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            outline: 'none',
                            margin: '1rem 0',
                            boxSizing: 'border-box' // Add this line
                        }}
                        onFocus={(e) => e.target.style.borderColor = theme.palette.primary.main}
                        onBlur={(e) => e.target.style.borderColor = theme.palette.divider}
                    />

                    {/* Progress bar under input */}
                    <Box sx={{ height: '6px', background: theme.palette.divider, borderRadius: '10px', margin: '1rem 0' }}>
                        <Box
                            id="typeProgress"
                            sx={{
                                height: '6px',
                                background: theme.palette.primary.main,
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
                        background: theme.palette.background.paper,
                        borderRadius: '2.5rem',
                        padding: '2.5rem',
                        maxWidth: '400px',
                        width: '90%',
                        border: '1px solid',
                        borderColor: theme.palette.divider,
                        boxShadow: theme.shadows[3],
                        textAlign: 'center'
                    }}>
                        <h2>📊 Test finished!</h2>
                        <Box className="modal-stats" sx={{ margin: '2rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Box>
                                <span className="stat-label" style={{ color: theme.palette.text.secondary, fontWeight: 500 }}>WPM</span>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{wpm}</div>
                            </Box>
                            <Box>
                                <span className="stat-label" style={{ color: theme.palette.text.secondary, fontWeight: 500 }}>Accuracy</span>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{accuracy}%</div>
                            </Box>
                            <Box>
                                <span className="stat-label" style={{ color: theme.palette.text.secondary, fontWeight: 500 }}>Chars</span>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{typed.length}</div>
                            </Box>
                            <Box>
                                <span className="stat-label" style={{ color: theme.palette.text.secondary, fontWeight: 500 }}>Errors</span>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{errors}</div>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                className="btn"
                                onClick={resetTest}
                                style={{
                                    background: theme.palette.primary.main,
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.6rem 1.4rem',
                                    borderRadius: '40px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Restart test
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: 'transparent',
                                    color: theme.palette.text.primary,
                                    border: '1px solid',
                                    borderColor: theme.palette.divider,
                                    padding: '0.6rem 1.4rem',
                                    borderRadius: '40px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}