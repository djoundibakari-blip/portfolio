import { NextRequest, NextResponse } from "next/server"

const N8N_CHAT_WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  if (!message || typeof message !== "string") {
    return NextResponse.json({ reply: "Pose-moi une vraie question !" })
  }

  if (!N8N_CHAT_WEBHOOK_URL) {
    return NextResponse.json({
      reply: "L'assistant IA n'est pas encore configuré côté serveur.",
    })
  }

  try {
    const res = await fetch(N8N_CHAT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(20000),
    })

    if (!res.ok) throw new Error(`n8n webhook a répondu ${res.status}`)

    const data = await res.json()
    const reply = typeof data.reply === "string" && data.reply.trim()
      ? data.reply
      : "Désolé, je n'ai pas de réponse pour le moment."

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({
      reply: "Oups, une erreur est survenue en contactant l'assistant. Réessaie dans un instant !",
    })
  }
}
