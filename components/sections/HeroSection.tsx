'use client'
import { motion } from 'framer-motion'
import { ErrorWindow, CtaButton, SystemLabel } from '@/components/ui'
import { content } from '@/content/content'

export function HeroSection() {
  const { hero } = content

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay scanlines"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Halftone background */}
      <div className="absolute inset-0 halftone opacity-40 pointer-events-none" />

      {/* Diagonal red accent lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[200%] h-[2px] bg-[#CC0000] opacity-20"
          style={{ top: '30%', left: '-50%', transform: 'rotate(-8deg)' }}
        />
        <div
          className="absolute w-[200%] h-[1px] bg-[#CC0000] opacity-10"
          style={{ top: '65%', left: '-50%', transform: 'rotate(-8deg)' }}
        />
      </div>

      {/* Floating Error Windows — hidden on mobile */}
      <motion.div
        className="absolute top-8 left-4 hidden md:block z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <ErrorWindow
          title={hero.errorWindows[0].title}
          message={hero.errorWindows[0].message}
          variant={hero.errorWindows[0].variant}
          className="w-56 opacity-80"
        />
      </motion.div>

      <motion.div
        className="absolute top-10 right-4 hidden md:block z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <ErrorWindow
          title={hero.errorWindows[1].title}
          message={hero.errorWindows[1].message}
          variant={hero.errorWindows[1].variant}
          className="w-52 opacity-80"
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto pt-16 pb-12 md:pt-20 md:pb-16">

        {/* System label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 md:mb-6"
        >
          <SystemLabel text={hero.systemLabel} />
        </motion.div>

        {/* WMC2 Logo — glitch effect */}
        <motion.h1
          className="glitch-text font-impact leading-none text-[#CC0000] tracking-tight select-none"
          data-text={hero.titleGlitch}
          style={{
            fontFamily: 'Anton, Impact, sans-serif',
            fontSize: 'clamp(5rem, 22vw, 14rem)',
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-mono text-[10px] md:text-sm tracking-[0.35em] md:tracking-[0.4em] text-[#666] uppercase mt-2 mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* VSL Player */}
        <motion.div
          className="w-full max-w-3xl mx-auto border border-[#222] relative"
          style={{ background: '#000' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Red top border accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#CC0000] z-10" />

          <video
            controls
            preload="metadata"
            className="w-full aspect-video"
            style={{ display: 'block', background: '#000' }}
          >
            <source src="/assets/vsl.mp4" type="video/mp4" />
            Seu browser não suporta o player de vídeo.
          </video>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-8 md:mt-10 w-full max-w-sm md:max-w-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <CtaButton
            label={hero.cta.label}
            price={hero.cta.price}
            href={hero.cta.href}
            subLabel={hero.cta.sub}
            size="lg"
          />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 md:h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }}
      />
    </section>
  )
}
