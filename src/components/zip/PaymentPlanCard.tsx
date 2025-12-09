import React from 'react'
import { Card } from './Card'

interface Payment {
  amount: string | number
  dueDate: string
  isCurrent?: boolean
}

interface PaymentPlanCardProps {
  payments: Payment[]
  title?: string
}

export function PaymentPlanCard({
  payments,
  title = 'Payment plan',
}: PaymentPlanCardProps) {
  return (
    <Card variant="lightPurple" padding="md">
      <h3 className="font-semibold text-[#1A1A1A] mb-4">{title}</h3>
      
      {/* Timeline */}
      <div className="flex items-center gap-2 mb-4">
        {payments.map((payment, index) => (
          <div key={index} className="flex-1 flex items-center">
            <div
              className={`w-full h-2 rounded-full ${
                payment.isCurrent ? 'bg-[#8660FF]' : 'bg-white border-2 border-[#E8E0FF]'
              }`}
            />
            {index < payments.length - 1 && (
              <div className={`w-2 h-2 rounded-full mx-1 ${
                payment.isCurrent ? 'bg-[#8660FF]' : 'bg-[#E8E0FF]'
              }`} />
            )}
          </div>
        ))}
      </div>
      
      {/* Payment Details */}
      <div className="space-y-3">
        {payments.map((payment, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-[#1A1A1A]">
                ${typeof payment.amount === 'number' ? payment.amount.toFixed(2) : payment.amount}
              </p>
              <p className={`text-sm ${
                payment.isCurrent ? 'text-[#8660FF] font-medium' : 'text-[#666666]'
              }`}>
                {payment.dueDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}




