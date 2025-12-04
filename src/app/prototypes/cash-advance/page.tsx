'use client'

import { useState } from 'react'
import { Button, Card, Header, SpendingPowerCard, PaymentMethodCard } from '@/components/zip'

type View = 'home' | 'amount' | 'repayment-date' | 'confirmation' | 'success'

// Mock data
const eligibleAmount = 225 // ¾ of $300 spending power
const pizSpendingPower = 300
const nextPayday = new Date()
nextPayday.setDate(nextPayday.getDate() + 7) // 7 days from now

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  })
}

const calculateFee = (amount: number) => {
  // Tiered fee structure (example)
  if (amount <= 50) return 2.99
  if (amount <= 100) return 4.99
  if (amount <= 200) return 7.99
  return 9.99
}

export default function CashAdvancePrototype() {
  const [view, setView] = useState<View>('home')
  const [advanceAmount, setAdvanceAmount] = useState(eligibleAmount)
  const [repaymentDate, setRepaymentDate] = useState(nextPayday)
  const [disbursementCard] = useState('4567')
  const [repaymentCard] = useState('4567')

  const handleStartAdvance = () => {
    setView('amount')
  }

  const handleAmountContinue = () => {
    setView('repayment-date')
  }

  const handleRepaymentDateContinue = () => {
    setView('confirmation')
  }

  const handleConfirm = () => {
    // Show success screen
    setView('success')
    // After 2 seconds, return to home
    setTimeout(() => {
      setView('home')
      // Reset amount to eligible amount for next time
      setAdvanceAmount(eligibleAmount)
    }, 2000)
  }

  const fee = calculateFee(advanceAmount)
  const totalDue = advanceAmount + fee

  return (
    <div className="min-h-screen bg-[#F5F3FF] p-4 pb-20">
      <div className="max-w-md mx-auto">
        
        {/* Home Screen */}
        {view === 'home' && (
          <div className="space-y-6 pt-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Hi there, Joe</h1>
            </div>

            {/* Spending Power Card */}
            <SpendingPowerCard 
              amount={pizSpendingPower}
              label="Spending power"
            />

            {/* Cash Advance Card */}
            <Card variant="white" padding="lg">
              <div className="text-center mb-6">
                <div className="inline-block bg-[#E8E0FF] rounded-full p-4 mb-4">
                  <span className="text-4xl">💵</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Cash Advance</h2>
                <p className="text-[#666666] text-sm">Get cash instantly to your debit card</p>
              </div>

              {/* Eligible Amount */}
              <Card variant="lightPurple" padding="lg" className="mb-6">
                <p className="text-[#666666] text-sm mb-2">Available Cash Advance</p>
                <div className="text-5xl font-bold text-[#8660FF] mb-1">
                  ${eligibleAmount}
                </div>
                <p className="text-[#666666] text-xs">
                  Based on your PiZ spending power of ${pizSpendingPower}
                </p>
              </Card>

              {/* Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-[#8660FF] text-xl">⚡</span>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">Instant disbursement</p>
                    <p className="text-[#666666] text-xs">Funds sent to your debit card immediately</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8660FF] text-xl">📅</span>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">Pay on your next payday</p>
                    <p className="text-[#666666] text-xs">Repay in full, up to 15 days</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleStartAdvance}
                size="lg"
                fullWidth
              >
                Get Cash Advance
              </Button>
            </Card>

            {/* Info Card */}
            <Card variant="lightPurple" padding="md">
              <p className="text-[#666666] text-sm text-center">
                Your cash advance is ¾ of your Pay in Z spending power
              </p>
            </Card>
          </div>
        )}

        {/* Amount Entry Screen */}
        {view === 'amount' && (
          <div className="space-y-6 pt-8">
            <Header
              title="How much do you need?"
              subtitle={`Up to $${eligibleAmount} available`}
              showBack
              onBack={() => setView('home')}
            />

            <Card variant="white" padding="lg">
              {/* Amount Display */}
              <div className="text-center mb-8">
                <div className="inline-block">
                  <span className="text-6xl font-bold text-[#8660FF]">$</span>
                  <input
                    type="number"
                    value={advanceAmount}
                    onChange={(e) => {
                      const value = Math.min(eligibleAmount, Math.max(10, parseInt(e.target.value) || 10))
                      setAdvanceAmount(value)
                    }}
                    className="text-6xl font-bold text-[#8660FF] w-32 text-center border-none outline-none bg-transparent"
                    min="10"
                    max={eligibleAmount}
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[50, 100, eligibleAmount].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setAdvanceAmount(amount)}
                    className={`py-3 rounded-xl font-semibold transition-colors ${
                      advanceAmount === amount
                        ? 'bg-[#8660FF] text-white'
                        : 'bg-[#F5F3FF] text-[#666666] hover:bg-[#E8E0FF]'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Amount Slider */}
              <div className="mb-6">
                <input
                  type="range"
                  min="10"
                  max={eligibleAmount}
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#E8E0FF] rounded-lg appearance-none cursor-pointer accent-[#8660FF]"
                />
                <div className="flex justify-between text-xs text-[#666666] mt-1">
                  <span>$10</span>
                  <span>${eligibleAmount}</span>
                </div>
              </div>

              {/* Fee Preview */}
              <Card variant="lightPurple" padding="md" className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#666666] text-sm">Fee</span>
                  <span className="font-semibold text-[#1A1A1A]">${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Total to repay</span>
                  <span className="font-bold text-[#8660FF] text-lg">${totalDue.toFixed(2)}</span>
                </div>
              </Card>

              <Button
                onClick={handleAmountContinue}
                size="lg"
                fullWidth
              >
                Continue
              </Button>
            </Card>
          </div>
        )}

        {/* Repayment Date Screen */}
        {view === 'repayment-date' && (
          <div className="space-y-6 pt-8">
            <Header
              title="When will you repay?"
              subtitle="We detected your next payday"
              showBack
              onBack={() => setView('amount')}
            />

            <Card variant="white" padding="lg">
              {/* Repayment Date Card */}
              <Card variant="lightPurple" padding="lg" className="mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-[#666666] text-sm mb-2">Your next payday</p>
                  <div className="text-3xl font-bold text-[#8660FF] mb-1">
                    {formatDate(repaymentDate)}
                  </div>
                  <p className="text-[#666666] text-xs">
                    {Math.ceil((repaymentDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days from now
                  </p>
                </div>
              </Card>

              {/* Repayment Info */}
              <Card variant="lightPurple" padding="md" className="mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-[#8660FF] text-xl">ℹ️</span>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm mb-1">Pay-in-1 Schedule</p>
                    <p className="text-[#666666] text-xs">
                      You'll repay ${totalDue.toFixed(2)} in full on {formatDate(repaymentDate)}. 
                      Repayment will be automatically collected from your debit card.
                    </p>
                  </div>
                </div>
              </Card>

              <Button
                onClick={handleRepaymentDateContinue}
                size="lg"
                fullWidth
              >
                Continue
              </Button>
            </Card>
          </div>
        )}

        {/* Confirmation Screen */}
        {view === 'confirmation' && (
          <div className="space-y-6 pt-8">
            <Card variant="white" padding="lg">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-100 rounded-full p-3 mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                  Review Your Cash Advance
                </h2>
                <p className="text-[#666666] text-sm">
                  Please review the details before confirming
                </p>
              </div>

              {/* Advance Details */}
              <div className="space-y-4 mb-6">
                <Card variant="lightPurple" padding="md">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#666666] text-sm">Cash Advance Amount</span>
                    <span className="font-bold text-[#1A1A1A] text-xl">${advanceAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#666666] text-sm">Fee</span>
                    <span className="font-semibold text-[#1A1A1A]">${fee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#E8E0FF] pt-3 flex justify-between items-center">
                    <span className="text-[#1A1A1A] font-semibold">Total to Repay</span>
                    <span className="font-bold text-[#8660FF] text-xl">${totalDue.toFixed(2)}</span>
                  </div>
                </Card>

                {/* Repayment Date */}
                <Card variant="lightPurple" padding="md">
                  <p className="text-[#666666] text-sm mb-2">Repayment Date</p>
                  <p className="font-semibold text-[#1A1A1A]">{formatDate(repaymentDate)}</p>
                </Card>

                {/* Disbursement Card */}
                <div>
                  <p className="text-[#666666] text-sm mb-2">Funds will be sent to</p>
                  <PaymentMethodCard type="visa" lastFour={disbursementCard} />
                </div>

                {/* Repayment Card */}
                <div>
                  <p className="text-[#666666] text-sm mb-2">Repayment will be collected from</p>
                  <PaymentMethodCard type="visa" lastFour={repaymentCard} />
                </div>
              </div>

              {/* Terms Notice */}
              <Card variant="lightPurple" padding="md" className="mb-6">
                <p className="text-[#666666] text-xs text-center">
                  By confirming, you agree to repay ${totalDue.toFixed(2)} on {formatDate(repaymentDate)}. 
                  Funds will be disbursed instantly to your debit card.
                </p>
              </Card>

              <Button
                onClick={handleConfirm}
                size="lg"
                fullWidth
                className="bg-green-600 hover:bg-green-700"
              >
                Confirm Cash Advance
              </Button>
            </Card>
          </div>
        )}

        {/* Success Screen */}
        {view === 'success' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card variant="white" padding="lg" className="max-w-sm mx-4 text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Cash Advance Approved!</h2>
              <p className="text-[#666666] mb-4">
                ${advanceAmount.toFixed(2)} is being sent to your debit card now.
              </p>
              <p className="text-[#999999] text-sm">
                You'll receive a confirmation shortly.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
