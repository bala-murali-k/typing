// Required imports
import { createTheme } from '@mui/material/styles'

export const themeObject = {
	light: createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: "#6366f1", // Indigo accent from HTML
				a10: "#818cf8", // Lighter indigo
				a20: "#a5b4fc", // Accent glow
				a30: "#c084fc", // Purple gradient
				a40: "#4f46e5", // Darker indigo
				a50: "#94a3b8", // text-light
				a60: "#e2e8f0", // border
			},
			surface: {
				main: "#ffffff", // Surface white
				a10: "#f9fafc", // Background
				a20: "#ffffff", // Pure white
				a30: "#f1f5f9", // Light gray
				a40: "#e2e8f0", // Border
				a50: "#cbd5e1", // Darker border
				a60: "#f8fafc", // Hover states
			},
			tonal: {
				main: "#f1f5f9",
				a10: "#f9fafc",
				a20: "#f1f5f9",
				a30: "#e2e8f0",
				a40: "#cbd5e1",
				a50: "#94a3b8",
				a60: "#64748b",
			},
			text: {
				primary: "#1e293b", // Dark text
				secondary: "#64748b", // Light text
				disabled: "#94a3b8", // Disabled state
			},
			background: {
				default: "#f9fafc", // bg from HTML
				paper: "#ffffff", // surface
			},
			success: {
				main: "#10b981", // correct green
				a10: "#34d399",
				a20: "#6ee7b7",
				a30: "#a7f3d0",
				a40: "#d1fae5",
				a50: "#ecfdf5",
				a60: "#f0fdf9",
			},
			warning: {
				main: "#f59e0b",
				a10: "#f97316",
				a20: "#facc15",
				a30: "#fdea73",
				a40: "#fef3c7",
				a50: "#fffbeb",
				a60: "#fff7e6",
			},
			error: {
				main: "#ef4444", // incorrect red
				a10: "#f87171",
				a20: "#fca5a5",
				a30: "#fecaca",
				a40: "#fee2e2",
				a50: "#fef2f2",
				a60: "#fff5f5",
			},
			info: {
				main: "#6366f1",
				a10: "#818cf8",
				a20: "#a5b4fc",
				a30: "#c7d2fe",
				a40: "#e0e7ff",
				a50: "#ebf0ff",
				a60: "#f5f8ff",
			},
			divider: "#e2e8f0", // border color
			action: {
				hover: "#6366f1",
				selected: "#818cf8",
				disabled: "#94a3b8",
				disabledBackground: "#e2e8f0",
			},
		},
		typography: {
			fontFamily: '"Inter", sans-serif',
			h1: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 700,
				fontSize: '3rem',
				lineHeight: 1.2,
			},
			h2: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 700,
				fontSize: '2.2rem',
			},
			h3: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 600,
				fontSize: '1.5rem',
			},
			body1: {
				fontFamily: '"Inter", sans-serif',
				fontSize: '1.2rem',
			},
			body2: {
				fontFamily: '"Inter", sans-serif',
				fontSize: '1rem',
			},
			button: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 600,
				fontSize: '0.95rem',
				textTransform: 'none',
			},
		},
		shape: {
			borderRadius: 40,
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundColor: '#f9fafc',
						color: '#1e293b',
						lineHeight: 1.5,
						WebkitFontSmoothing: 'antialiased',
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 40,
						padding: '0.6rem 1.4rem',
						fontWeight: 600,
						boxShadow: '0 4px 10px -3px #a5b4fc',
						transition: 'transform 0.15s, box-shadow 0.2s',
						'&:hover': {
							transform: 'scale(1.02)',
							boxShadow: '0 10px 20px -7px #6366f1',
						},
					},
					contained: {
						backgroundColor: '#6366f1',
						color: '#ffffff',
						'&:hover': {
							backgroundColor: '#4f46e5',
						},
					},
					outlined: {
						backgroundColor: 'transparent',
						color: '#1e293b',
						border: '1px solid #e2e8f0',
						boxShadow: 'none',
						'&:hover': {
							borderColor: '#6366f1',
							color: '#6366f1',
							backgroundColor: 'transparent',
							boxShadow: 'none',
							transform: 'scale(1.02)',
						},
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: 32,
						border: '1px solid #e2e8f0',
						boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.05), 0 8px 15px -6px rgba(0, 0, 0, 0.02)',
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 32,
						border: '1px solid #e2e8f0',
						boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.05), 0 8px 15px -6px rgba(0, 0, 0, 0.02)',
						transition: 'transform 0.2s',
						'&:hover': {
							transform: 'translateY(-6px)',
						},
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: 'rgba(255, 255, 255, 0.75)',
						backdropFilter: 'blur(12px)',
						borderBottom: '1px solid #e2e8f0',
						boxShadow: 'none',
					},
				},
			},
			MuiDivider: {
				styleOverrides: {
					root: {
						borderColor: '#e2e8f0',
						borderWidth: '1px',
					},
				},
			},
			MuiInputBase: {
				styleOverrides: {
					root: {
						borderRadius: 40,
						'&:focus-within': {
							borderColor: '#6366f1',
							boxShadow: '0 0 0 4px #a5b4fc',
						},
					},
				},
			},
		},
	}),

	dark: createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: "#f97316", // Bright orange as primary
				a10: "#fb923c", // Lighter orange
				a20: "#facc15", // Yellow accent
				a30: "#fdba74", // Light orange
				a40: "#ea580c", // Darker orange
				a50: "#9ca3af", // Gray
				a60: "#4b5563", // Dark gray
			},
			surface: {
				main: "#1e293b", // Surface dark
				a10: "#0b1120", // Background
				a20: "#1e293b", // Surface
				a30: "#334155", // Border light
				a40: "#475569", // Lighter border
				a50: "#64748b", // Text light
				a60: "#020617", // Dark shadow
			},
			tonal: {
				main: "#0b1120",
				a10: "#0b1120",
				a20: "#1e293b",
				a30: "#334155",
				a40: "#475569",
				a50: "#64748b",
				a60: "#94a3b8",
			},
			text: {
				primary: "#e2e8f0", // Light text
				secondary: "#94a3b8", // Muted text
				disabled: "#64748b", // Disabled
			},
			background: {
				default: "#0b1120", // bg dark
				paper: "#1e293b", // surface dark
			},
			success: {
				main: "#34d399", // Lighter green for dark mode
				a10: "#10b981",
				a20: "#34d399",
				a30: "#6ee7b7",
				a40: "#a7f3d0",
				a50: "#d1fae5",
				a60: "#ecfdf5",
			},
			warning: {
				main: "#f97316", // Orange
				a10: "#fb923c",
				a20: "#facc15",
				a30: "#fdba74",
				a40: "#fed7aa",
				a50: "#ffedd5",
				a60: "#fff7ed",
			},
			error: {
				main: "#f87171", // Lighter red for dark mode
				a10: "#ef4444",
				a20: "#f87171",
				a30: "#fca5a5",
				a40: "#fecaca",
				a50: "#fee2e2",
				a60: "#fef2f2",
			},
			info: {
				main: "#818cf8",
				a10: "#6366f1",
				a20: "#818cf8",
				a30: "#a5b4fc",
				a40: "#c7d2fe",
				a50: "#e0e7ff",
				a60: "#ebf0ff",
			},
			divider: "#334155", // Dark border
			action: {
				hover: "#f97316",
				selected: "#fb923c",
				disabled: "#64748b",
				disabledBackground: "#334155",
			},
		},
		typography: {
			fontFamily: '"Inter", sans-serif',
			h1: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 700,
				fontSize: '3rem',
			},
			h2: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 700,
				fontSize: '2.2rem',
			},
			h3: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 600,
				fontSize: '1.5rem',
			},
			body1: {
				fontFamily: '"Inter", sans-serif',
				fontSize: '1.2rem',
			},
			body2: {
				fontFamily: '"Inter", sans-serif',
				fontSize: '1rem',
			},
			button: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 600,
				fontSize: '0.95rem',
				textTransform: 'none',
			},
		},
		shape: {
			borderRadius: 40,
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundColor: '#0b1120',
						color: '#e2e8f0',
						lineHeight: 1.5,
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 40,
						padding: '0.6rem 1.4rem',
						fontWeight: 600,
						transition: 'transform 0.15s, box-shadow 0.2s',
					},
					contained: {
						backgroundColor: '#f97316',
						color: '#ffffff',
						boxShadow: '0 4px 10px -3px #f97316',
						'&:hover': {
							backgroundColor: '#ea580c',
							transform: 'scale(1.02)',
							boxShadow: '0 10px 20px -7px #f97316',
						},
					},
					outlined: {
						backgroundColor: 'transparent',
						color: '#e2e8f0',
						border: '1px solid #334155',
						boxShadow: 'none',
						'&:hover': {
							borderColor: '#f97316',
							color: '#f97316',
							transform: 'scale(1.02)',
						},
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: 32,
						border: '1px solid #334155',
						boxShadow: '0 20px 30px -10px #02061780, 0 8px 15px -6px #0f172a',
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: 'rgba(30, 41, 59, 0.85)',
						backdropFilter: 'blur(12px)',
						borderBottom: '1px solid #334155',
						boxShadow: 'none',
					},
				},
			},
			MuiDivider: {
				styleOverrides: {
					root: {
						borderColor: '#334155',
					},
				},
			},
		},
	}),

	highcontrast: createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: "#ff6b00", // Bright orange
				a10: "#ff8533",
				a20: "#ffaa33",
				a30: "#ffc44d",
				a40: "#ffdd66",
				a50: "#fff7e6",
				a60: "#000000",
			},
			surface: {
				main: "#1a1a1a",
				a10: "#000000",
				a20: "#1a1a1a",
				a30: "#333333",
				a40: "#4d4d4d",
				a50: "#666666",
				a60: "#808080",
			},
			text: {
				primary: "#ffffff",
				secondary: "#ffaa33",
				disabled: "#cccccc",
			},
			background: {
				default: "#000000",
				paper: "#1a1a1a",
			},
			primary: {
				main: "#ff6b00",
			},
			divider: "#ff6b00",
			action: {
				hover: "#ff6b00",
				selected: "#ffaa33",
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						border: '2px solid #ffffff',
					},
					contained: {
						backgroundColor: '#ff6b00',
						color: '#000000',
						border: '2px solid #ffffff',
						'&:hover': {
							backgroundColor: '#ff8533',
						},
					},
				},
			},
		},
	}),
}