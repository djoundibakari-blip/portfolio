"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from "lucide-react"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle"
  )
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setFormState("success")
    setFormData({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => setFormState("idle"), 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "djoundi.bakari@outlook.fr",
      href: "mailto:djoundi.bakari@outlook.fr",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "06 64 29 81 21",
      href: "tel:+33664298121",
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Lyon, France",
      href: null,
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Contact
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Travaillons ensemble
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              Vous avez un projet ou une opportunité d&apos;alternance ?
              N&apos;hésitez pas à me contacter !
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Restons en contact
                </h4>
                <p className="text-muted-foreground">
                  Je suis actuellement à la recherche d&apos;une alternance en
                  développement web. N&apos;hésitez pas à me contacter pour
                  discuter de vos projets ou opportunités.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Proposition d'alternance / Projet web"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState !== "idle"}
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {formState === "idle" && (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                  {formState === "loading" && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  )}
                  {formState === "success" && (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message envoyé !
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
