interface SystemLabelProps {
  text: string
  className?: string
}

export function SystemLabel({ text, className = '' }: SystemLabelProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2
        font-mono text-xs tracking-[0.25em] text-[#CC0000] uppercase
        border-l-2 border-[#CC0000] pl-3
        ${className}
      `}
    >
      {text}
    </span>
  )
}
