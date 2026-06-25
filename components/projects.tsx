"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Réseau Social d'Entreprise",
    description:
      "Réseau interne avec fil d'actualité, connexion et création de compte. Laravel, Docker, Tailwind CSS.",
    tags: ["Laravel", "Docker", "Tailwind CSS", "PHP"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/projet-ESN",
    live: "https://projet-esn.vercel.app",
    image: "/proj-esn.png",
  },
  {
    id: 2,
    title: "My Cinema",
    description:
      "Home cinema avec catalogue de films, horaires et réservation en ligne. PHP, SQL, Tailwind CSS.",
    tags: ["PHP", "SQL", "Tailwind CSS", "HTML"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/my-cinema",
    live: "https://my-cinema-one.vercel.app",
    image: "/proj-cinema.png",
  },
  {
    id: 3,
    title: "Générateur de CV",
    description:
      "Génère un CV personnalisé à partir d'informations saisies. Interface simple et intuitive.",
    tags: ["HTML", "JavaScript", "Bootstrap", "PHP"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/generateur-de-CV",
    live: "https://generateur-de-cv-eight.vercel.app",
    image: "/proj-cv.png",
  },
  {
    id: 5,
    title: "Klivio — Intégration Web",
    description:
      "Intégration d'une maquette en deux phases : HTML/CSS pur puis redesign Tailwind CSS v4.",
    tags: ["HTML", "CSS", "Tailwind CSS"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/Klivio",
    live: "https://klivio-chi.vercel.app",
    image: "/proj-klivio.png",
  },
  {
    id: 6,
    title: "Videops — Jeux Rétro",
    description:
      "Collection de jeux arcade rétro déployée avec une pipeline CI/CD automatisée via GitHub Actions.",
    tags: ["JavaScript", "HTML", "CI/CD"],
    category: "Projet Epitech",
    github: "https://github.com/djoundibakari-blip/Videops",
    live: "https://videops-one.vercel.app",
    image: "/proj-videops.png",
  },
  {
    id: 4,
    title: "Portfolio Personnel",
    description:
      "Ce portfolio ! Conçu avec Next.js, TypeScript et Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Projet Personnel",
    github: "https://github.com/djoundibakari-blip/Portfolio",
    live: "https://portfolio-self-eta-24.vercel.app",
    image: "/placeholder.jpg",
  },
]

const colConfig = [
  { speed: 22, offset: 0 },
  { speed: 28, offset: -90 },
  { speed: 19, offset: -50 },
  { speed: 25, offset: -120 },
]

// Build 4 columns, each starting at a different project offset, doubled for seamless loop
const scrollColumns = colConfig.map((_, col) => {
  const offset = (col * Math.ceil(projects.length / 4)) % projects.length
  const rotated = [...projects.slice(offset), ...projects.slice(0, offset)]
  return [...rotated, ...rotated]
})

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const t = setInterval(() => setCurrent(c => (c + 1) % projects.length), 4000)
    return () => clearInterval(t)
  }, [isVisible])

  const project = projects[current]

  return (
    <section id="projets" ref={sectionRef} className="py-24 bg-secondary/30 relative">
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

          <div className="max-w-4xl mx-auto">
            {/* Main showcase card */}
            <div
              className="relative rounded-2xl overflow-hidden bg-[#080808]"
              style={{ height: "560px" }}
            >
              {/* Scrolling image grid */}
              <div className="absolute inset-0 grid grid-cols-4 gap-2 p-2 overflow-hidden">
                {scrollColumns.map((colProjects, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex flex-col gap-2"
                    style={{
                      animation: `scrollUp ${colConfig[colIdx].speed}s linear infinite`,
                      marginTop: `${colConfig[colIdx].offset}px`,
                    }}
                  >
                    {colProjects.map((proj, i) => {
                      const projIndex = projects.findIndex(p => p.id === proj.id)
                      const isActive = current === projIndex
                      const isDuplicate = i >= projects.length
                      return (
                        <button
                          key={`${proj.id}-${i}`}
                          onClick={() => setCurrent(projIndex)}
                          aria-hidden={isDuplicate}
                          tabIndex={isDuplicate ? -1 : 0}
                          className={`relative rounded-xl overflow-hidden shrink-0 w-full transition-all duration-500 ${
                            isActive
                              ? "opacity-100 ring-2 ring-primary scale-[1.02]"
                              : "opacity-35 hover:opacity-65"
                          }`}
                          style={{ height: "155px" }}
                          aria-label={isDuplicate ? undefined : proj.title}
                        >
                          <Image
                            src={proj.image}
                            alt={proj.title}
                            fill
                            className="object-cover object-top"
                            sizes="200px"
                          />
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-transparent pointer-events-none" />

              {/* Project info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between gap-4">
                <div className="pointer-events-none">
                  <span className="text-xs text-white/40 uppercase tracking-widest">
                    {project.category}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mt-1 leading-tight">
                    {project.title}
                  </h4>
                  <p className="text-white/55 text-sm mt-2 max-w-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 items-center">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-white/90 transition-all whitespace-nowrap"
                  >
                    Voir le site
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Dots navigation */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Projet ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
