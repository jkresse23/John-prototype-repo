import React from 'react'

interface CardProps {
  variant?: 'white' | 'lightPurple' | 'purple'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function Card({
  variant = 'white',
  padding = 'md',
  className = '',
  children,
  onClick,
}: CardProps) {
  const variants = {
    white: 'bg-white',
    lightPurple: 'bg-[#F5F3FF]',
    purple: 'bg-[#E8E0FF]',
  }
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  const baseStyles = 'rounded-2xl shadow-sm'
  const interactiveStyles = onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
  
  const Component = onClick ? 'button' : 'div'
  
  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${interactiveStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </Component>
  )
}



