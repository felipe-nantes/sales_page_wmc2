interface ErrorWindowProps {
  title: string
  message?: string
  variant?: 'warning' | 'granted' | 'alert'
  className?: string
}

export function ErrorWindow({ title, message, variant = 'warning', className = '' }: ErrorWindowProps) {
  const icons = { warning: '☠', granted: '✓', alert: '⚠' }
  const titleColors = {
    warning: 'bg-[#CC0000]',
    granted: 'bg-[#CC0000]',
    alert: 'bg-[#333]',
  }

  return (
    <div className={`border border-[#555] bg-[#1a1a1a] font-mono text-xs select-none ${className}`}>
      <div className={`${titleColors[variant]} flex items-center justify-between px-2 py-[3px]`}>
        <span className="text-white tracking-wider text-[10px] uppercase">{title}</span>
        <button className="text-white/70 hover:text-white ml-4 leading-none">✕</button>
      </div>
      <div className="px-3 py-2 flex items-start gap-2">
        <span className="text-[#CC0000] text-base leading-none mt-[1px]">{icons[variant]}</span>
        {message && (
          <span className="text-[#aaa] text-[10px] tracking-wide leading-snug">{message}</span>
        )}
      </div>
    </div>
  )
}
