// Required imports
import { createContext, useMemo, useState } from 'react'
import type { ReactNode, Dispatch, SetStateAction } from 'react'
import { ThemeProvider } from '@mui/material'

// Theme object
import { themeObject } from './../../themes/multiple.object.theme.ts'

// Define the possible theme types
type ThemeType = 'light' | 'dark' | 'highcontrast'

// Define the context type
interface ThemeContextType {
  currentTheme: ThemeType
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>
}

// Create context with proper type
export const ThemeContext = createContext<ThemeContextType | null>(null)

// Define props type for the component
interface ThemeContextComponentProps {
  children: ReactNode
}

export default function ThemeContextComponent ({ children }: ThemeContextComponentProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')
  
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