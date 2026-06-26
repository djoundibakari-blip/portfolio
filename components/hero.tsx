"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Mail } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import Image from "next/image"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-40 relative z-10">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Availability pill */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-4 py-1.5 bg-primary/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Disponible pour alternance · Lyon, France
            </span>
          </div>

          {/* Massive editorial heading */}
          <h1
            className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] text-foreground mb-0"
            aria-label="Djoundi Bakari"
          >
            DJOUNDI
            <br />
            <span className="text-primary">BAKARI</span>
          </h1>

          {/* Thin divider with centered subtitle */}
          <div className="relative flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
              Alternant Développeur Web · Epitech Lyon
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Two-column grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left column */}
            <div className="space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Étudiant en formation{" "}
                <span className="text-foreground font-medium">Web@cadémie à Epitech Lyon</span>,
                motivé, sérieux et persévérant avec une forte envie de monter en compétences.
              </p>

              {/* Inline social */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a
                  href="https://github.com/djoundibakari-blip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                  djoundibakari-blip
                </a>
                <a
                  href="mailto:djoundi.bakari@outlook.fr"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  djoundi.bakari@outlook.fr
                </a>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#projets"
                  className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  Voir mes projets →
                </a>
                <a
                  href="/cv.pdf"
                  download
                  className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-all hover:scale-105"
                >
                  Télécharger le CV
                </a>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Photo — rounded-2xl, not circular */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] max-w-xs">
                <Image
                  src="/profile.jpg"
                  alt="Djoundi Bakari — Développeur Web"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Stats below photo */}
              <div className="grid grid-cols-3 gap-3 max-w-xs">
                <div className="p-3 border border-border rounded-lg text-center">
                  <p className="font-display text-2xl text-primary">6</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Projets</p>
                </div>
                <div className="p-3 border border-border rounded-lg text-center">
                  <p className="font-display text-2xl text-primary">3</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Blocs RNCP</p>
                </div>
                <div className="p-3 border border-border rounded-lg text-center">
                  <p className="font-display text-2xl text-primary">2025</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Promo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 z-10">
        <a
          href="#a-propos"
          className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
          aria-label="Défiler vers le bas"
        >
          <div className="w-12 h-px bg-border group-hover:bg-primary transition-colors" />
          <span className="text-xs uppercase tracking-widest">Découvrir</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
