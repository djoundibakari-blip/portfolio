"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

export type Theme = "dark" | "light" | "hunterdevv0" | "persona3reload"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  hunterUnlocked: boolean
  unlockHunter: () => void
  personaUnlocked: boolean
  unlockPersona: () => void
  /** call from any meaningful interaction (send a message, download CV, submit contact, click the photo…) */
  registerInteraction: () => void
  /** current progress toward the interaction threshold — drives the Nen principles indicator */
  interactionCount: number
  /** increments each time the interaction threshold has been reached — watch it to react to the trigger */
  interactionEggTrigger: number
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const INTERACTION_EGG_THRESHOLD = 5

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme,           setThemeState]     = useState<Theme>("dark")
  const [hunterUnlocked,  setHunterUnlocked] = useState(false)
  const [personaUnlocked, setPersonaUnlocked] = useState(false)
  const [mounted,         setMounted]        = useState(false)
  const [interactionCount,       setInteractionCount]       = useState(0)
  const [interactionEggTrigger,  setInteractionEggTrigger]  = useState(0)

  /* read persisted state on mount */
  useEffect(() => {
    setMounted(true)
    const unlocked = localStorage.getItem("portfolio-hunter-unlocked") === "1"
    setHunterUnlocked(unlocked)
    const personaUnlockedSaved = localStorage.getItem("portfolio-persona-unlocked") === "1"
    setPersonaUnlocked(personaUnlockedSaved)

    const saved = localStorage.getItem("portfolio-theme") as Theme | null
    if (saved === "hunterdevv0" && unlocked) {
      setThemeState("hunterdevv0")
    } else if (saved === "persona3reload" && personaUnlockedSaved) {
      setThemeState("persona3reload")
    } else if (saved === "dark" || saved === "light") {
      setThemeState(saved)
    }
  }, [])

  /* sync theme → DOM + localStorage */
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("portfolio-theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme, mounted])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
  }, [])

  const unlockHunter = useCallback(() => {
    localStorage.setItem("portfolio-hunter-unlocked", "1")
    setHunterUnlocked(true)
    setThemeState("hunterdevv0")
  }, [])

  const unlockPersona = useCallback(() => {
    localStorage.setItem("portfolio-persona-unlocked", "1")
    setPersonaUnlocked(true)
    setThemeState("persona3reload")
  }, [])

  /* easter egg — N meaningful interactions anywhere on the portfolio */
  const registerInteraction = useCallback(() => {
    setInteractionCount(prev => {
      const next = prev + 1
      if (next >= INTERACTION_EGG_THRESHOLD) {
        setInteractionEggTrigger(t => t + 1)
        return 0
      }
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{
      theme, setTheme, hunterUnlocked, unlockHunter, personaUnlocked, unlockPersona,
      registerInteraction, interactionCount, interactionEggTrigger,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
