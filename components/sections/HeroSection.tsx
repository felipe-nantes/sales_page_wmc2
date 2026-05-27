'use client'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100dvh', minHeight: '100vh' }}
      aria-label="Hero"
    >
      {/* Full-screen cover art */}
      <div className="absolute inset-0">
        <img
          src="/assets/wmc2-cover.png"
          alt="WMC2 — Weapons of Mass Construction 2"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10" />
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
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
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            className="text-white/65"
          >
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
    </section>
  )
}
