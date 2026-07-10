"use client"

import { Moon, Sun, Sparkles, Gamepad2 } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme, hunterUnlocked, personaUnlocked } = useTheme()

  const themes = [
    { id: "dark"        as const, icon: Moon,     label: "Sombre" },
    { id: "light"       as const, icon: Sun,      label: "Clair" },
    ...(hunterUnlocked
      ? [{ id: "hunterdevv0" as const, icon: Sparkles, label: "Hunter" }]
      : []),
    ...(personaUnlocked
      ? [{ id: "persona3reload" as const, icon: Gamepad2, label: "Persona" }]
      : []),
  ]

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-lg border border-border">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`p-2 rounded-md transition-all duration-300 ${
            theme === t.id
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
          aria-label={t.label}
          title={t.label}
        >
          <t.icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  )
}
