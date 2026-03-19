import { Box } from '@mui/material'
import { useState } from 'react'
import { HeroSectionCustomPageComponent } from './section/hero.section.custom.component'
import { TypingTestCustomPageComponent } from './section/typingtest.section.custom.component'

type Mode = 'text' | 'code'

interface TestSession {
  text: string
  mode: Mode
  language?: string
}

export function CoreCustomPageComponent() {
  const [session, setSession] = useState<TestSession | null>(null)

  const handleStart = (text: string, mode: Mode, language?: string) => {
    setSession({ text, mode, language })
  }

  const handleReset = () => {
    setSession(null)
    // Scroll back up to the hero / textarea
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box>
      {/* Hero with paste area — always visible until test starts */}
      {!session && (
        <HeroSectionCustomPageComponent onStart={handleStart} />
      )}

      {/* Typing test — appears after Start is clicked */}
      {session && (
        <TypingTestCustomPageComponent
          text={session.text}
          mode={session.mode}
          language={session.language}
          onReset={handleReset}
        />
      )}
    </Box>
  )
}