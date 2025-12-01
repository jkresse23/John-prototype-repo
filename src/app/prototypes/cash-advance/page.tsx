'use client'

import { useState } from 'react'

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
  const [disbursementCard] = useState('•••• 4567')
  const [repaymentCard] = useState('•••• 4567')

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
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 p-4">
      <div className="max-w-md mx-auto">
        
        {/* Home Screen */}
        {view === 'home' && (
          <div className="space-y-6 pt-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Pay in Z</h1>
              <p className="text-blue-100">Welcome back</p>
            </div>

            {/* Cash Advance Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 rounded-full p-3 mb-4">
                  <span className="text-3xl">💵</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Cash Advance</h2>
                <p className="text-gray-500 text-sm">Get cash instantly to your debit card</p>
              </div>

              {/* Eligible Amount */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <p className="text-gray-600 text-sm mb-2">Available Cash Advance</p>
                <div className="text-5xl font-bold text-indigo-600 mb-1">
                  ${eligibleAmount}
                </div>
                <p className="text-gray-500 text-xs">
                  Based on your PiZ spending power of ${pizSpendingPower}
                </p>
              </div>

              {/* Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 text-xl">⚡</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Instant disbursement</p>
                    <p className="text-gray-500 text-xs">Funds sent to your debit card immediately</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 text-xl">📅</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Pay on your next payday</p>
                    <p className="text-gray-500 text-xs">Repay in full, up to 15 days</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleStartAdvance}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Get Cash Advance
              </button>
            </div>

            {/* Spending Power Info */}
            <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
              <p className="text-white/90 text-sm text-center">
                Your cash advance is ¾ of your Pay in Z spending power
              </p>
            </div>
          </div>
        )}

        {/* Amount Entry Screen */}
        {view === 'amount' && (
          <div className="space-y-6 pt-8">
            <button 
              onClick={() => setView('home')}
              className="text-white flex items-center gap-2 font-medium"
            >
              ← Back
            </button>

            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                How much do you need?
              </h2>
              <p className="text-center text-gray-500 text-sm mb-8">
                Up to ${eligibleAmount} available
              </p>

              {/* Amount Display */}
              <div className="text-center mb-8">
                <div className="inline-block">
                  <span className="text-6xl font-bold text-indigo-600">$</span>
                  <input
                    type="number"
                    value={advanceAmount}
                    onChange={(e) => {
                      const value = Math.min(eligibleAmount, Math.max(10, parseInt(e.target.value) || 10))
                      setAdvanceAmount(value)
                    }}
                    className="text-6xl font-bold text-indigo-600 w-32 text-center border-none outline-none bg-transparent"
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
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$10</span>
                  <span>${eligibleAmount}</span>
                </div>
              </div>

              {/* Fee Preview */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Fee</span>
                  <span className="font-semibold text-gray-800">${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total to repay</span>
                  <span className="font-bold text-indigo-600 text-lg">${totalDue.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleAmountContinue}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Repayment Date Screen */}
        {view === 'repayment-date' && (
          <div className="space-y-6 pt-8">
            <button 
              onClick={() => setView('amount')}
              className="text-white flex items-center gap-2 font-medium"
            >
              ← Back
            </button>

            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                When will you repay?
              </h2>
              <p className="text-center text-gray-500 text-sm mb-8">
                We detected your next payday
              </p>

              {/* Repayment Date Card */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-gray-600 text-sm mb-2">Your next payday</p>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    {formatDate(repaymentDate)}
                  </div>
                  <p className="text-gray-500 text-xs">
                    {Math.ceil((repaymentDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days from now
                  </p>
                </div>
              </div>

              {/* Repayment Info */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 text-xl">ℹ️</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-1">Pay-in-1 Schedule</p>
                    <p className="text-gray-600 text-xs">
                      You'll repay ${totalDue.toFixed(2)} in full on {formatDate(repaymentDate)}. 
                      Repayment will be automatically collected from your debit card.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleRepaymentDateContinue}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {view === 'confirmation' && (
          <div className="space-y-6 pt-8">
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-100 rounded-full p-3 mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Review Your Cash Advance
                </h2>
                <p className="text-gray-500 text-sm">
                  Please review the details before confirming
                </p>
              </div>

              {/* Advance Details */}
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm">Cash Advance Amount</span>
                    <span className="font-bold text-gray-800 text-xl">${advanceAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm">Fee</span>
                    <span className="font-semibold text-gray-800">${fee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="text-gray-800 font-semibold">Total to Repay</span>
                    <span className="font-bold text-indigo-600 text-xl">${totalDue.toFixed(2)}</span>
                  </div>
                </div>

                {/* Repayment Date */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-2">Repayment Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(repaymentDate)}</p>
                </div>

                {/* Disbursement Card */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-2">Funds will be sent to</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">💳</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Debit Card</p>
                      <p className="text-gray-500 text-sm">{disbursementCard}</p>
                    </div>
                  </div>
                </div>

                {/* Repayment Card */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600 text-sm mb-2">Repayment will be collected from</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">💳</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Debit Card</p>
                      <p className="text-gray-500 text-sm">{repaymentCard}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Notice */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-gray-600 text-xs text-center">
                  By confirming, you agree to repay ${totalDue.toFixed(2)} on {formatDate(repaymentDate)}. 
                  Funds will be disbursed instantly to your debit card.
                </p>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg"
              >
                Confirm Cash Advance
              </button>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {view === 'success' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Cash Advance Approved!</h2>
              <p className="text-gray-600 mb-4">
                ${advanceAmount.toFixed(2)} is being sent to your debit card now.
              </p>
              <p className="text-gray-500 text-sm">
                You'll receive a confirmation shortly.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

