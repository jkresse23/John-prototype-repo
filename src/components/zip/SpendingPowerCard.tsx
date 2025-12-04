import React from 'react'
import { Card } from './Card'

interface SpendingPowerCardProps {
  amount: string | number
  label?: string
  onClick?: () => void
}

export function SpendingPowerCard({
  amount,
  label = 'Spending power',
  onClick,
}: SpendingPowerCardProps) {
  const formattedAmount = typeof amount === 'number' 
    ? `$${amount.toFixed(2)}` 
    : amount
  
  return (
    <Card variant="lightPurple" padding="md" onClick={onClick} className="flex items-center justify-between">
      <div>
        <p className="text-sm text-[#666666] mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#1A1A1A]">{formattedAmount}</p>
      </div>
      {onClick && (
        <svg className="w-6 h-6 text-[#8660FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </Card>
  )
}

