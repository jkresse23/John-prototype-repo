import React from 'react'
import { Card } from './Card'

interface PaymentMethodCardProps {
  type: 'visa' | 'mastercard' | 'amex' | 'discover'
  lastFour: string
  onClick?: () => void
}

const cardIcons = {
  visa: (
    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xs">VISA</span>
    </div>
  ),
  mastercard: (
    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xs">MC</span>
    </div>
  ),
  amex: (
    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xs">AMEX</span>
    </div>
  ),
  discover: (
    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xs">DISC</span>
    </div>
  ),
}

export function PaymentMethodCard({
  type,
  lastFour,
  onClick,
}: PaymentMethodCardProps) {
  return (
    <Card variant="lightPurple" padding="md" onClick={onClick} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {cardIcons[type]}
        <div>
          <p className="font-semibold text-[#1A1A1A] capitalize">{type}</p>
          <p className="text-sm text-[#666666]">.... {lastFour}</p>
        </div>
      </div>
      {onClick && (
        <svg className="w-6 h-6 text-[#8660FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </Card>
  )
}




