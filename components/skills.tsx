"use client"

import { useEffect, useRef, useState } from "react"
import {
  FileText,
  Code,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

const skillBlocks = [
  {
    id: "bloc1",
    title: "Cadrer un projet et conceptualiser une solution web",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    skills: [
      {
        name: "Rédiger un Cahier Des Charges (CDC)",
        description:
          "Partir d'une expression de besoins pour cadrer fonctionnellement un projet dans le respect du RGPD.",
      },
      {
        name: "Rédiger des spécifications techniques",
        description:
          "Analyser un CDC pour cadrer techniquement un projet de développement.",
      },
      {
        name: "Déployer un environnement de travail",
        description:
          "Mettre en place les outils de versionnage, partage et collaboration.",
      },
      {
        name: "Réaliser une maquette",
        description:
          "Permettre au client de valider la structure en respectant l'ergonomie et l'accessibilité.",
      },
      {
        name: "Identifier les fonctionnalités",
        description:
          "Modéliser les éléments et leurs interconnexions pour structurer l'architecture.",
      },
      {
        name: "Rédiger une présentation",
        description:
          "Présenter les choix techniques et maquettes en argumentant les décisions.",
      },
    ],
  },
  {
    id: "bloc2",
    title: "Développer une solution web",
    icon: Code,
    color: "from-emerald-500 to-teal-500",
    skills: [
      {
        name: "Développer le prototype",
        description:
          "Présenter l'architecture technique au client.",
      },
      {
        name: "Rédiger le code de la solution",
        description:
          "Transcrire les fonctionnalités du CDC en respectant les normes.",
      },
      {
        name: "Intégrer les éléments",
        description:
          "Respecter les dernières normes HTML, CSS, JS selon les maquettes.",
      },
      {
        name: "Implémenter le front-end",
        description:
          "Développer l'interface utilisateur de la solution web.",
      },
      {
        name: "Implémenter le back-end",
        description:
          "Assurer la logique et la persistance des données côté serveur.",
      },
      {
        name: "Implémenter l'authentification",
        description:
          "Respecter les bonnes pratiques de sécurité pour l'accès.",
      },
      {
        name: "Implémenter un plan de tests",
        description:
          "Concevoir les tests unitaires et d'intégration.",
      },
      {
        name: "Déployer une application web",
        description:
          "Utiliser un serveur pour rendre l'application accessible.",
      },
    ],
  },
  {
    id: "bloc3",
    title: "Déployer un système d'assurance qualité",
    icon: CheckCircle,
    color: "from-amber-500 to-orange-500",
    skills: [
      {
        name: "Rédiger une documentation technique",
        description:
          "Garantir la pérennité et l'évolution future de la solution.",
      },
      {
        name: "Rédiger une documentation utilisateur",
        description:
          "Apporter un support aux utilisateurs pour leur autonomie.",
      },
      {
        name: "Monitorer le lancement",
        description:
          "Recueillir les retours utilisateurs pour évaluer la qualité.",
      },
      {
        name: "Identifier des améliorations",
        description:
          "Analyser les retours et données de trafic pour améliorer la solution.",
      },
      {
        name: "Analyser l'ergonomie et l'accessibilité",
        description:
          "Identifier les axes d'amélioration selon les normes et bonnes pratiques.",
      },
      {
        name: "Rédiger un document argumentatif",
        description:
          "Lister les propositions d'améliorations pour validation.",
      },
    ],
  },
]

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedBloc, setExpandedBloc] = useState<string | null>("bloc2")
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section id="competences" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Compétences RNCP
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Mes blocs de compétences
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              Voici les compétences acquises dans le cadre de mon titre RNCP,
              organisées par blocs thématiques.
            </p>
          </div>

          {/* Skills blocks */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {skillBlocks.map((bloc, blocIndex) => (
              <div
                key={bloc.id}
                className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${blocIndex * 150}ms` }}
              >
                {/* Bloc header */}
                <button
                  onClick={() =>
                    setExpandedBloc(expandedBloc === bloc.id ? null : bloc.id)
                  }
                  className="w-full p-6 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                      bloc.color
                    )}
                  >
                    <bloc.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-foreground text-lg">
                      {bloc.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {bloc.skills.length} compétences
                    </p>
                  </div>
                  {expandedBloc === bloc.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {/* Expanded content */}
                <div
                  aria-hidden={expandedBloc !== bloc.id}
                  className={cn(
                    "overflow-hidden transition-all duration-500",
                    expandedBloc === bloc.id
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-6 space-y-3">
                    {bloc.skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className={`p-4 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 ${
                          expandedBloc === bloc.id
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay:
                            expandedBloc === bloc.id
                              ? `${skillIndex * 50}ms`
                              : "0ms",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                          <div>
                            <h5 className="font-medium text-foreground">
                              {skill.name}
                            </h5>
                            <p className="text-sm text-muted-foreground mt-1">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
