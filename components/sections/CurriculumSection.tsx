'use client'
import { motion, Variants } from 'framer-motion'
import { SystemLabel } from '@/components/ui'
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
      className="relative noise-overlay"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-28">
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
              className="font-impact text-white uppercase mb-3 whitespace-pre-line leading-[1.05]"
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
              className="font-mono text-xs text-[#555] tracking-wide mb-8 md:mb-10 italic"
            >
              {curriculum.disclaimer}
            </motion.p>

            <div>
              {curriculum.modules.map((mod, i) => (
                <motion.div
                  key={mod.num}
                  custom={i + 3}
                  variants={fadeUp}
                  className="flex items-start gap-4 py-3 md:py-4 border-b border-[#1e1e1e] group hover:border-[#CC0000]/40 transition-colors duration-200"
                >
                  <span
                    className="font-mono text-xs text-[#CC0000] tracking-widest mt-[2px] shrink-0 w-6"
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

          {/* ── BONUSES ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="border border-[#CC0000]/40">
              <div className="bg-[#CC0000] flex items-center justify-between px-3 py-2">
                <span className="font-mono text-[10px] md:text-xs text-white tracking-widest uppercase">
                  {bonuses.systemLabel}
                </span>
                <span className="font-mono text-[10px] text-white/70 select-none">■ ■ ✕</span>
              </div>

              <div className="bg-[#111]">
                {bonuses.items.map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i + 1}
                    variants={fadeUp}
                    className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-[#1e1e1e] last:border-b-0"
                  >
                    <span className="text-[#CC0000] font-mono text-sm shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="font-mono text-sm text-[#ccc] leading-snug">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#0d0d0d] border-t border-[#1e1e1e] px-3 py-1">
                <span className="font-mono text-[10px] text-[#444] tracking-widest">
                  STATUS: ACTIVE · {bonuses.items.length} ITEMS LOADED
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
