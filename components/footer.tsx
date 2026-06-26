import { Mail, Phone, MapPin, Download } from "lucide-react"
import { GithubIcon } from "@/components/icons"

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Main footer grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <a
              href="#accueil"
              className="logo text-xl font-bold text-foreground hover:text-primary transition-colors inline-block"
            >
              <span className="text-primary">&lt;</span>
              Djoundi
              <span className="text-primary">/&gt;</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Alternant développeur web en formation à Epitech Lyon. Passionné
              par la création de solutions web modernes.
            </p>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1 bg-primary/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Disponible pour alternance
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-4 bg-border" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">Navigation</span>
              </div>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-muted-foreground/50 tracking-wide border-t border-border/50 pt-4">
              Formation Epitech Lyon · 2025–2027
            </p>
          </div>

          {/* Col 3: Contact & social */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-4 bg-border" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">Contact</span>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:djoundi.bakari@outlook.fr"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    djoundi.bakari@outlook.fr
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33664298121"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    06 64 29 81 21
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  Lyon · 45.748° N, 4.847° E
                </li>
              </ul>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/djoundibakari-blip"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:djoundi.bakari@outlook.fr"
                className="p-2 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+33664298121"
                className="p-2 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="Téléphone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Djoundi Bakari. Tous droits réservés.
          </p>
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Télécharger CV
          </a>
        </div>
      </div>
    </footer>
  )
}
