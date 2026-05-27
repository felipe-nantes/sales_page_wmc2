'use client'
import { motion, type Variants } from 'framer-motion'
import { SystemLabel, ErrorWindow } from '@/components/ui'
import { content } from '@/content/content'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' as const },
  }),
}

export function ProblemSolutionSection() {
  const { problem, solution } = content

  return (
    <section className="relative overflow-hidden scanlines" style={{ background: 'transparent' }}>

      {/* Error window */}
      <div
        className="absolute top-3 right-3 z-20"
        aria-hidden="true"
        style={{ transform: 'rotate(1.5deg)' }}
      >
        <ErrorWindow
          title="SYSTEM WARNING.exe"
          message="TAKEOVER IN PROGRESS..."
          variant="warning"
          size="sm"
          className="w-36 md:w-44 opacity-80"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-px">

          {/* ── PROBLEM ── */}
          <motion.div
            className="relative p-6 md:p-12 border-b md:border-b-0 md:border-r border-red/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="absolute inset-0 halftone-red pointer-events-none opacity-50" />

            <div className="relative z-10">
              <motion.div custom={0} variants={fadeUp} className="mb-5 md:mb-6">
                <SystemLabel text={problem.systemLabel} />
              </motion.div>

              <motion.h2
                custom={1}
                variants={fadeUp}
                className="font-impact text-white uppercase mb-6 md:mb-8 whitespace-pre-line leading-[1.05] term-heading"
                style={{
                  fontFamily: 'Anton, Impact, sans-serif',
                  fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                }}
              >
                {problem.headline}
              </motion.h2>

              <div className="space-y-0">
                {problem.lines.map((line, i) =>
                  line === '' ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <motion.p
                      key={i}
                      custom={i + 2}
                      variants={fadeUp}
                      className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed term-copy"
                    >
                      {line}
                    </motion.p>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* ── SOLUTION ── */}
          <motion.div
            className="relative p-6 md:p-12"
            style={{ background: 'rgba(21,18,16,0.50)' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="absolute inset-0 halftone pointer-events-none opacity-30" />

            <div className="relative z-10">
              <motion.div custom={0} variants={fadeUp} className="mb-5 md:mb-6">
                <SystemLabel text={solution.systemLabel} />
              </motion.div>

              <motion.h2
                custom={1}
                variants={fadeUp}
                className="font-impact text-white uppercase mb-6 md:mb-8 whitespace-pre-line leading-[1.05] term-heading"
                style={{
                  fontFamily: 'Anton, Impact, sans-serif',
                  fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                }}
              >
                {solution.headline}
              </motion.h2>

              <motion.div custom={2} variants={fadeUp} className="w-12 h-[2px] bg-red mb-6 md:mb-8" />

              <div className="space-y-0">
                {solution.lines.map((line, i) =>
                  line === '' ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <motion.p
                      key={i}
                      custom={i + 3}
                      variants={fadeUp}
                      className="font-mono text-sm md:text-base text-[#aaa] leading-relaxed term-copy"
                    >
                      {line}
                    </motion.p>
                  )
                )}
              </div>
            </div>

            <div
              className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red/30 hidden md:block"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>

    </section>
  )
}
