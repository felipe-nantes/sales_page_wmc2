'use client'
import { motion } from 'framer-motion'

interface CtaButtonProps {
  label: string
  href: string
  price?: string
  subLabel?: string
  size?: 'sm' | 'lg'
  className?: string
}

export function CtaButton({
  label,
  href,
  price,
  subLabel,
  size = 'lg',
  className = '',
}: CtaButtonProps) {
  const padding = size === 'lg' ? 'px-8 py-4 md:px-10 md:py-5' : 'px-6 py-3'
  const fontSize = size === 'lg' ? 'text-lg md:text-xl' : 'text-sm'

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-block bg-[#CC0000] text-white uppercase
          ${padding} ${fontSize}
          border border-[#CC0000]
          transition-colors duration-150
          hover:bg-[#990000]
          cursor-pointer
          w-full md:w-auto text-center
        `}
        style={{
          fontFamily: 'Anton, Impact, sans-serif',
          letterSpacing: '0.1em',
          minHeight: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
        whileHover={{ boxShadow: '0 0 30px rgba(204,0,0,0.5), 0 0 60px rgba(204,0,0,0.2)' }}
        whileTap={{ scale: 0.97 }}
      >
        {label}
        {price && (
          <span className="text-[#ffaaaa]">{price}</span>
        )}
      </motion.a>
      {subLabel && (
        <span className="text-[#555] text-xs tracking-[0.2em] font-mono uppercase">{subLabel}</span>
      )}
    </div>
  )
}
