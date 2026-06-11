"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface DragonBallIntroProps {
  onComplete: () => void
}

export function DragonBallIntro({ onComplete }: DragonBallIntroProps) {
  const [stage, setStage] = useState(0)
  // 0: Dragon Balls visible
  // 1: Glow animation
  // 2: Flash white
  // 3: Shenron appears
  // 4: Text appears
  // 5: Fade out

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Stage 0 -> 1: Start glow after 500ms
    timers.push(setTimeout(() => setStage(1), 500))
    
    // Stage 1 -> 2: Flash after glow (2s)
    timers.push(setTimeout(() => setStage(2), 2500))
    
    // Stage 2 -> 3: Shenron after flash (300ms)
    timers.push(setTimeout(() => setStage(3), 2800))
    
    // Stage 3 -> 4: Text after Shenron (1s)
    timers.push(setTimeout(() => setStage(4), 3800))
    
    // Stage 4 -> 5: Fade out after text (2.5s)
    timers.push(setTimeout(() => setStage(5), 6300))
    
    // Complete after fade out (1s)
    timers.push(setTimeout(() => onComplete(), 7300))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000 ${
        stage === 5 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Dragon Balls - Stages 0, 1 */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          stage >= 2 ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="grid gap-4">
          {/* Row 1: 3 balls */}
          <div className="flex justify-center gap-4">
            {[1, 2, 3].map((num) => (
              <DragonBall key={num} number={num} isGlowing={stage >= 1} delay={num * 100} />
            ))}
          </div>
          {/* Row 2: 2 balls */}
          <div className="flex justify-center gap-4">
            {[4, 5].map((num) => (
              <DragonBall key={num} number={num} isGlowing={stage >= 1} delay={num * 100} />
            ))}
          </div>
          {/* Row 3: 2 balls */}
          <div className="flex justify-center gap-4">
            {[6, 7].map((num) => (
              <DragonBall key={num} number={num} isGlowing={stage >= 1} delay={num * 100} />
            ))}
          </div>
        </div>
      </div>

      {/* White Flash - Stage 2 */}
      <div 
        className={`absolute inset-0 bg-white transition-opacity duration-300 ${
          stage === 2 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Shenron - Stages 3, 4 */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
          stage >= 3 && stage < 5 ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="relative w-full max-w-2xl aspect-video animate-float">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shenlong.jpg-mW9weQsgyKVZt7UXzt4zpns7Dyu7n5.webp"
            alt="Shenron"
            fill
            className="object-contain drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]"
            priority
          />
        </div>
        
        {/* Text - Stage 4 */}
        <p 
          className={`mt-8 text-2xl md:text-4xl font-bold text-white text-center transition-all duration-700 ${
            stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            textShadow: "0 0 20px rgba(250, 204, 21, 0.8), 0 0 40px rgba(250, 204, 21, 0.5)"
          }}
        >
          Votre souhait a ete exauce
        </p>
      </div>
    </div>
  )
}

function DragonBall({ number, isGlowing, delay }: { number: number; isGlowing: boolean; delay: number }) {
  const getStarPositions = (count: number) => {
    const positions: { top: string; left: string }[] = []
    
    if (count === 1) {
      positions.push({ top: "50%", left: "50%" })
    } else if (count === 2) {
      positions.push({ top: "35%", left: "50%" })
      positions.push({ top: "65%", left: "50%" })
    } else if (count === 3) {
      positions.push({ top: "30%", left: "50%" })
      positions.push({ top: "60%", left: "35%" })
      positions.push({ top: "60%", left: "65%" })
    } else if (count === 4) {
      positions.push({ top: "30%", left: "35%" })
      positions.push({ top: "30%", left: "65%" })
      positions.push({ top: "60%", left: "35%" })
      positions.push({ top: "60%", left: "65%" })
    } else if (count === 5) {
      positions.push({ top: "25%", left: "50%" })
      positions.push({ top: "45%", left: "30%" })
      positions.push({ top: "45%", left: "70%" })
      positions.push({ top: "65%", left: "35%" })
      positions.push({ top: "65%", left: "65%" })
    } else if (count === 6) {
      positions.push({ top: "25%", left: "35%" })
      positions.push({ top: "25%", left: "65%" })
      positions.push({ top: "50%", left: "25%" })
      positions.push({ top: "50%", left: "75%" })
      positions.push({ top: "70%", left: "35%" })
      positions.push({ top: "70%", left: "65%" })
    } else if (count === 7) {
      positions.push({ top: "20%", left: "50%" })
      positions.push({ top: "35%", left: "30%" })
      positions.push({ top: "35%", left: "70%" })
      positions.push({ top: "55%", left: "25%" })
      positions.push({ top: "55%", left: "75%" })
      positions.push({ top: "75%", left: "35%" })
      positions.push({ top: "75%", left: "65%" })
    }
    
    return positions
  }

  const starPositions = getStarPositions(number)

  return (
    <div 
      className="relative w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-1000"
      style={{
        background: "radial-gradient(circle at 30% 30%, #ffd700, #ff8c00, #ff6600)",
        boxShadow: isGlowing 
          ? `0 0 20px #ffd700, 0 0 40px #ff8c00, 0 0 60px #ff6600, inset 0 0 20px rgba(255,255,255,0.3)` 
          : "inset 0 0 20px rgba(255,255,255,0.3)",
        transitionDelay: `${delay}ms`,
        animation: isGlowing ? "pulse-glow 1s ease-in-out infinite" : "none"
      }}
    >
      {/* Highlight */}
      <div 
        className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full bg-white/60"
        style={{ top: "15%", left: "15%" }}
      />
      
      {/* Stars */}
      {starPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 md:w-2.5 md:h-2.5"
          style={{
            top: pos.top,
            left: pos.left,
            transform: "translate(-50%, -50%)"
          }}
        >
          <svg viewBox="0 0 24 24" fill="#cc0000" className="w-full h-full">
            <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
          </svg>
        </div>
      ))}
    </div>
  )
}
