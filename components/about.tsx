"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Palette, Server, Lightbulb } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Front-End",
    description: "HTML, CSS, JavaScript, Tailwind CSS, Bootstrap",
  },
  {
    icon: Server,
    title: "Back-End",
    description: "PHP, Java, Springboot, J2EE, Rest API",
  },
  {
    icon: Palette,
    title: "DevOps",
    description: "Docker, Git, déploiement, versionnage",
  },
  {
    icon: Lightbulb,
    title: "Méthodologie",
    description: "Agile, RGPD, accessibilité, documentation",
  },
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
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              À propos
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Qui suis-je ?
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
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
                  <p className="text-3xl font-bold text-primary">3</p>
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

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className={`p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
