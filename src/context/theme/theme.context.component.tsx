// Required imports
import { createContext, useMemo, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'

// Theme object
import { themeObject } from './../../themes/multiple.object.theme.ts'

export const ThemeContext = createContext(null)

export default function ThemeContextComponent ({ children }) {
	
	const [currentTheme, setCurrentTheme] = useState('light')
	
	const theme = useMemo(() => {
		return themeObject[currentTheme]
	}, [currentTheme])
	
	return (
		<ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)

}