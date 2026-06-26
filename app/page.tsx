"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { DragonBallIntro } from "@/components/dragon-ball-intro"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

const SECTIONS = [
  { id: "accueil",      label: "Accueil",     Component: Hero },
  { id: "a-propos",    label: "À propos",    Component: About },
  { id: "competences", label: "Compétences", Component: Skills },
  { id: "projets",     label: "Projets",     Component: Projects },
  { id: "contact",     label: "Contact",     Component: Contact },
]

export default function Home() {
  const [showIntro, setShowIntro]     = useState(true)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  const [current, setCurrent]         = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const touchStart = useRef(0)

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) {
      setShowIntro(false)
      setHasSeenIntro(true)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setHasSeenIntro(true)
    sessionStorage.setItem("intro-seen", "true")
  }

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === current || idx < 0 || idx >= SECTIONS.length) return
    setTransitioning(true)
    setCurrent(idx)
    setTimeout(() => setTransitioning(false), 750)
  }, [current, transitioning])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); next() }
      if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); prev() }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev])

  // Wheel (throttled)
  useEffect(() => {
    let blocked = false
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (blocked) return
      blocked = true
      if (e.deltaY > 20)       next()
      else if (e.deltaY < -20) prev()
      setTimeout(() => { blocked = false }, 900)
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [next, prev])

  // Touch / swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientY }
    const onEnd   = (e: TouchEvent) => {
      const delta = touchStart.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 60) delta > 0 ? next() : prev()
    }
    window.addEventListener("touchstart", onStart, { passive: true })
    window.addEventListener("touchend",   onEnd,   { passive: true })
    return () => {
      window.removeEventListener("touchstart", onStart)
      window.removeEventListener("touchend",   onEnd)
    }
  }, [next, prev])

  // Custom event from Navbar links
  useEffect(() => {
    const onNav = (e: Event) => {
      const idx = SECTIONS.findIndex(s => s.id === (e as CustomEvent).detail)
      if (idx >= 0) goTo(idx)
    }
    window.addEventListener("navigate-to-section", onNav)
    return () => window.removeEventListener("navigate-to-section", onNav)
  }, [goTo])

  return (
    <ThemeProvider>
      {showIntro && !hasSeenIntro && (
        <DragonBallIntro onComplete={handleIntroComplete} />
      )}

      <div
        className={`fixed inset-0 overflow-hidden bg-background transition-opacity duration-500 ${
          showIntro && !hasSeenIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar activeSection={SECTIONS[current].id} />

        {/* Fullscreen section panels */}
        {SECTIONS.map(({ id, Component }, i) => (
          <div
            key={id}
            id={id}
            aria-hidden={i !== current}
            className="absolute inset-0 overflow-y-auto transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transform: `translateY(${(i - current) * 100}%)` }}
          >
            <Component />
            {i === SECTIONS.length - 1 && <Footer />}
          </div>
        ))}

        {/* Side dot navigation */}
        <nav
          className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
          aria-label="Navigation sections"
        >
          {SECTIONS.map((section, i) => (
            <button
              key={section.id}
              onClick={() => goTo(i)}
              aria-label={section.label}
              title={section.label}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-2.5 h-8 bg-primary"
                  : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </nav>

        {/* Prev / Next arrows */}
        <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-2">
          {current > 0 && (
            <button
              onClick={prev}
              aria-label="Section précédente"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
          {current < SECTIONS.length - 1 && (
            <button
              onClick={next}
              aria-label="Section suivante"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}
