'use client'

import { useState } from 'react'
import { Button, Card, Header, BottomNav } from '@/components/zip'

export default function WelcomeAuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }

  const handleSubmit = () => {
    // Simulate a successful phone number submission
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-[#F5F3FF] flex flex-col justify-between">
      <div className="p-6 space-y-6">
        <Header
          title="Welcome to Zip"
          subtitle="Secure your account with your phone number"
          showBack={false}
          onClose={() => console.log('Close')}
        />

        <Card variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            Join millions of happy users!
          </h2>
          <p className="text-[#666666] mb-6">
            Your phone number helps us keep your account secure and recoverable. 
            Thousands of users have already secured their accounts with Zip.
          </p>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your phone number"
            className="w-full p-3 border border-[#CCCCCC] rounded-md mb-4"
          />
          <Button fullWidth size="lg" onClick={handleSubmit}>
            Submit
          </Button>

          {showSuccess && (
            <div className="mt-4 text-green-600">
              Phone number submitted successfully!
            </div>
          )}
        </Card>
      </div>

      <BottomNav
        items={[
          { label: 'Home', icon: '🏠', href: '/', active: true },
          { label: 'Orders', icon: '📋', href: '/orders' },
          { label: 'Account', icon: '👤', href: '/account' },
        ]}
      />
    </div>
  )
}