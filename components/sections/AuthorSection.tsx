'use client'
import { motion } from 'framer-motion'
import { SystemLabel, ErrorWindow } from '@/components/ui'
import { content } from '@/content/content'

export function AuthorSection() {
  const { author } = content

  return (
    <section
      aria-label="Sobre o autor"
      className="relative overflow-hidden scanlines"
      style={{ background: 'transparent' }}
    >

      {/* Halftone */}
      <div className="absolute inset-0 halftone pointer-events-none opacity-20" />

      {/* ── Art layer ── */}
      {/* Giant centered — mummy */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.22 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2 }}
      >
        <img src="/assets/mummy.png" alt="" className="art-dedsec h-[75vh]" />
      </motion.div>

      {/* Bleed right — skeleton */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 flex items-center pointer-events-none z-[3]"
        aria-hidden="true"
        style={{ transform: 'translateX(20%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.48 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
      >
        <img src="/assets/skeleton2.png" alt="" className="art-dedsec h-[65vh]" />
      </motion.div>

      {/* Anchor — reaper-icon próximo ao heading */}
      <motion.div
        className="absolute top-[8%] left-[5%] pointer-events-none z-[11] hidden md:block"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.58 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img src="/assets/reaper-icon.png" alt="" className="art-dedsec w-16" style={{ transform: 'rotate(-6deg)' }} />
      </motion.div>

      {/* Error window */}
      <div
        className="absolute top-3 right-3 z-20"
        aria-hidden="true"
        style={{ transform: 'rotate(1deg)' }}
      >
        <ErrorWindow
          title="ACCESS GRANTED"
          message="USER_01 — AUTENTICADO"
          variant="granted"
          size="sm"
          className="w-36 md:w-48 opacity-80"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          <motion.div
            className="flex flex-col items-center md:items-start gap-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            {/* Photo */}
            <div className="relative w-full max-w-[280px] md:max-w-xs aspect-square border border-red/30 overflow-hidden mx-auto md:mx-0">
              <img
                src="/assets/mrsaizen.png"
                alt="MrSaizen"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-red/60 z-20" aria-hidden="true" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-red/60 z-20" aria-hidden="true" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-red/60 z-20" aria-hidden="true" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-red/60 z-20" aria-hidden="true" />
            </div>

            {/* Badge */}
            <div
              className="border-2 border-red/60 px-5 py-3 text-center"
              style={{
                transform: 'rotate(-2deg)',
                boxShadow: '0 0 0 1px rgba(204,0,0,0.2), inset 0 0 0 2px rgba(204,0,0,0.1)',
              }}
            >
              <div className="border-t border-b border-red/40 py-2">
                <p className="font-mono text-[9px] tracking-[0.3em] text-red uppercase whitespace-pre-line leading-loose">
                  {author.badgeText}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SystemLabel text={author.systemLabel} className="mb-5 md:mb-6 block" />

            <h2
              className="font-impact text-white uppercase mb-6 md:mb-8 whitespace-pre-line leading-[1.05] term-heading"
              style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)' }}
            >
              {author.headline}
            </h2>

            <div className="w-12 h-[2px] bg-red mb-6 md:mb-8" />

            <div>
              {author.lines.map((line, i) =>
                line === '' ? (
                  <div key={`line-${i}`} className="h-3" />
                ) : (
                  <p key={`line-${i}`} className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed term-copy">
                    {line}
                  </p>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
