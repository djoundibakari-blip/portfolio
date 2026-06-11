"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Mail, Phone } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import Image from "next/image"

const roles = [
  "Alternant Développeur Web",
  "Étudiant Epitech Lyon",
  "Passionné de Code",
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentText.slice(0, displayText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText, isDeleting, currentRole])

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-40 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Photo */}
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-primary/50 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Djoundi Bakari - Développeur Web"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
          </div>

          {/* Name and tagline */}
          <h1 className="saiyan-font text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
            Djoundi Bakari
          </h1>

          <div className="h-12 md:h-16 flex items-center justify-center">
            <p className="text-xl md:text-2xl lg:text-3xl text-primary font-medium">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            Étudiant en formation Web@cadémie à Epitech Lyon, motivé, sérieux
            et persévérant avec une forte envie de monter en compétences.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="https://github.com/Djoundi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-secondary rounded-full text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="mailto:djoundi.bakari@outlook.fr"
              className="p-3 bg-secondary rounded-full text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="tel:+33664298121"
              className="p-3 bg-secondary rounded-full text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all hover:scale-110"
              aria-label="Téléphone"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#projets"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-all hover:scale-105"
            >
              Me contacter
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator — positioned outside the content flow, clearly below buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <a
          href="#a-propos"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Défiler vers le bas"
        >
          <span className="text-sm">Découvrir</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
