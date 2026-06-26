"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Send, Download, ArrowUpRight, ChevronDown, ChevronUp,
  Menu, X, MessageSquare,
} from "lucide-react"
import {
  SiHtml5, SiCss, SiJavascript, SiPhp, SiMysql,
  SiDocker, SiGit, SiTailwindcss, SiBootstrap, SiSpring,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { GithubIcon } from "@/components/icons"
import { projects } from "@/lib/projects-data"

/* ─── conversations ──────────────────────────────────── */

const CONVS = [
  { id: "presentation", label: "Présentation" },
  { id: "a-propos",    label: "À propos" },
  { id: "projets",     label: "Mes projets" },
  { id: "competences", label: "Compétences" },
  { id: "contact",     label: "Contact" },
]

const PILLS = [
  { text: "Qui es-tu ?",                  target: "presentation" },
  { text: "Parle-moi de toi",             target: "a-propos" },
  { text: "Montre-moi tes projets",       target: "projets" },
  { text: "Quelles sont tes compétences ?", target: "competences" },
  { text: "Comment te contacter ?",       target: "contact" },
]

/* ─── chat content components ───────────────────────── */

function PresentationMsg() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-border">
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
        Bonjour ! Je suis étudiant en formation <span className="text-foreground font-medium">Web@cadémie à Epitech Lyon</span> (2025–2027).
        Motivé, sérieux et persévérant, je recherche une alternance en développement web pour mettre mes compétences au service de vos projets.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="/cv.pdf" download className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all">
          <Download className="w-4 h-4" /> Télécharger le CV
        </a>
        <a href="https://github.com/djoundibakari-blip" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition-all">
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

function AboutMsg() {
  return (
    <div className="space-y-5">
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        <p>
          J'ai obtenu mon <span className="text-foreground font-medium">Baccalauréat Général</span> en 2024 au Lycée Claude Louis Berthollet à Annecy,
          avec des spécialités en NSI et Histoire-Géopolitique.
        </p>
        <p>
          En dehors du code, je suis passionné par les <span className="text-foreground font-medium">mangas</span> et les jeux vidéos
          (League of Legends, Guilty Gear, Armored Core 6). Je parle couramment <span className="text-foreground font-medium">français</span> et l'anglais à un niveau intermédiaire.
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Mes technologies</p>
        <div className="flex flex-wrap gap-2">
          {techs.map((t) => (
            <div key={t.name} className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/50 border border-border rounded-full text-sm text-foreground/80">
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
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        {projects.map((p) => (
          <div key={p.id} className="group border border-border rounded-xl overflow-hidden bg-secondary/20 hover:border-primary/40 transition-all">
            <div className="relative h-36 overflow-hidden bg-secondary">
              <Image src={p.image} alt={p.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" sizes="300px" />
            </div>
            <div className="p-3 space-y-2">
              <div>
                <p className="text-xs text-primary uppercase tracking-wider">{p.category}</p>
                <h4 className="font-semibold text-foreground text-sm mt-0.5">{p.title}</h4>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded-md border border-border">{t}</span>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub
                </a>
                <a href={p.live} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline transition-colors">
                  Voir le site <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/projets" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
        Voir tous les projets <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

const skillBlocks = [
  {
    id: "bloc1", title: "Cadrer un projet et conceptualiser une solution web",
    color: "from-blue-500 to-cyan-500",
    skills: ["Rédiger un CDC", "Spécifications techniques", "Environnement de travail", "Réaliser une maquette", "Identifier les fonctionnalités", "Rédiger une présentation"],
  },
  {
    id: "bloc2", title: "Développer une solution web",
    color: "from-emerald-500 to-teal-500",
    skills: ["Développer le prototype", "Rédiger le code", "Intégrer les éléments", "Front-end", "Back-end", "Authentification", "Plan de tests", "Déployer"],
  },
  {
    id: "bloc3", title: "Déployer un système d'assurance qualité",
    color: "from-amber-500 to-orange-500",
    skills: ["Documentation technique", "Documentation utilisateur", "Monitorer le lancement", "Identifier les améliorations", "Ergonomie & accessibilité", "Document argumentatif"],
  },
]

function CompetencesMsg() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="space-y-3">
      {skillBlocks.map((b) => (
        <div key={b.id} className="border border-border rounded-xl overflow-hidden bg-secondary/20">
          <button onClick={() => setOpen(open === b.id ? null : b.id)}
            className="w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/40 transition-colors">
            <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${b.color} shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm leading-tight">{b.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{b.skills.length} compétences</p>
            </div>
            {open === b.id ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
          </button>
          {open === b.id && (
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              {b.skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/60 border border-border/60 rounded-full text-xs text-foreground/80">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />{s}
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
  const [state, setState] = useState<"idle"|"loading"|"success"|"error">("idle")
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("loading")
    try {
      const res = await fetch("https://formsubmit.co/ajax/djoundi.bakari@outlook.fr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, _subject: `Portfolio — ${form.subject}`, message: form.message }),
      })
      if (!res.ok) throw new Error()
      setState("success")
      setForm({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setState("idle"), 4000)
    } catch { setState("error"); setTimeout(() => setState("idle"), 4000) }
  }

  const inputCls = "w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        {[
          { label: "Email", value: "djoundi.bakari@outlook.fr", href: "mailto:djoundi.bakari@outlook.fr" },
          { label: "Téléphone", value: "06 64 29 81 21", href: "tel:+33664298121" },
          { label: "Localisation", value: "Lyon, France", href: null },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-3 px-4 py-2.5 bg-secondary/30 border border-border rounded-lg">
            <span className="text-xs text-muted-foreground w-20 shrink-0">{c.label}</span>
            {c.href ? (
              <a href={c.href} className="text-sm text-foreground hover:text-primary transition-colors">{c.value}</a>
            ) : (
              <span className="text-sm text-foreground">{c.value}</span>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Nom" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className={inputCls} />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required className={inputCls} />
        </div>
        <input type="text" placeholder="Sujet" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required className={inputCls} />
        <textarea rows={3} placeholder="Message..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required className={`${inputCls} resize-none`} />
        <button type="submit" disabled={state === "loading" || state === "success"}
          className={`w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold rounded-lg transition-all disabled:opacity-70 ${state === "error" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
          {state === "idle" && <><Send className="w-4 h-4" />Envoyer</>}
          {state === "loading" && "Envoi..."}
          {state === "success" && "✓ Message envoyé !"}
          {state === "error" && "Erreur — réessayez"}
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

export default function Home() {
  const [messages, setMessages]       = useState<Msg[]>([])
  const [typing, setTyping]           = useState(false)
  const [lastPill, setLastPill]       = useState<string | null>(null)
  const [input, setInput]             = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  const navigate = (convId: string) => {
    setLastPill(convId)
    setSidebarOpen(false)
    setTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { key: `${convId}-${Date.now()}`, convId }])
      setTyping(false)
    }, 650)
  }

  const reset = () => {
    setMessages([])
    setTyping(false)
    setLastPill(null)
    setSidebarOpen(false)
  }

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const lower = input.toLowerCase()
    const match = PILLS.find(p =>
      lower.includes(p.target) ||
      lower.includes(p.text.toLowerCase().slice(0, 6))
    ) ?? PILLS[0]
    navigate(match.target)
    setInput("")
  }

  return (
    <ThemeProvider>
      <div className="fixed inset-0 flex bg-background">

        {/* ── Sidebar ── */}
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`
          fixed md:relative z-40 flex flex-col h-full w-64 shrink-0
          bg-card border-r border-border
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <span className="logo text-base font-bold text-foreground">
              <span className="text-primary">&lt;</span>Djoundi<span className="text-primary">/&gt;</span>
            </span>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button onClick={reset} title="Nouvelle conversation"
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors text-lg leading-none">
                  +
                </button>
              )}
              <button onClick={() => setSidebarOpen(false)} className="md:hidden text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversations */}
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
              {CONVS.map((c) => {
                const mentioned = messages.some(m => m.convId === c.id) || lastPill === c.id
                return (
                  <button key={c.id} onClick={() => navigate(c.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                      mentioned
                        ? "text-foreground hover:bg-secondary/50"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}>
                    <MessageSquare className={`w-4 h-4 shrink-0 ${mentioned ? "text-primary" : ""}`} />
                    {c.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="border-t border-border px-3 py-3 flex items-center justify-between gap-2">
            <a href="/cv.pdf" download
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Download className="w-3.5 h-3.5" /> CV
            </a>
            <ThemeToggle />
          </div>
        </aside>

        {/* ── Main chat area ── */}
        <main className="flex flex-1 flex-col min-w-0 h-full">

          {/* Top bar (mobile) */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/95 backdrop-blur md:hidden shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground">
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-foreground">
              {lastPill ? CONVS.find(c => c.id === lastPill)?.label : "Portfolio"}
            </span>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <div className="max-w-3xl mx-auto space-y-8">

              {/* Welcome (empty history) */}
              {messages.length === 0 && !typing && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/10">
                    <Image src="/profile.jpg" alt="Djoundi" width={80} height={80} className="object-cover w-full h-full" priority />
                  </div>
                  <div className="space-y-1.5">
                    <h1 className="text-3xl font-bold text-foreground">Djoundi Bakari</h1>
                    <p className="text-muted-foreground text-sm">Alternant Développeur Web · Epitech Lyon</p>
                  </div>
                  <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
                    Bonjour ! Posez-moi une question pour en savoir plus sur mon profil, mes projets et mes compétences.
                  </p>
                  {/* Quick-start pills inside welcome */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-md">
                    {PILLS.map((p) => (
                      <button key={p.target} onClick={() => navigate(p.target)}
                        className="px-4 py-2 rounded-full text-sm border border-border text-muted-foreground bg-card hover:border-primary/60 hover:text-primary transition-all">
                        {p.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message history */}
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

              {/* Typing indicator */}
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
                  <button key={p.target} onClick={() => navigate(p.target)} disabled={typing}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all hover:border-primary/60 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed ${
                      lastPill === p.target && !typing
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground bg-secondary/30"
                    }`}>
                    {p.text}
                  </button>
                ))}
              </div>

              {/* Input field */}
              <form onSubmit={handleInput} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Posez votre question…"
                  className="flex-1 px-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button type="submit"
                  className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
