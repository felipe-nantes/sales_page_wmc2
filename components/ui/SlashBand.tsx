interface SlashBandProps {
  top: string
  height?: number
  label?: string
  angle?: number
  className?: string
}

export function SlashBand({
  top,
  height = 64,
  label = 'WMC2',
  angle = -10,
  className = '',
}: SlashBandProps) {
  const text = `${label} · `.repeat(80)
  return (
    <div
      className={`absolute overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        left: '-15%',
        width: '130%',
        height,
        top,
        background: 'var(--color-red)',
        transform: `rotate(${angle}deg)`,
        zIndex: 4,
      }}
      aria-hidden="true"
    >
      <div className="flex items-center h-full pl-8">
        <span className="slash-band-text">{text}</span>
      </div>
    </div>
  )
}
