'use client'

import React, { useState } from 'react'
import { Button, Card, Header, SpendingPowerCard, BottomNav } from '@/components/zip'

export default function SignupSocialProofTest() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  const handlePhoneNumberSubmit = () => {
    if (phoneNumber) {
      setShowConfirmation(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F3FF] p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Header
          title="Welcome to Zip"
          subtitle="Join millions using Zip's flexible payment options"
          showBack
          onBack={() => alert('Back')}
        />

        <SpendingPowerCard amount={650} label="Your Spending Power" />

        <Card variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Sign Up</h2>
          <p className="text-[#666666] mb-6">
            Enter your phone number to get started. We'll send you a verification code.
          </p>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter phone number"
            className="w-full p-2 mb-4 border border-[#999999] rounded"
          />
          <Button fullWidth size="lg" onClick={handlePhoneNumberSubmit}>
            Submit
          </Button>
        </Card>

        {showConfirmation && (
          <Card variant="lightPurple" padding="md">
            <p className="text-[#1A1A1A]">
              Thank you! A verification code has been sent to your phone.
            </p>
          </Card>
        )}

        <BottomNav
          items={[
            { label: 'Home', icon: '🏠', href: '/', active: true },
            { label: 'Orders', icon: '📋', href: '/orders' },
            { label: 'Account', icon: '👤', href: '/account' },
          ]}
        />
      </div>
    </div>
  )
}