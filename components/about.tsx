"use client"

import { useEffect, useRef, useState } from "react"
import {
  SiHtml5, SiCss, SiJavascript, SiPhp, SiMysql,
  SiDocker, SiGit, SiTailwindcss, SiBootstrap, SiSpring,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"

const techs = [
  { icon: SiHtml5,       name: "HTML",         color: "#E34F26" },
  { icon: SiCss,         name: "CSS",          color: "#1572B6" },
  { icon: SiJavascript,  name: "JavaScript",   color: "#F7DF1E" },
  { icon: SiPhp,         name: "PHP",          color: "#777BB4" },
  { icon: FaJava,        name: "Java",         color: "#F89820" },
  { icon: SiMysql,       name: "SQL",          color: "#4479A1" },
  { icon: SiDocker,      name: "Docker",       color: "#2496ED" },
  { icon: SiGit,         name: "Git",          color: "#F05032" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiBootstrap,   name: "Bootstrap",    color: "#7952B3" },
  { icon: SiSpring,      name: "Spring Boot",  color: "#6DB33F" },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="a-propos"
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
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-mono text-muted-foreground/50 tracking-widest">01</span>
              <div className="h-px w-6 bg-border" />
              <span className="text-xs uppercase tracking-widest text-primary font-medium">À propos</span>
            </div>
            <h3 className="font-display text-5xl md:text-6xl text-foreground">Qui suis-je ?</h3>
            <div className="h-px w-full bg-border mt-8" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Étudiant en formation{" "}
                <span className="text-primary font-medium">Web@cadémie à Epitech Lyon</span>{" "}
                (novembre 2025 – novembre 2027), je suis à la recherche d&apos;une alternance
                dans le développement web.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Motivé, sérieux et persévérant, je dispose d&apos;une bonne capacité
                d&apos;analyse et d&apos;une forte envie de monter en compétences. J&apos;ai
                obtenu mon{" "}
                <span className="text-primary font-medium">
                  Baccalauréat Général
                </span>{" "}
                en 2023-2024 au Lycée Claude Louis Berthollet à Annecy, avec
                des spécialités en Numérique &amp; Sciences Informatiques et
                Histoire &amp; Géopolitique.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En dehors du code, je suis passionné par les{" "}
                <span className="text-primary font-medium">mangas</span> (tous
                genres) et les jeux vidéos (League of Legends, Guilty Gear,
                Armored Core 6). Je parle couramment{" "}
                <span className="text-primary font-medium">français</span> et
                l&apos;anglais à un niveau intermédiaire.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <p className="text-3xl font-bold text-primary">6</p>
                  <p className="text-sm text-muted-foreground">Projets réalisés</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <p className="text-3xl font-bold text-primary">3</p>
                  <p className="text-sm text-muted-foreground">Blocs RNCP</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Passion</p>
                </div>
              </div>
            </div>

            {/* Tech logos grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {techs.map((tech, index) => (
                <div
                  key={tech.name}
                  className={`flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <tech.icon style={{ color: tech.color }} className="w-8 h-8 shrink-0" />
                  <p className="font-semibold text-foreground text-sm">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
