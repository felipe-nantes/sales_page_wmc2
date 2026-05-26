interface SectionDividerProps {
  direction?: 'left' | 'right'
  from?: string
  to?: string
  height?: number
}

export function SectionDivider({
  direction = 'left',
  from = '#0a0a0a',
  to = '#111111',
  height = 48,
}: SectionDividerProps) {
  const clipPath =
    direction === 'left'
      ? `polygon(0 ${height}px, 100% 0, 100% 100%, 0 100%)`
      : `polygon(0 0, 100% ${height}px, 100% 100%, 0 100%)`

  return (
    <div
      aria-hidden="true"
      style={{
        height: `${height}px`,
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
        clipPath,
        marginTop: `-${height}px`,
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  )
}

export function RedSlash({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ height: '3px' }}
    >
      <div
        className="w-full h-[3px] bg-[#CC0000]"
        style={{ transform: 'skewX(-20deg) scaleX(1.1)' }}
      />
    </div>
  )
}
