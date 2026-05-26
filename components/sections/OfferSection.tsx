'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SystemLabel, CtaButton } from '@/components/ui'
import { content } from '@/content/content'

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const btnId = `faq-btn-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <motion.div
      className="border-b border-[#1e1e1e]"
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
      className="relative noise-overlay"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="w-full h-[3px] bg-red" />

      <div className="max-w-3xl mx-auto px-4 py-14 md:py-28 text-center">

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
          className="font-impact text-white uppercase mb-10 whitespace-pre-line leading-[1.05]"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {offer.headline}
        </motion.h2>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div
            className="inline-block border border-red/40 px-8 md:px-10 py-6 bg-red/5"
          >
            <p className="font-mono text-xs text-red tracking-[0.3em] uppercase mb-2">
              {offer.priceLabel}
            </p>
            <p
              className="font-impact text-red leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
            >
              {offer.price}
            </p>
          </div>
        </motion.div>

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
          className="font-mono text-xs text-[#444] tracking-widest mb-14 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {offer.accessNote}
        </motion.p>

        <motion.div
          className="border border-[#1e1e1e] p-5 md:p-6 mb-14 md:mb-16 text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <span className="text-red text-2xl leading-none mt-1 flex-shrink-0" aria-hidden="true">☑</span>
            <div>
              <p className="font-mono text-sm text-white mb-1 tracking-wide">
                {offer.guarantee.headline}
              </p>
              <p className="font-mono text-sm text-gray">
                {offer.guarantee.body}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-left">
          <h3 className="font-mono text-xs tracking-[0.3em] text-[#444] uppercase mb-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-[#1e1e1e]" />
            {offer.faqHeading}
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

      <div className="w-full h-[2px] bg-red/40" />
    </section>
  )
}
