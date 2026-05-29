'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SystemLabel, CtaButton, ErrorWindow } from '@/components/ui'
import { content } from '@/content/content'

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const btnId = `faq-btn-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <motion.div
      className="border-b border-[#1e1e1e] bg-black/80"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <button
        id={btnId}
        aria-controls={panelId}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group min-h-[44px]"
        onClick={() => setOpen(!open)}
      >
        <span className="font-mono text-sm text-gray-light group-hover:text-white transition-colors leading-snug">
          <span className="text-red mr-2 font-bold">{open ? '▾' : '▸'}</span>
          {question}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="font-mono text-sm text-gray pb-4 pl-5 leading-relaxed border-l-2 border-red/30 ml-[6px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function OfferSection() {
  const { offer } = content

  return (
    <section
      aria-label="Oferta"
      className="relative overflow-hidden noise-overlay scanlines"
      style={{ background: 'transparent' }}
    >

      {/* Halftone */}
      <div className="absolute inset-0 halftone pointer-events-none opacity-50" />

      {/* ── Art layer ── */}
      {/* Giant centered — skull */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.22 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2 }}
      >
        <img src="/assets/skull.png" alt="" className="art-dedsec w-[60vw] max-w-[520px]" />
      </motion.div>

      {/* Bleed right — mummy fists */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 flex items-center justify-end pointer-events-none z-[3]"
        aria-hidden="true"
        style={{ transform: 'translateX(14%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.45 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
      >
        <img src="/assets/mummy-fists.png" alt="" className="art-dedsec h-[65vh]" />
      </motion.div>

      {/* Bleed left — reaper invertido */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 flex items-center pointer-events-none z-[3]"
        aria-hidden="true"
        style={{ transform: 'translateX(-18%) scaleX(-1)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.40 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
      >
        <img src="/assets/reaper2.png" alt="" className="art-dedsec h-[70vh]" />
      </motion.div>

      {/* Anchor — hand-point apontando para o CTA */}
      <motion.div
        className="absolute bottom-[40%] right-[6%] pointer-events-none z-[11] hidden md:block"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.65 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img src="/assets/hand-point.png" alt="" className="art-dedsec w-20" style={{ transform: 'rotate(-25deg)' }} />
      </motion.div>

      {/* Error window stack */}
      <div
        className="absolute top-3 right-3 z-20"
        aria-hidden="true"
        style={{ transform: 'rotate(-1.5deg)' }}
      >
        <ErrorWindow
          title="DEDSEC TAKEOVER"
          message="ARE YOU SURE?"
          variant="default"
          size="sm"
          className="w-36 md:w-44 opacity-80"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 md:py-28 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex justify-center"
        >
          <SystemLabel text={offer.systemLabel} />
        </motion.div>

        <motion.h2
          className="font-impact text-white uppercase mb-10 whitespace-pre-line leading-[1.05] term-heading"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {offer.headline}
        </motion.h2>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <CtaButton
            label={offer.cta.label}
            href={offer.cta.href}
            size="lg"
            className="w-full md:w-auto"
          />
        </motion.div>

        <motion.p
          className="font-mono text-xs text-[#444] tracking-widest mb-14 md:mb-16 term-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {offer.accessNote}
        </motion.p>

        {/* FAQ */}
        <div className="text-left">
          <h3 className="font-mono text-xs tracking-[0.3em] text-[#444] uppercase mb-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-[#1e1e1e]" />
            <img src="/assets/middle-finger.png" alt="" aria-hidden="true" className="art-dedsec w-4 h-5 opacity-35" />
            {offer.faqHeading}
            <img src="/assets/skull-pixel.png" alt="" aria-hidden="true" className="art-dedsec w-4 h-4 opacity-30" />
            <span className="flex-1 h-px bg-[#1e1e1e]" />
          </h3>

          <div>
            {offer.faq.map((item, i) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 md:mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <CtaButton
            label={offer.cta.label}
            href={offer.cta.href}
            size="lg"
            className="w-full md:w-auto"
          />
        </motion.div>
      </div>

    </section>
  )
}
