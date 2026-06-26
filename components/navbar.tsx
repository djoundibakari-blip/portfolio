"use client"

import { useState, useEffect } from "react"
import { Menu, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("accueil")

  useEffect(() => {
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        const sections = navLinks.map((link) => link.href.slice(1))
        for (const section of sections.reverse()) {
          const element = document.getElementById(section)
          if (element && element.getBoundingClientRect().top <= 150) {
            setActiveSection(section)
            break
          }
        }
        rafId = null
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/40",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#accueil")
            }}
            className="logo text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary">&lt;</span>
            Djoundi
            <span className="text-primary">/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary py-2",
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300",
                      activeSection === link.href.slice(1)
                        ? "scale-x-100"
                        : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                CV
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          aria-hidden={!isOpen}
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <ul className="flex flex-col gap-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={cn(
                    "block text-base font-medium transition-colors py-2 px-4 rounded-lg",
                    activeSection === link.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/cv.pdf"
                download
                tabIndex={isOpen ? 0 : -1}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg text-base font-medium hover:bg-primary/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                Télécharger CV
              </a>
            </li>
            <li className="flex justify-center pt-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
