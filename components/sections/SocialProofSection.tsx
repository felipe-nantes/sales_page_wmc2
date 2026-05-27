'use client'
import { motion } from 'framer-motion'
import { SystemLabel, ErrorWindow } from '@/components/ui'
import { content } from '@/content/content'

type Athlete = { id: string; name: string; achievement: string; photo: string }

function AthleteSlot({ athlete }: { athlete: Athlete }) {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0 mx-2 md:mx-3 border border-red/25 overflow-hidden bg-[#0e0c0a]">
      {athlete.photo ? (
        <img
          src={athlete.photo}
          alt={athlete.name}
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      ) : (
        <>
          <div className="absolute inset-0 halftone-red opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 select-none">
            <span className="font-mono text-[9px] text-[#252525] tracking-[0.3em] uppercase">arquivo</span>
            <span className="font-mono text-lg text-[#1e1e1e] tracking-widest">{athlete.id}</span>
          </div>
        </>
      )}

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red/50 z-20" aria-hidden="true" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red/50 z-20" aria-hidden="true" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red/50 z-20" aria-hidden="true" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red/50 z-20" aria-hidden="true" />

      {/* Label overlay */}
      {(athlete.name || athlete.achievement) && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/85 px-3 py-2 z-10">
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
    </div>
  )
}

export function SocialProofSection() {
  const { socialProof } = content
  const athletes = socialProof.athletes

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

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-14 md:pt-28 pb-10 md:pb-12 relative z-10">
        <motion.div
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
      </div>

      {/* Full-width infinite carousel */}
      <div className="overflow-hidden pb-14 md:pb-28 relative z-10" aria-hidden="true">
        <div className="flex marquee-track">
          {[...athletes, ...athletes].map((athlete, i) => (
            <AthleteSlot key={`${athlete.id}-${i}`} athlete={athlete} />
          ))}
        </div>
      </div>
    </section>
  )
}
