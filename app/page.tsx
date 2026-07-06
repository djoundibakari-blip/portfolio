"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Send, Download, ArrowUpRight, ChevronDown, ChevronUp,
  Menu, X, MessageSquare, RotateCcw, Sparkles, ExternalLink,
} from "lucide-react"

const HUNTER_URL = process.env.NEXT_PUBLIC_HUNTER_URL ?? "https://hunterdevv0.vercel.app"
import {
  SiHtml5, SiCss, SiJavascript, SiPhp, SiMysql,
  SiDocker, SiGit, SiTailwindcss, SiBootstrap, SiSpring,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { GithubIcon } from "@/components/icons"
import { projects } from "@/lib/projects-data"

/* ─── navigation ─────────────────────────────────────── */

const CONVS = [
  { id: "presentation", label: "Présentation" },
  { id: "a-propos",    label: "À propos" },
  { id: "projets",     label: "Mes projets" },
  { id: "competences", label: "Compétences" },
  { id: "contact",     label: "Contact" },
]

const PILLS = [
  { text: "Qui es-tu ?",                    target: "presentation" },
  { text: "Parle-moi de toi",               target: "a-propos" },
  { text: "Montre-moi tes projets",         target: "projets" },
  { text: "Quelles sont tes compétences ?", target: "competences" },
  { text: "Comment te contacter ?",         target: "contact" },
]

/* ─── easter egg — quiz manga ────────────────────────── */

type Difficulty = "facile" | "medium" | "difficile"
type QuizQ = { question: string; options: string[]; answer: number }
type QuizScreen = "difficulty" | "quiz" | "result"

const DIFFICULTIES: { id: Difficulty; label: string; stars: number; desc: string }[] = [
  { id: "facile",    label: "Facile",    stars: 2, desc: "Pour les débutants" },
  { id: "medium",    label: "Médium",    stars: 4, desc: "Pour les amateurs" },
  { id: "difficile", label: "Difficile", stars: 7, desc: "Pour les vrais fans" },
]

const QUIZ: Record<Difficulty, QuizQ[]> = {
  facile: [
    {
      question: "Quel auteur a créé Hunter x Hunter ?",
      options: ["Masashi Kishimoto", "Eiichiro Oda", "Yoshihiro Togashi", "Akira Toriyama"],
      answer: 2,
    },
    {
      question: "Quel est le nom du démon à 9 queues enfermé dans Naruto ?",
      options: ["Nibi", "Hachibi", "Kyubi", "Sanbi"],
      answer: 2,
    },
    {
      question: "Comment s'appelle le Zanpakuto d'Ichigo Kurosaki dans Bleach ?",
      options: ["Senbonzakura", "Ryujin Jakka", "Hyorinmaru", "Zangetsu"],
      answer: 3,
    },
    {
      question: "Dans Saint Seiya, comment appelle-t-on les armures des guerriers ?",
      options: ["Cloths", "Armures divines", "Cosmos", "Manteaux"],
      answer: 0,
    },
    {
      question: "Quelle est l'attaque signature de Goku dans Dragon Ball ?",
      options: ["Rasengan", "Getsuga Tensho", "Kamehameha", "Detroit Smash"],
      answer: 2,
    },
    {
      question: "Dans Demon Slayer, quel est le nom de l'organisation qui combat les démons ?",
      options: ["Soul Society", "L'Akatsuki", "Corps des Pourfendeurs de Démons", "La Hunter Association"],
      answer: 2,
    },
    {
      question: "Dans Jujutsu Kaisen, quel est le nom de la malédiction suprême incarnée dans Yuji Itadori ?",
      options: ["Sukuna", "Mahito", "Geto", "Jogo"],
      answer: 0,
    },
  ],
  medium: [
    {
      question: "Dans Hunter x Hunter, quel type de Nen est Killua Zoldyck ?",
      options: ["Émetteur", "Matérialisateur", "Transmutateur", "Manipulateur"],
      answer: 2,
    },
    {
      question: "Comment s'appelle le bankai d'Ichigo dans Bleach ?",
      options: ["Kamishini no Yari", "Tensa Zangetsu", "Senbonzakura Kageyoshi", "Daiguren Hyorinmaru"],
      answer: 1,
    },
    {
      question: "Quel est le vrai nom de Tobi dans Naruto Shippuden ?",
      options: ["Madara Uchiha", "Izuna Uchiha", "Obito Uchiha", "Fugaku Uchiha"],
      answer: 2,
    },
    {
      question: "Dans Saint Seiya, qui est le Chevalier d'Or du Bélier ?",
      options: ["Aldébaran", "Deathmask", "Mu", "Shaka"],
      answer: 2,
    },
    {
      question: "Dans One Piece, comment s'appelle le fruit du démon de Luffy ?",
      options: ["Gomu Gomu no Mi", "Mera Mera no Mi", "Gura Gura no Mi", "Yami Yami no Mi"],
      answer: 0,
    },
    {
      question: "Dans My Hero Academia, quel est le vrai nom du Quirk de Deku ?",
      options: ["All For One", "One For All", "Zero Gravity", "Half-Cold Half-Hot"],
      answer: 1,
    },
    {
      question: "Dans Dragon Ball Z, qui est responsable de la destruction de la planète Vegeta ?",
      options: ["Cell", "Majin Buu", "Freezer", "Broly"],
      answer: 2,
    },
  ],
  difficile: [
    {
      question: "Dans Hunter x Hunter, quel est le type de Nen de Kurapika ?",
      options: ["Transmutateur", "Émetteur", "Spécialiste", "Matérialisateur"],
      answer: 2,
    },
    {
      question: "Dans Bleach, quelle est la capacité du Zanpakuto Kyoka Suigetsu d'Aizen ?",
      options: ["Contrôler le temps", "Infliger une hypnose sensorielle parfaite", "Dupliquer son porteur", "Annuler les pouvoirs adverses"],
      answer: 1,
    },
    {
      question: "Dans Naruto, sous quelle identité Tobi prétendait-il diriger l'Akatsuki ?",
      options: ["Le vrai Pain", "Nagato", "Madara Uchiha", "Obito"],
      answer: 2,
    },
    {
      question: "Dans Saint Seiya, quel Chevalier d'Or se révèle être le grand antagoniste de l'arc Sanctuaire ?",
      options: ["Shaka de la Vierge", "Saga du Gémeaux", "Deathmask du Cancer", "Shura du Capricorne"],
      answer: 1,
    },
    {
      question: "En quelle année Dragon Ball a-t-il débuté dans le Weekly Shōnen Jump ?",
      options: ["1980", "1982", "1984", "1986"],
      answer: 2,
    },
    {
      question: "Dans JoJo's Bizarre Adventure, quel est le nom du Stand de Dio Brando ?",
      options: ["Star Platinum", "Crazy Diamond", "Gold Experience", "The World"],
      answer: 3,
    },
    {
      question: "Dans Fullmetal Alchemist Brotherhood, quelle était l'origine du personnage connu sous le nom de 'Père' (Father) ?",
      options: ["Un esprit ancien sans forme", "Un Homunculus créé par Van Hohenheim", "Le Nain dans le Flacon", "Une âme extraite par la Porte"],
      answer: 2,
    },
  ],
}

/* ─── easter egg modal ───────────────────────────────── */

function EasterEggModal({ onClose }: { onClose: () => void }) {
  const { hunterUnlocked, unlockHunter } = useTheme()

  const [screen,    setScreen]   = useState<QuizScreen>("difficulty")
  const [difficulty, setDiff]    = useState<Difficulty | null>(null)
  const [currentQ,  setCurrentQ] = useState(0)
  const [selected,  setSelected] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score,     setScore]    = useState(0)
  const [answered,  setAnswered] = useState(0)

  const questions = difficulty ? QUIZ[difficulty] : []
  const q         = questions[currentQ]
  const perfect   = score === 7

  const startQuiz = (d: Difficulty) => {
    setDiff(d)
    setCurrentQ(0)
    setSelected(null)
    setIsCorrect(null)
    setScore(0)
    setAnswered(0)
    setScreen("quiz")
  }

  const pickAnswer = (idx: number) => {
    if (selected !== null) return
    const ok       = idx === q.answer
    const newScore = ok ? score + 1 : score

    setSelected(idx)
    setIsCorrect(ok)
    if (ok) setScore(newScore)
    setAnswered(a => a + 1)

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(i => i + 1)
        setSelected(null)
        setIsCorrect(null)
      } else {
        /* unlock theme on perfect score */
        if (newScore === 7 && !hunterUnlocked) unlockHunter()
        setScreen("result")
      }
    }, 1100)
  }

  const retry = () => {
    setScreen("difficulty")
    setDiff(null)
    setCurrentQ(0)
    setSelected(null)
    setIsCorrect(null)
    setScore(0)
    setAnswered(0)
  }

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden msg-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/20">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-foreground">🐉 Quiz Manga</span>
            {screen === "quiz" && (
              <span className="text-xs text-muted-foreground tabular-nums">
                {currentQ + 1} / {questions.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dragon ball progress bar */}
        {screen === "quiz" && (
          <div className="px-6 pt-4">
            <div className="flex gap-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i < answered ? "bg-orange-500" : "bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">

          {/* ── Difficulty picker ── */}
          {screen === "difficulty" && (
            <div className="space-y-5">
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Tu as rassemblé les 7 Dragon Balls !
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  7 questions · 7/7 pour débloquer le thème caché.
                </p>
              </div>
              <div className="grid gap-2.5">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => startQuiz(d.id)}
                    className="flex items-center justify-between px-4 py-3.5 border border-border rounded-xl text-left hover:border-primary/50 hover:bg-secondary/30 transition-all"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">{d.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {Array.from({ length: d.stars }, (_, i) => (
                        <span key={i} className="text-orange-500 text-xs leading-none">★</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Question ── */}
          {screen === "quiz" && q && (
            <div className="space-y-5">
              <p className="font-medium text-foreground leading-relaxed">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isAnswer   = i === q.answer
                  const isSelected = i === selected

                  let cls = "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-secondary/30"
                  if (selected !== null) {
                    if (isAnswer)                      cls = "border-green-500 bg-green-500/10 text-green-600"
                    else if (isSelected && !isCorrect) cls = "border-red-500 bg-red-500/10 text-red-500"
                    else                               cls = "border-border text-muted-foreground/40"
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => pickAnswer(i)}
                      disabled={selected !== null}
                      className={`w-full flex items-center gap-3 px-4 py-3 border rounded-xl text-sm text-left transition-all duration-200 disabled:cursor-default ${cls}`}
                    >
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                        selected !== null && isAnswer   ? "border-green-500 text-green-500" :
                        selected !== null && isSelected ? "border-red-500 text-red-500"     :
                        "border-current"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Result ── */}
          {screen === "result" && (
            <div className="space-y-5">
              <div className="text-center space-y-3 py-2">
                <div className="text-5xl">{perfect ? "🐉" : "😤"}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground tabular-nums">{score} / 7</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {perfect
                      ? hunterUnlocked
                        ? "Thème déjà débloqué — retrouve-le dans le sélecteur ✦"
                        : "Parfait ! Thème débloqué."
                      : `Il te faut 7/7 pour débloquer le thème caché. (${7 - score} réponse${7 - score > 1 ? "s" : ""} manquante${7 - score > 1 ? "s" : ""})`}
                  </p>
                </div>
              </div>

              {/* Score dots */}
              <div className="flex gap-1.5 justify-center">
                {Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      i < score
                        ? "bg-orange-500 shadow-sm shadow-orange-500/50"
                        : "bg-secondary border border-border"
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>

              {perfect ? (
                <div className="space-y-3">
                  {/* Portal reveal */}
                  <div className="relative p-5 rounded-xl border border-primary/50 bg-primary/5 text-center space-y-3 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
                    <Sparkles className="w-6 h-6 text-primary mx-auto animate-pulse" />
                    <div>
                      <p className="text-xs tracking-[0.2em] text-primary uppercase mb-0.5">Portail débloqué</p>
                      <p className="text-base font-bold text-foreground">hunterdevv0</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Le portfolio caché se révèle à toi.
                      </p>
                    </div>
                    {HUNTER_URL ? (
                      <a
                        href={HUNTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all"
                      >
                        Entrer dans le portail <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                    <p className="text-[11px] text-muted-foreground/60">
                      Thème activé dans le sélecteur ✦
                    </p>
                  </div>
                  <button
                    onClick={() => { retry(); onClose() }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={retry}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Rejouer
                  </button>
                </div>
              ) : (
                <button
                  onClick={retry}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réessayer
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── section content components ────────────────────── */

function PresentationMsg() {
  const { registerInteraction } = useTheme()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-border">
            <Image src="/profile.jpg" alt="Djoundi Bakari" width={80} height={80} className="object-cover w-full h-full" priority />
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
        </div>
        <div>
          <p className="text-xs text-primary uppercase tracking-widest mb-1">Disponible pour alternance</p>
          <h2 className="text-2xl font-bold text-foreground">Djoundi Bakari</h2>
          <p className="text-muted-foreground text-sm">Alternant Développeur Web · Epitech Lyon</p>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Bonjour ! Je suis étudiant en formation{" "}
        <span className="text-foreground font-medium">Web@cadémie à Epitech Lyon</span> (2025–2027).
        Motivé, sérieux et persévérant, je recherche une alternance en développement web pour mettre
        mes compétences au service de vos projets.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="/cv.pdf"
          download
          onClick={registerInteraction}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" /> Télécharger le CV
        </a>
        <a
          href="https://github.com/djoundibakari-blip"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition-all"
        >
          <GithubIcon className="w-4 h-4" /> GitHub
        </a>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-2">
        {[["6", "Projets"], ["3", "Blocs RNCP"], ["2025", "Promo"]].map(([n, l]) => (
          <div key={l} className="p-3 bg-secondary/50 border border-border rounded-xl text-center">
            <p className="text-xl font-bold text-primary">{n}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const TECHS = [
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

function AboutMsg() {
  return (
    <div className="space-y-5">
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        <p>
          J'ai obtenu mon{" "}
          <span className="text-foreground font-medium">Baccalauréat Général</span> en 2024 au
          Lycée Claude Louis Berthollet à Annecy, avec des spécialités en NSI et
          Histoire-Géopolitique.
        </p>
        <p>
          En dehors du code, je suis passionné par les{" "}
          <span className="text-foreground font-medium">mangas</span> et les jeux vidéos
          (League of Legends, Guilty Gear, Armored Core 6). Je parle couramment{" "}
          <span className="text-foreground font-medium">français</span> et l'anglais à un niveau
          intermédiaire.
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Mes technologies</p>
        <div className="flex flex-wrap gap-2">
          {TECHS.map((t) => (
            <div
              key={t.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/50 border border-border rounded-full text-sm text-foreground/80"
            >
              <t.icon style={{ color: t.color }} className="w-4 h-4 shrink-0" />
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectsMsg() {
  const { registerInteraction } = useTheme()
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group border border-border rounded-xl overflow-hidden bg-secondary/20 hover:border-primary/40 transition-all"
          >
            <div className="relative h-36 overflow-hidden bg-secondary">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="300px"
              />
            </div>
            <div className="p-3 space-y-2">
              <div>
                <p className="text-xs text-primary uppercase tracking-wider">{p.category}</p>
                <h4 className="font-semibold text-foreground text-sm mt-0.5">{p.title}</h4>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded-md border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={registerInteraction}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub
                </a>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={registerInteraction}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  Voir le site <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/projets" onClick={registerInteraction} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
        Voir tous les projets <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

const SKILL_BLOCKS = [
  {
    id: "bloc1",
    title: "Cadrer un projet et conceptualiser une solution web",
    color: "from-blue-500 to-cyan-500",
    skills: [
      "Rédiger un CDC", "Spécifications techniques", "Environnement de travail",
      "Réaliser une maquette", "Identifier les fonctionnalités", "Rédiger une présentation",
    ],
  },
  {
    id: "bloc2",
    title: "Développer une solution web",
    color: "from-emerald-500 to-teal-500",
    skills: [
      "Développer le prototype", "Rédiger le code", "Intégrer les éléments",
      "Front-end", "Back-end", "Authentification", "Plan de tests", "Déployer",
    ],
  },
  {
    id: "bloc3",
    title: "Déployer un système d'assurance qualité",
    color: "from-amber-500 to-orange-500",
    skills: [
      "Documentation technique", "Documentation utilisateur", "Monitorer le lancement",
      "Identifier les améliorations", "Ergonomie & accessibilité", "Document argumentatif",
    ],
  },
]

function CompetencesMsg() {
  const [open, setOpen] = useState<string | null>(null)
  const toggle = useCallback((id: string) => setOpen(prev => prev === id ? null : id), [])

  return (
    <div className="space-y-3">
      {SKILL_BLOCKS.map((b) => (
        <div key={b.id} className="border border-border rounded-xl overflow-hidden bg-secondary/20">
          <button
            onClick={() => toggle(b.id)}
            className="w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/40 transition-colors"
          >
            <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${b.color} shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm leading-tight">{b.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{b.skills.length} compétences</p>
            </div>
            {open === b.id
              ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
              : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
            }
          </button>
          {open === b.id && (
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              {b.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/60 border border-border/60 rounded-full text-xs text-foreground/80"
                >
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ContactMsg() {
  type FormState = "idle" | "loading" | "success" | "error"
  const { registerInteraction } = useTheme()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm]   = useState({ name: "", email: "", subject: "", message: "" })

  const updateField = useCallback((field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))
  , [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    registerInteraction()
    setState("loading")
    try {
      const res = await fetch("https://formsubmit.co/ajax/djoundi.bakari@outlook.fr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: `Portfolio — ${form.subject}`,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error()
      setState("success")
      setForm({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setState("idle"), 4000)
    } catch {
      setState("error")
      setTimeout(() => setState("idle"), 4000)
    }
  }

  const inputCls =
    "w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        {[
          { label: "Email",      value: "djoundi.bakari@outlook.fr", href: "mailto:djoundi.bakari@outlook.fr" },
          { label: "Téléphone",  value: "06 64 29 81 21",            href: "tel:+33664298121" },
          { label: "Localisation", value: "Lyon, France",            href: null },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-3 px-4 py-2.5 bg-secondary/30 border border-border rounded-lg">
            <span className="text-xs text-muted-foreground w-20 shrink-0">{c.label}</span>
            {c.href
              ? <a href={c.href} className="text-sm text-foreground hover:text-primary transition-colors">{c.value}</a>
              : <span className="text-sm text-foreground">{c.value}</span>
            }
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input type="text"  placeholder="Nom"   value={form.name}  onChange={updateField("name")}  required className={inputCls} />
          <input type="email" placeholder="Email" value={form.email} onChange={updateField("email")} required className={inputCls} />
        </div>
        <input type="text" placeholder="Sujet" value={form.subject} onChange={updateField("subject")} required className={inputCls} />
        <textarea
          rows={3}
          placeholder="Message…"
          value={form.message}
          onChange={updateField("message")}
          required
          className={`${inputCls} resize-none`}
        />
        <button
          type="submit"
          disabled={state === "loading" || state === "success"}
          className={`w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-70 ${
            state === "error"
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {state === "idle"    && <><Send className="w-4 h-4" />Envoyer</>}
          {state === "loading" && "Envoi…"}
          {state === "success" && "✓ Message envoyé !"}
          {state === "error"   && "Erreur — réessayez"}
        </button>
      </form>
    </div>
  )
}

const CONTENT: Record<string, { question: string; Component: React.FC }> = {
  presentation: { question: "Qui es-tu ?",                    Component: PresentationMsg },
  "a-propos":   { question: "Parle-moi de toi",               Component: AboutMsg },
  projets:      { question: "Montre-moi tes projets",         Component: ProjectsMsg },
  competences:  { question: "Quelles sont tes compétences ?", Component: CompetencesMsg },
  contact:      { question: "Comment te contacter ?",         Component: ContactMsg },
}

type Msg = { key: string; convId: string }

/* ─── main page ─────────────────────────────────────── */

const TYPED_WORD = "Bakari."

export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  )
}

function PortfolioApp() {
  const { registerInteraction, interactionCount, interactionEggTrigger } = useTheme()

  const [messages,    setMessages]    = useState<Msg[]>([])
  const [typing,      setTyping]      = useState(false)
  const [lastPill,    setLastPill]    = useState<string | null>(null)
  const [input,       setInput]       = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [typed,       setTyped]       = useState("")
  const [intro,       setIntro]       = useState(true)
  const [introOut,    setIntroOut]    = useState(false)
  const [quizOpen,    setQuizOpen]    = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  const isWelcome = messages.length === 0 && !typing

  /* easter egg — 7 general interactions anywhere on the portfolio */
  useEffect(() => {
    if (interactionEggTrigger > 0) setQuizOpen(true)
  }, [interactionEggTrigger])

  /* intro — once per session */
  useEffect(() => {
    if (sessionStorage.getItem("intro-done")) { setIntro(false); return }
    const fadeOut = setTimeout(() => setIntroOut(true),  2200)
    const hide    = setTimeout(() => {
      setIntro(false)
      sessionStorage.setItem("intro-done", "1")
    }, 2900)
    return () => { clearTimeout(fadeOut); clearTimeout(hide) }
  }, [])

  /* auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  /* typewriter on welcome screen */
  useEffect(() => {
    if (!isWelcome) return
    setTyped("")
    let i = 0
    const iv = setInterval(() => {
      i++
      setTyped(TYPED_WORD.slice(0, i))
      if (i >= TYPED_WORD.length) clearInterval(iv)
    }, 90)
    return () => clearInterval(iv)
  }, [isWelcome])

  const navigate = useCallback((convId: string) => {
    registerInteraction()
    setLastPill(convId)
    setSidebarOpen(false)
    setTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { key: `${convId}-${Date.now()}`, convId }])
      setTyping(false)
    }, 650)
  }, [registerInteraction])

  const reset = useCallback(() => {
    setMessages([])
    setTyping(false)
    setLastPill(null)
    setSidebarOpen(false)
  }, [])

  const handleInput = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const query = input.trim()
    if (!query) return

    /* secret text trigger */
    if (/^(dbz|kamehameha|dragon\s*ball)$/i.test(query)) {
      setQuizOpen(true)
      setInput("")
      return
    }

    const lower = query.toLowerCase()
    const match =
      PILLS.find(p =>
        lower.includes(p.target) ||
        lower.includes(p.text.toLowerCase().slice(0, 6))
      ) ?? PILLS[0]
    navigate(match.target)
    setInput("")
  }, [input, navigate])

  return (
    <>
      {/* ── Intro animation ── */}
      {intro && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${introOut ? "opacity-0" : "opacity-100"}`}>
          <div className="overflow-hidden mb-2 pb-1">
            <p className="text-xs font-medium text-primary uppercase tracking-[0.3em] intro-slide-up" style={{ animationDelay: "100ms" }}>
              Alternant Développeur Web
            </p>
          </div>
          <div className="overflow-hidden pb-3">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight intro-slide-up" style={{ animationDelay: "250ms" }}>
              Djoundi Bakari.
            </h1>
          </div>
        </div>
      )}

      {/* ── Crystal ball tracker — reacts to every interaction, always visible ── */}
      {!quizOpen && interactionCount > 0 && (
        <div className="fixed top-4 right-4 z-40 flex items-center gap-1.5">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i < interactionCount
                  ? "bg-orange-500 shadow-sm shadow-orange-500/50 scale-100"
                  : "bg-border scale-75 opacity-30"
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Quiz easter egg modal ── */}
      {quizOpen && <EasterEggModal onClose={() => setQuizOpen(false)} />}

      <div className="fixed inset-0 flex bg-background">

        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed md:relative z-40 flex flex-col h-full w-64 shrink-0
          bg-card border-r border-border
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <span className="text-base font-bold text-foreground">
              <span className="text-primary">&lt;</span>Djoundi<span className="text-primary">/&gt;</span>
            </span>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={reset}
                  title="Nouvelle conversation"
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors text-lg leading-none"
                >
                  +
                </button>
              )}
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto py-3 px-2">
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">Conversations</p>
              {messages.length > 0 && (
                <button onClick={reset} className="text-xs text-muted-foreground/50 hover:text-primary transition-colors">
                  Réinitialiser
                </button>
              )}
            </div>
            <nav className="space-y-0.5">
              {CONVS.map((c, i) => {
                const active = messages.some(m => m.convId === c.id) || lastPill === c.id
                return (
                  <button
                    key={c.id}
                    onClick={() => navigate(c.id)}
                    className={`sidebar-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-200 hover:translate-x-0.5 hover:bg-secondary/50 ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <MessageSquare className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-primary" : ""}`} />
                    {c.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="border-t border-border px-3 py-3 flex items-center justify-between">
            <a
              href="/cv.pdf"
              download
              onClick={registerInteraction}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> CV
            </a>
            <ThemeToggle />
          </div>
        </aside>

        {/* ── Main chat ── */}
        <main className="flex flex-1 flex-col min-w-0 h-full">

          {/* Mobile top bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/95 backdrop-blur md:hidden shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-foreground">
              {lastPill ? CONVS.find(c => c.id === lastPill)?.label : "Portfolio"}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <div className="max-w-3xl mx-auto space-y-8">

              {/* ── Welcome screen ── */}
              {isWelcome && (
                <div className="flex flex-col justify-center min-h-[85vh] py-10 space-y-10">

                  {/* Headline */}
                  <div>
                    <p
                      className="fade-up text-xs font-medium text-primary uppercase tracking-[0.28em] mb-5"
                      style={{ animationDelay: "0ms" }}
                    >
                      Alternant Développeur Web · Epitech Lyon
                    </p>
                    <div className="overflow-hidden">
                      <h1
                        className="fade-up text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] tracking-tight"
                        style={{ animationDelay: "80ms" }}
                      >
                        Je suis<br />
                        Djoundi{" "}
                        <span className="text-primary whitespace-nowrap">
                          {typed}
                          {typed !== TYPED_WORD && (
                            <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle animate-pulse" />
                          )}
                        </span>
                      </h1>
                    </div>
                  </div>

                  {/* AI chat bubble */}
                  <div
                    className="flex gap-3 items-start max-w-lg msg-in"
                    style={{ animationDelay: "400ms" }}
                  >
                    {/* Profile photo — one interaction among many towards the easter egg */}
                    <div className="relative shrink-0 mt-0.5">
                      <button
                        onClick={registerInteraction}
                        className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/30 cursor-pointer select-none focus:outline-none"
                        aria-label="Photo de profil"
                        tabIndex={-1}
                      >
                        <Image src="/profile.jpg" alt="Djoundi" width={36} height={36} className="object-cover w-full h-full" priority />
                      </button>
                    </div>

                    <div className="flex-1 bg-card border border-border/70 rounded-2xl rounded-tl-sm px-5 py-4">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-xs font-semibold text-foreground">Djoundi IA</span>
                        <span className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          en ligne
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Bonjour ! Je suis disponible pour répondre à toutes vos questions : mon profil,
                        mes projets, mes compétences ou pour un contact direct.
                      </p>
                    </div>
                  </div>

                  {/* Quick-start pills */}
                  <div className="msg-in" style={{ animationDelay: "700ms" }}>
                    <p className="text-xs text-muted-foreground/40 uppercase tracking-[0.22em] mb-3">
                      Commencer la conversation
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PILLS.map((p) => (
                        <button
                          key={p.target}
                          onClick={() => navigate(p.target)}
                          className="px-4 py-2 rounded-full text-sm border border-border/60 text-muted-foreground bg-secondary/20 hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                          {p.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Message history ── */}
              {messages.map((msg) => {
                const entry = CONTENT[msg.convId]
                if (!entry) return null
                return (
                  <div key={msg.key} className="space-y-4 msg-in">
                    {/* User bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-xs px-4 py-2.5 bg-primary text-primary-foreground rounded-2xl rounded-br-sm text-sm">
                        {entry.question}
                      </div>
                    </div>
                    {/* AI response */}
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
                        DJ
                      </div>
                      <div className="flex-1 bg-card border border-border rounded-2xl rounded-tl-sm p-4 md:p-5">
                        <entry.Component />
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* ── Typing indicator ── */}
              {typing && (
                <div className="space-y-4 msg-in">
                  <div className="flex justify-end">
                    <div className="max-w-xs px-4 py-2.5 bg-primary text-primary-foreground rounded-2xl rounded-br-sm text-sm opacity-70">
                      {lastPill ? CONTENT[lastPill]?.question : "…"}
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
                      DJ
                    </div>
                    <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* ── Input area ── */}
          <div className="shrink-0 border-t border-border bg-background/95 backdrop-blur px-4 md:px-8 py-4">
            <div className="max-w-3xl mx-auto space-y-3">
              {/* Suggestion pills */}
              <div className="flex flex-wrap gap-2">
                {PILLS.map((p) => (
                  <button
                    key={p.target}
                    onClick={() => navigate(p.target)}
                    disabled={typing}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all hover:border-primary/60 hover:text-primary hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                      lastPill === p.target && !typing
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground bg-secondary/30"
                    }`}
                  >
                    {p.text}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleInput} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Posez votre question…"
                  className="flex-1 px-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_15%,transparent)] transition-all duration-200"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 hover:scale-105 active:scale-90 transition-all duration-150"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
