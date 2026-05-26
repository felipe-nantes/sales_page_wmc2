'use client'
import { motion } from 'framer-motion'
import { SystemLabel } from '@/components/ui'
import { content } from '@/content/content'

export function AuthorSection() {
  const { author } = content

  return (
    <section
      aria-label="Sobre o autor"
      className="relative"
      style={{ background: 'var(--color-bg-alt)' }}
    >
      <div className="w-full h-[1px] bg-[#CC0000]/30" />

      <div className="max-w-5xl mx-auto px-4 py-14 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          <motion.div
            className="flex flex-col items-center md:items-start gap-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div
              role="img"
              aria-label="Foto de MrSaizen (em breve)"
              className="relative w-full max-w-[280px] md:max-w-xs aspect-square border border-[#CC0000]/30 overflow-hidden mx-auto md:mx-0 bg-bg-alt"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-20 h-20 border-2 border-gray-dark rounded-full flex items-center justify-center">
                  <span
                    className="text-gray-dark text-3xl"
                    style={{ fontFamily: 'Anton, Impact, sans-serif' }}
                  >
                    S
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">
                  foto · mr.saizen
                </span>
              </div>

              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#CC0000]/60" aria-hidden="true" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#CC0000]/60" aria-hidden="true" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#CC0000]/60" aria-hidden="true" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#CC0000]/60" aria-hidden="true" />
            </div>

            <div
              className="border-2 border-[#CC0000]/60 px-5 py-3 text-center"
              style={{
                transform: 'rotate(-2deg)',
                boxShadow: '0 0 0 1px rgba(204,0,0,0.2), inset 0 0 0 2px rgba(204,0,0,0.1)',
              }}
            >
              <div className="border-t border-b border-[#CC0000]/40 py-2">
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
              className="font-impact text-white uppercase mb-6 md:mb-8 whitespace-pre-line leading-[1.05]"
              style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
              }}
            >
              {author.headline}
            </h2>

            <div className="w-12 h-[2px] bg-red mb-6 md:mb-8" />

            <div>
              {author.lines.map((line, i) =>
                line === '' ? (
                  <div key={`line-${i}`} className="h-3" />
                ) : (
                  <p key={`line-${i}`} className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed">
                    {line}
                  </p>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#CC0000]/30" />
    </section>
  )
}
