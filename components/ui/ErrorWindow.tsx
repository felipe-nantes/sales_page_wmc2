import type { CSSProperties } from 'react'

interface ErrorWindowProps {
  title: string
  message?: string
  variant?: 'default' | 'warning' | 'granted' | 'alert'
  size?: 'sm' | 'md'
  className?: string
  style?: CSSProperties
}

export function ErrorWindow({
  title,
  message,
  variant = 'default',
  size = 'md',
  className = '',
  style,
}: ErrorWindowProps) {
  const icons = {
    default: '☠',
    warning: '☠',
    granted: '✓',
    alert: '⚠',
  }

  const titleBars = {
    default: 'bg-[#808080]',
    warning: 'bg-[#CC0000]',
    granted: 'bg-[#CC0000]',
    alert: 'bg-[#808080]',
  }

  const isSm = size === 'sm'

  return (
    <div
      className={`border border-[#555] bg-[#1a1a1a] font-mono select-none ${className}`}
      style={style}
    >
      <div
        className={`${titleBars[variant]} flex items-center justify-between ${
          isSm ? 'px-[6px] py-[2px]' : 'px-2 py-[3px]'
        }`}
      >
        <span
          className={`text-white tracking-wider uppercase truncate ${
            isSm ? 'text-[9px]' : 'text-[10px]'
          }`}
        >
          {title}
        </span>
        <button
          className="text-white/70 hover:text-white ml-3 leading-none text-[10px] shrink-0"
          tabIndex={-1}
          aria-hidden="true"
        >
          ✕
        </button>
      </div>
      <div
        className={`flex items-start gap-2 ${
          isSm ? 'px-2 py-[5px]' : 'px-3 py-2'
        }`}
      >
        <span
          className={`text-[#CC0000] leading-none mt-[1px] shrink-0 ${
            isSm ? 'text-xs' : 'text-base'
          }`}
        >
          {icons[variant]}
        </span>
        {message && (
          <span
            className={`text-[#aaa] tracking-wide leading-snug ${
              isSm ? 'text-[9px]' : 'text-[10px]'
            }`}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  )
}
