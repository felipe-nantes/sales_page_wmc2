'use client'
import { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export function HeroVSLScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // VSL card: starts 1000px below its anchored bottom-0 position, rises to natural position
  const vslY = useTransform(scrollYProgress, [0.1, 0.6], [1000, 0])
  // Hero cover dims as VSL rises over it
  const heroOpacity = useTransform(scrollYProgress, [0.25, 0.6], [1, 0.22])
  // Scroll cue vanishes as soon as user starts scrolling
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0])

  // Autoplay on viewport entry, auto-mute on exit
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            video.play().catch(() => {})
          } else if (!e.isIntersecting) {
            video.muted = true
            setMuted(true)
          }
        })
      },
      { threshold: [0, 0.5] }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  function toggleMute() {
    if (!videoRef.current) return
    videoRef.current.muted = false
    setMuted(false)
  }

  return (
    /*
     * Scroll driver: 260vh gives ~160vh of scroll distance inside the sticky context
     * (260vh - 100vh viewport = 160vh for animations + dwell time on settled VSL)
     */
    <div ref={containerRef} style={{ height: '260vh' }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100dvh', minHeight: '100vh', background: 'var(--color-bg)' }}
      >
        {/* ── HERO cover art ── */}
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity }}>
          <img
            src="/assets/wmc2-cover.png"
            alt="WMC2 — Weapons of Mass Construction 2"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </motion.div>

        {/* Texture overlays */}
        <div className="absolute inset-0 scanlines pointer-events-none z-10" />
        <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

        {/* Gradient — hero bleeds into the dark bg under the VSL card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
        />

        {/* ── Scroll cue ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          style={{ opacity: scrollCueOpacity }}
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] tracking-[0.6em] text-white/70 uppercase">
            scroll
          </span>
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
          >
            <div
              className="w-px h-10"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.65), transparent)' }}
            />
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="text-white/65">
              <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── VSL card — rises from below sticky viewport ── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 px-4 pb-5 md:pb-8"
          style={{ y: vslY }}
        >
          <div className="max-w-4xl mx-auto">

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

            {/* Video */}
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
              <div className="absolute inset-0 scanlines pointer-events-none" aria-hidden="true" />
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

          </div>
        </motion.div>
      </div>
    </div>
  )
}
