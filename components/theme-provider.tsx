"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

export type Theme = "dark" | "light" | "hunterdevv0"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  hunterUnlocked: boolean
  unlockHunter: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme,          setThemeState]    = useState<Theme>("dark")
  const [hunterUnlocked, setHunterUnlocked] = useState(false)
  const [mounted,        setMounted]        = useState(false)

  /* read persisted state on mount */
  useEffect(() => {
    setMounted(true)
    const unlocked = localStorage.getItem("portfolio-hunter-unlocked") === "1"
    setHunterUnlocked(unlocked)

    const saved = localStorage.getItem("portfolio-theme") as Theme | null
    if (saved === "hunterdevv0" && unlocked) {
      setThemeState("hunterdevv0")
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, hunterUnlocked, unlockHunter }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
