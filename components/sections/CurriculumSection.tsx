'use client'
import { motion, Variants } from 'framer-motion'
import { SystemLabel, ErrorWindow } from '@/components/ui'
import { content } from '@/content/content'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: 'easeOut' as const },
  }),
}

export function CurriculumSection() {
  const { curriculum, bonuses } = content

  return (
    <section
      className="relative overflow-hidden noise-overlay scanlines"
      style={{ background: 'transparent' }}
    >
      {/* Halftone */}
      <div className="absolute inset-0 halftone pointer-events-none opacity-50" />

      {/* Error window */}
      <div
        className="absolute top-3 right-3 z-20"
        aria-hidden="true"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <ErrorWindow
          title="ALERT.exe"
          message="PROTOCOLO ATIVO"
          variant="alert"
          size="sm"
          className="w-32 md:w-40 opacity-80"
        />
      </div>

      {/* ── Art layer ── */}
      {/* Giant centered — reaper */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.22 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2 }}
      >
        <img src="/assets/reaper2.png" alt="" className="art-dedsec h-[75vh]" />
      </motion.div>

      {/* Bleed right — skeleton */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 flex items-center pointer-events-none z-[3]"
        aria-hidden="true"
        style={{ transform: 'translateX(42%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.48 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
      >
        <img src="/assets/skeleton4.png" alt="" className="art-dedsec h-[65vh]" />
      </motion.div>

      {/* Anchor — lightning canto inferior esquerdo */}
      <motion.div
        className="absolute bottom-8 left-8 pointer-events-none z-[3] hidden md:block"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.62 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img src="/assets/lightning.png" alt="" className="art-dedsec w-10" style={{ transform: 'rotate(10deg)' }} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-14 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* ── CURRICULUM ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div custom={0} variants={fadeUp} className="mb-4">
              <SystemLabel text={curriculum.systemLabel} />
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-impact text-white uppercase mb-3 whitespace-pre-line leading-[1.05] term-heading"
              style={{
                fontFamily: 'Anton, Impact, sans-serif',
                fontSize: 'clamp(1.8rem, 5.5vw, 3rem)',
              }}
            >
              {curriculum.headline}
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="font-mono text-xs text-[#555] tracking-wide mb-8 md:mb-10 italic term-copy"
            >
              {curriculum.disclaimer}
            </motion.p>

            <div>
              {curriculum.modules.map((mod, i) => (
                <motion.div
                  key={mod.num}
                  custom={i + 3}
                  variants={fadeUp}
                  className="flex items-start gap-4 py-3 md:py-4 border-b border-[#1e1e1e] group hover:border-red/40 transition-colors duration-200 bg-black/75 px-2"
                >
                  <span
                    className="font-mono text-xs text-red tracking-widest mt-[2px] shrink-0 w-6"
                    aria-hidden="true"
                  >
                    {mod.num}
                  </span>
                  <span className="font-mono text-sm text-[#ccc] group-hover:text-white transition-colors duration-200 leading-snug">
                    {mod.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── BONUSES — Win98 terminal window style ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="border border-red/40" style={{ boxShadow: '4px 4px 0 rgba(204,0,0,0.15)' }}>
              {/* Title bar */}
              <div className="bg-red flex items-center justify-between px-3 py-2">
                <span className="font-mono text-[10px] md:text-xs text-white tracking-widest uppercase">
                  {bonuses.systemLabel}
                </span>
                <span className="font-mono text-[10px] text-white/70 select-none">■ ■ ✕</span>
              </div>

              {/* Body */}
              <div className="bg-[#111]">
                {bonuses.items.map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i + 1}
                    variants={fadeUp}
                    className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-[#1e1e1e] last:border-b-0 group hover:bg-[#1a1a1a] transition-colors"
                  >
                    <span className="text-red font-mono text-sm shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="font-mono text-sm text-[#ccc] group-hover:text-white transition-colors leading-snug">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Status bar */}
              <div className="bg-[#0d0d0d] border-t border-[#1e1e1e] px-3 py-1 flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#444] tracking-widest">
                  STATUS: ACTIVE
                </span>
                <span className="text-[#444]">·</span>
                <span className="font-mono text-[10px] text-[#444] tracking-widest">
                  {bonuses.items.length} ITEMS LOADED
                </span>
              </div>
            </div>

            {/* Decorative pixel cluster */}
            <div className="mt-6 flex justify-end items-end gap-3" aria-hidden="true">
              <img src="/assets/reaper-icon.png" alt="" className="art-dedsec w-10 h-10 opacity-25" />
              <img src="/assets/skull-pixel.png" alt="" className="art-dedsec w-16 h-16 opacity-30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
