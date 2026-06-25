"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Réseau Social d'Entreprise (ESN)",
    description:
      "Réseau interne à une entreprise avec un fil d'actualité, une page de connexion et un système de création de compte. Développé avec Laravel, Docker et Tailwind CSS.",
    tags: ["Laravel", "Docker", "Tailwind CSS", "PHP"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/projet-ESN",
    live: "https://projet-esn.vercel.app",
    image: "/proj-esn.png",
    featured: true,
  },
  {
    id: 2,
    title: "My Cinema",
    description:
      "Interface de home cinema complète avec catalogue de films, gestion des horaires et système de réservation en ligne. Développé en PHP, SQL et Tailwind CSS.",
    tags: ["PHP", "SQL", "Tailwind CSS", "HTML"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/my-cinema",
    live: "https://my-cinema-one.vercel.app",
    image: "/proj-cinema.png",
    featured: true,
  },
  {
    id: 3,
    title: "Générateur de CV",
    description:
      "Application web permettant de générer un CV personnalisé uniquement en saisissant ses informations personnelles. Interface simple et intuitive.",
    tags: ["HTML", "JavaScript", "Bootstrap", "PHP"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/generateur-de-CV",
    live: "https://generateur-de-cv-eight.vercel.app",
    image: "/proj-cv.png",
    featured: true,
  },
  {
    id: 5,
    title: "Klivio — Intégration Web",
    description:
      "Intégration fidèle d'une maquette en deux phases : Phase 1 en HTML/CSS pur (Flexbox, Grid), Phase 2 redesign dark mode complet avec Tailwind CSS v4.",
    tags: ["HTML", "CSS", "Tailwind CSS"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/Klivio",
    live: "https://klivio-chi.vercel.app",
    image: "/proj-klivio.png",
    featured: true,
  },
  {
    id: 6,
    title: "Videops — Jeux Rétro Arcade",
    description:
      "Collection de jeux arcade rétro (Pong, Snake, Tetris…) déployée avec une pipeline CI/CD entièrement automatisée via GitHub Actions.",
    tags: ["JavaScript", "HTML", "CI/CD", "GitHub Actions"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/Videops",
    live: "https://videops-one.vercel.app",
    image: "/proj-videops.png",
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio Personnel",
    description:
      "Ce portfolio que vous consultez actuellement ! Conçu avec Next.js, TypeScript et Tailwind CSS pour présenter mes compétences et projets.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Projet Personnel",
    github: "https://github.com/djoundibakari-blip/Portfolio",
    live: "#accueil",
    image: "/placeholder.jpg",
    featured: false,
  },
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const wasDragged = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const total = projects.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total)
  }, [total])

  // Auto-play
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isVisible, next])

  // Touch/drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    wasDragged.current = false
  }

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return
    const diff = startX - clientX
    if (Math.abs(diff) > 50) {
      wasDragged.current = true
      diff > 0 ? next() : prev()
    }
    setIsDragging(false)
  }

  const project = projects[current]

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="py-24 bg-secondary/30 relative"
    >
      <div className="container mx-auto px-6">
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Portfolio
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Mes réalisations
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              Découvrez mes projets réalisés dans le cadre de ma formation
              Epitech Lyon et en autonomie.
            </p>
          </div>

          {/* Carousel */}
          <div className="max-w-4xl mx-auto">
            {/* Card */}
            <div
              className="relative"
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseUp={(e) => handleDragEnd(e.clientX)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
            >
              <div
                key={project.id}
                onClick={() => {
                  if (wasDragged.current) return;
                  const url = project.live ?? project.github;
                  if (url) window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="group block bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              >
                {/* Screenshot */}
                {project.image && (
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {project.category}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-card/80 text-muted-foreground text-xs rounded-full backdrop-blur-sm">
                      {current + 1} / {total}
                    </span>
                  </div>
                )}

                <div className="px-8 pb-8 pt-6 md:grid md:grid-cols-5 md:gap-8 md:items-center">
                  {/* Project number — decorative */}
                  <div className="hidden md:flex md:col-span-1 items-center justify-center">
                    <span className="text-[8rem] font-black text-primary/10 leading-none select-none">
                      {String(current + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-4 space-y-5">
                    <h4 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                      {project.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary border border-border text-xs text-muted-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border text-sm font-medium text-foreground rounded-lg hover:border-primary hover:text-primary transition-all"
                        >
                          <GithubIcon className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target={project.live !== "#accueil" ? "_blank" : undefined}
                          rel={project.live !== "#accueil" ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Voir le site
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-between mt-8">
              {/* Prev / Next */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="p-3 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-110"
                  aria-label="Projet précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-3 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-110"
                  aria-label="Projet suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 h-2.5 bg-primary"
                        : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Aller au projet ${i + 1}`}
                  />
                ))}
              </div>

              {/* GitHub link */}
              <a
                href="https://github.com/djoundibakari-blip"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Tous mes projets
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
