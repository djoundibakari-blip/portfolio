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

const techStack = [
  {
    name: "HTML",
    color: "bg-orange-950/40 border-orange-700/40 hover:border-orange-500",
    dot: "bg-orange-500",
    label: "text-orange-400",
    logo: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#E44D26" d="M19.037 113.876L9.032 1.627h109.936l-10.016 112.198-45.019 12.48z"/>
        <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
        <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
        <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.336-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/>
      </svg>
    ),
  },
  {
    name: "CSS",
    color: "bg-blue-950/40 border-blue-700/40 hover:border-blue-500",
    dot: "bg-blue-500",
    label: "text-blue-400",
    logo: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#1572B6" d="M19.037 113.876L9.032 1.627h109.936l-10.016 112.198-45.019 12.48z"/>
        <path fill="#33A9DC" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
        <path fill="#fff" d="M64 52.455H34.1l.899 10.088H64v-10.088zm0-27.856H24.38l.904 10.088H64V24.599zm0 55.712l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017V80.311z"/>
        <path fill="#EBEBEB" d="M64 52.455v10.088h28.351l-.899 10.088H64v10.088h26.561l-2.47 27.609L64 114.328v10.488l28.224-7.82.207-2.325 3.234-36.233.336-3.696.899-10.088.904-10.088H64V24.599h38.624l-.904-10.088H64v10.088z"/>
      </svg>
    ),
  },
  {
    name: "JavaScript",
    color: "bg-yellow-950/40 border-yellow-700/40 hover:border-yellow-500",
    dot: "bg-yellow-400",
    label: "text-yellow-400",
    logo: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#F7DF1E" d="M1.408 1.408h125.184v125.185H1.408z"/>
        <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
      </svg>
    ),
  },
  {
    name: "PHP",
    color: "bg-indigo-950/40 border-indigo-700/40 hover:border-indigo-500",
    dot: "bg-indigo-400",
    label: "text-indigo-400",
    logo: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#6181B6" d="M64 33.039c-33.74 0-61.094 13.862-61.094 30.961S30.26 94.961 64 94.961 125.094 81.099 125.094 64 97.74 33.039 64 33.039z"/>
        <path fill="#fff" d="M64 88c-27.338 0-49.5-10.745-49.5-24S36.662 40 64 40s49.5 10.745 49.5 24S91.338 88 64 88z"/>
        <path fill="#6181B6" d="M48.665 63.707l1.634-8.378H44.8l-3.897 19.86h5.124l1.441-7.545h4.339c2.075 0 3.517-.361 4.326-1.082.809-.721 1.425-2.064 1.848-4.031.393-1.842.254-3.113-.418-3.814-.672-.701-2.01-1.051-4.013-1.051h-4.881zm5.257 1.09c-.17.82-.461 1.354-.873 1.6-.412.247-1.17.371-2.271.371H49.8l1.048-5.296h2.27c.965 0 1.588.138 1.868.414.28.277.333.881.16 1.81l-.224 1.101zm8.406-5.468h1.737l.553-2.792h1.382c1.656 0 2.797-.918 3.125-2.58.217-1.148-.604-1.97-2.215-1.97h-3.524l-1.498 7.614h1.303l.546-2.775h-.409zm1.908-4.01l.406-2.063h1.18c.545 0 .785.252.686.752-.106.545-.392.867-1.031.867h-1.241zm8.891 4.01h1.737l.553-2.792h1.382c1.656 0 2.797-.918 3.125-2.58.217-1.148-.604-1.97-2.215-1.97h-3.524l-1.498 7.614h1.303l.546-2.775h-.409zm1.908-4.01l.406-2.063h1.18c.545 0 .785.252.686.752-.106.545-.392.867-1.031.867h-1.241z"/>
      </svg>
    ),
  },
  {
    name: "Java",
    color: "bg-red-950/40 border-red-700/40 hover:border-red-500",
    dot: "bg-red-500",
    label: "text-red-400",
    logo: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#EA2D2E" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
        <path fill="#EA2D2E" d="M76.491 49.678c6.025 6.927-1.58 13.165-1.58 13.165s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.192z"/>
        <path fill="#EA2D2E" d="M104.229 108.998s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.075.171-4.449-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.742 9.815 49.821 8.076 90.817-3.637 77.876-9.468zM49.921 71.02s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.386-.795 18.813-2.49 18.813-2.49s-3.308 1.419-5.704 3.053c-23.042 6.061-67.556 3.238-54.734-2.958 10.832-5.239 19.647-4.627 19.647-4.627zM93.ironically 95.302c23.432-12.167 12.597-23.86 5.032-22.285-1.853.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
        <path fill="#EA2D2E" d="M80.632 0S92.558 11.928 69.9 30.243c-18.077 14.293-4.12 22.449-.006 31.75-10.564-9.534-18.317-17.93-13.123-25.75C64.6 23.985 86.718 17.693 80.632 0z"/>
        <path fill="#EA2D2E" d="M52.574 126.338c22.492 1.438 57.038-.8 57.826-11.439 0 0-1.572 4.032-18.584 7.231-19.278 3.612-43.048 3.191-57.13.874 0 .001 2.894 2.395 17.888 3.334z"/>
      </svg>
    ),
  },
  {
    name: "SQL",
    color: "bg-sky-950/40 border-sky-700/40 hover:border-sky-500",
    dot: "bg-sky-400",
    label: "text-sky-400",
    logo: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#00618A" d="M2 6h124v32H2z"/>
        <path fill="#F29111" d="M2 38h124v84H2z"/>
        <path fill="#fff" d="M17 52h14v8H17zm0 14h14v8H17zm0 14h14v8H17zm18-28h60v8H35zm0 14h60v8H35zm0 14h40v8H35z"/>
        <text x="64" y="30" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold" fontFamily="monospace">SQL</text>
      </svg>
    ),
  },
  {
    name: "Docker",
    color: "bg-cyan-950/40 border-cyan-700/40 hover:border-cyan-500",
    dot: "bg-cyan-400",
    label: "text-cyan-400",
    logo: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#019BC6" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.6 3.1-3.4 8.3-3 12.3-1.9-1.1-4.5-1.5-6.7-1.5H68v8H52v8H36v8H20v8H8c-.3 4.2.8 9.3 3.6 12.9C14.4 102.2 19.5 104 25 104c22.8 0 40.2-10.5 51.2-29.5 5.9.2 12.1-.2 15.9-5.4l.8-1.3-1.2-.8z"/>
        <path fill="#019BC6" d="M18 56h14v14H18zm16 0h14v14H34zm16 0h14v14H50zm16 0h14v14H66zm16 0h14v14H82zM34 40h14v14H34zm16 0h14v14H50zm16 0h14v14H66zM50 24h14v14H50z"/>
        <circle fill="#019BC6" cx="107" cy="47" r="5"/>
      </svg>
    ),
  },
  {
    name: "Git",
    color: "bg-rose-950/40 border-rose-700/40 hover:border-rose-500",
    dot: "bg-rose-500",
    label: "text-rose-400",
    logo: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#F34F29" d="M124.742 58.382L69.618 3.258a8.56 8.56 0 00-12.104 0l-12.041 12.04 15.31 15.31a10.16 10.16 0 0112.836 12.95l14.757 14.758a10.16 10.16 0 0110.529 16.752 10.159 10.159 0 01-14.321-14.321 10.163 10.163 0 004.653-8.874L74.979 37.214v39.016a10.163 10.163 0 013.02 16.867 10.16 10.16 0 11-16.751-10.529L61.248 67.81V26.972A10.16 10.16 0 0153.6 14.035l-15.044-15.043-35.297 35.297a8.56 8.56 0 000 12.104l55.124 55.124a8.56 8.56 0 0012.104 0l54.254-54.254a8.563 8.563 0 000-12.881z"/>
      </svg>
    ),
  },
]

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
              Compétences
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Mes langages &amp; outils
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          {/* Tech stack with logos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-20">
            {techStack.map((tech, i) => (
              <div
                key={tech.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${tech.color} ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-10 h-10 shrink-0">{tech.logo}</div>
                <div>
                  <p className="text-foreground font-bold text-sm leading-tight">{tech.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tech.dot}`} />
                    <span className={`text-xs ${tech.label}`}>Maîtrisé</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RNCP blocks header */}
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Blocs RNCP
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Compétences acquises dans le cadre de mon titre RNCP, organisées par blocs thématiques.
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
