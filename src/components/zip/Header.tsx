import React from 'react'

interface HeaderProps {
  title?: string
  subtitle?: string
  onClose?: () => void
  showBack?: boolean
  onBack?: () => void
  className?: string
}

export function Header({
  title,
  subtitle,
  onClose,
  showBack,
  onBack,
  className = '',
}: HeaderProps) {
  return (
    <header className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="text-[#8660FF] font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#8660FF] font-medium ml-auto"
          >
            Close
          </button>
        )}
      </div>
      {title && (
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">{title}</h1>
          {subtitle && (
            <p className="text-base text-[#666666]">{subtitle}</p>
          )}
        </div>
      )}
    </header>
  )
}

