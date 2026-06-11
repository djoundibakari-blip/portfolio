"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { DragonBallIntro } from "@/components/dragon-ball-intro"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem("intro-seen")
    if (seen) {
      setShowIntro(false)
      setHasSeenIntro(true)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setHasSeenIntro(true)
    sessionStorage.setItem("intro-seen", "true")
  }

  return (
    <ThemeProvider>
      {showIntro && !hasSeenIntro && (
        <DragonBallIntro onComplete={handleIntroComplete} />
      )}
      <main className={`min-h-screen transition-opacity duration-500 ${showIntro && !hasSeenIntro ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  )
}
