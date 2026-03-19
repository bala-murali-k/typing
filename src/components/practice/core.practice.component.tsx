import { Box } from '@mui/material'
import { useState } from 'react'
import { type Category, type Difficulty, type PracticeSnippet, PRACTICE_CONTENT } from './sections/practice.content'
import { SelectorSectionPracticePageComponent } from './sections/selector.section.practice.component'
import { TypingSessionPracticePageComponent } from './sections/typingsession.practice.component'

export function CorePracticePageComponent() {
  const [category, setCategory] = useState<Category>('words')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [selectedSnippet, setSelectedSnippet] = useState<PracticeSnippet>(
    PRACTICE_CONTENT['words']['easy'][0]
  )
  const [sessionActive, setSessionActive] = useState(false)

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat)
    // Reset snippet to first of new category/difficulty combo
    setSelectedSnippet(PRACTICE_CONTENT[cat][difficulty][0])
  }

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff)
    setSelectedSnippet(PRACTICE_CONTENT[category][diff][0])
  }

  const handleStart = () => {
    setSessionActive(true)
  }

  const handleBack = () => {
    setSessionActive(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNext = () => {
    // Pick the next snippet in the current category/difficulty, cycling round
    const snippets = PRACTICE_CONTENT[category][difficulty]
    const currentIdx = snippets.findIndex(s => s.id === selectedSnippet.id)
    const nextIdx = (currentIdx + 1) % snippets.length
    const next = snippets[nextIdx]
    setSelectedSnippet(next)
    // Restart session with new snippet (keep sessionActive true)
    // The typing session component re-mounts via key change
  }

  return (
    <Box>
      {!sessionActive ? (
        <SelectorSectionPracticePageComponent
          selectedCategory={category}
          selectedDifficulty={difficulty}
          selectedSnippet={selectedSnippet}
          onCategoryChange={handleCategoryChange}
          onDifficultyChange={handleDifficultyChange}
          onSnippetChange={setSelectedSnippet}
          onStart={handleStart}
        />
      ) : (
        <TypingSessionPracticePageComponent
          key={selectedSnippet.id}
          snippet={selectedSnippet}
          category={category}
          difficulty={difficulty}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
    </Box>
  )
}