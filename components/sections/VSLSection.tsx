'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SlashBand, ErrorWindow } from '@/components/ui'

export function VSLSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isInView) {
      video.play().catch(() => {})
    }
  }, [isInView])

  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    setMuted(false)
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Vídeo de apresentação"
      className="relative overflow-hidden scanlines"
      style={{ background: 'var(--color-bg-alt)' }}
    >
      {/* Halftone */}
      <div className="absolute inset-0 halftone pointer-events-none opacity-30" />

      {/* Mummy — right bleed */}
      <div className="absolute top-0 right-0 bottom-0 w-1/2 flex items-end justify-end pointer-events-none" aria-hidden="true">
        <img src="/assets/mummy.png" alt="" className="art-dedsec h-[55vh] md:h-[78vh] object-contain object-bottom opacity-[0.07] md:opacity-[0.22]" />
      </div>

      {/* Slash accent */}
      <SlashBand top="18%" height={52} label="" />

      {/* Error window */}
      <div
        className="absolute top-3 left-3 z-20"
        aria-hidden="true"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <ErrorWindow
          title="WMC2.exe"
          message="PLAYING..."
          variant="alert"
          size="sm"
          className="w-32 md:w-40 opacity-80"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 md:py-24 relative z-10">
        {/* Rise animation wrapper */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center justify-between bg-[#111] border border-red/40 border-b-0 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red/80" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#555]" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#555]" aria-hidden="true" />
              <span className="font-mono text-[10px] md:text-xs text-[#888] tracking-widest uppercase ml-2">
                WMC2.exe — VIDEO SALES LETTER
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[9px] text-red tracking-widest uppercase">● REC</span>
            </div>
          </div>

          {/* Video container */}
          <div
            className="relative border border-red/40 overflow-hidden bg-black"
            style={{ aspectRatio: '16 / 9', boxShadow: '4px 4px 0 rgba(204,0,0,0.15)' }}
          >
            <video
              ref={videoRef}
              src="/assets/vsl.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Scanline overlay on video */}
            <div className="absolute inset-0 scanlines pointer-events-none" aria-hidden="true" />

            {/* Unmute button — hidden once user unmutes */}
            {muted && (
              <div className="absolute inset-0 flex items-end justify-end p-4 md:p-6">
                <button
                  onClick={toggleMute}
                  className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase bg-black/70 border border-red/60 text-red px-4 py-2 hover:bg-red hover:text-white transition-colors duration-200 backdrop-blur-sm"
                  aria-label="Ativar áudio do vídeo"
                >
                  🔊 ATIVAR ÁUDIO
                </button>
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="bg-[#0d0d0d] border border-red/40 border-t-0 px-3 py-1.5 flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#444] tracking-widest uppercase">
              STATUS: TRANSMITTING
            </span>
            <span className="font-mono text-[9px] text-[#444] tracking-widest uppercase">
              {muted ? 'MUTED' : 'AUDIO ON'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Pixel decoratives */}
      <div className="absolute bottom-3 left-4 z-10 flex items-end gap-3" aria-hidden="true">
        <img src="/assets/reaper-icon.png" alt="" className="art-dedsec w-10 h-10 opacity-30" />
        <img src="/assets/chatter-teeth.png" alt="" className="art-dedsec w-10 h-10 opacity-20" />
      </div>

      <div className="w-full h-[1px] bg-red/30" />
    </section>
  )
}
