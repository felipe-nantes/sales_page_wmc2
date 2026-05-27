'use client'
import { motion } from 'framer-motion'
import { SystemLabel, ErrorWindow } from '@/components/ui'
import { content } from '@/content/content'

export function SocialProofSection() {
  const { socialProof } = content

  return (
    <section
      aria-label="Prova social"
      className="relative overflow-hidden scanlines"
      style={{ background: 'transparent' }}
    >
      <div className="absolute inset-0 halftone pointer-events-none opacity-30" />

      <div
        className="absolute top-3 right-3 z-20"
        aria-hidden="true"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <ErrorWindow
          title="FILES.exe"
          message="SUBJECTS — CARREGADO"
          variant="granted"
          size="sm"
          className="w-36 md:w-44 opacity-80"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14 md:py-28 relative z-10">

        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          <SystemLabel text={socialProof.systemLabel} className="mb-5 block" />
          <h2
            className="font-impact text-white uppercase whitespace-pre-line leading-[1.05] term-heading"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)' }}
          >
            {socialProof.headline}
          </h2>
          <p className="font-mono text-sm text-[#aaa] leading-relaxed term-copy mt-4 max-w-xl">
            {socialProof.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {socialProof.athletes.map((athlete, i) => (
            <motion.div
              key={athlete.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              {/* Photo */}
              <div className="relative aspect-square border border-red/25 overflow-hidden bg-[#0e0c0a]">
                {athlete.photo ? (
                  <img
                    src={athlete.photo}
                    alt={athlete.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 halftone-red opacity-20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                      <span className="font-mono text-[9px] text-[#252525] tracking-[0.3em] uppercase">arquivo</span>
                      <span className="font-mono text-base text-[#1e1e1e] tracking-widest">{athlete.id}</span>
                    </div>
                  </>
                )}
                <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-red/50 z-20" aria-hidden="true" />
                <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-red/50 z-20" aria-hidden="true" />
                <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-red/50 z-20" aria-hidden="true" />
                <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-red/50 z-20" aria-hidden="true" />
              </div>

              {/* Label */}
              {(athlete.name || athlete.achievement) && (
                <div className="bg-black/80 px-2 py-1.5 mt-px">
                  {athlete.name && (
                    <p className="font-mono text-[11px] text-white tracking-wide uppercase leading-snug">
                      {athlete.name}
                    </p>
                  )}
                  {athlete.achievement && (
                    <p className="font-mono text-[10px] text-red tracking-widest uppercase mt-0.5">
                      {athlete.achievement}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
