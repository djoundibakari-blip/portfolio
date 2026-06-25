import { Mail, Phone } from "lucide-react"
import { GithubIcon } from "@/components/icons"

const socialLinks = [
  {
    icon: GithubIcon,
    href: "https://github.com/djoundibakari-blip",
    label: "GitHub",
  },
  {
    icon: Mail,
    href: "mailto:djoundi.bakari@outlook.fr",
    label: "Email",
  },
  {
    icon: Phone,
    href: "tel:+33664298121",
    label: "Téléphone",
  },
]

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and description */}
          <div>
            <a
              href="#accueil"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors inline-block mb-4"
            >
              <span className="text-primary">&lt;</span>
              Djoundi
              <span className="text-primary">/&gt;</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Alternant développeur web en formation à Epitech Lyon. Passionné
              par la création de solutions web modernes.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2 bg-card border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border flex items-center justify-center gap-4">
          <a
            href="/cv.pdf"
            download
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Télécharger CV
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="https://github.com/djoundibakari-blip"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
