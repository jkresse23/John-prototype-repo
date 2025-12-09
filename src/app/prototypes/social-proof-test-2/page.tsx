'use client'

import { useState } from 'react'
import { Button, Card, Header, SpendingPowerCard } from '@/components/zip'

export default function SocialProofTest2Prototype() {
  const [step, setStep] = useState<'overview' | 'details' | 'action'>('overview')
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('action')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#F5F3FF] p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        <Header 
          title="Social Proof Test 2"
          subtitle="With the migration of CKO and CKOA to the shared webflow sign-up, several critical tracking events w..."
        />

        {step === 'overview' && (
          <>
            <Card variant="white" padding="lg">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                Overview
              </h2>
              <p className="text-[#666666] mb-6">
                With the migration of CKO and CKOA to the shared webflow sign-up, several critical tracking events were lost. The migration and the release of the phone number reset link and step-up authentication we...
              </p>
              
              <Button fullWidth size="lg" onClick={() => setStep('details')}>
                Learn More
              </Button>
            </Card>

            
          </>
        )}

        {step === 'details' && (
          <>
            <Card variant="white" padding="lg">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                Details
              </h2>
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">Problem</h3>
                  <p className="text-[#666666] text-sm">
                    With the migration of CKO and CKOA to the shared webflow sign-up, several critical tracking events were lost. The migration and the release of the phone number reset link and step-up authentication were launched to 100% of users without measuring impact on conversion. We cannot track positive or neg...
                  </p>
                </div>
                
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('overview')}>
                  Back
                </Button>
                <Button fullWidth onClick={handleAction} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Get Started'}
                </Button>
              </div>
            </Card>
          </>
        )}

        {step === 'action' && (
          <>
            <Card variant="white" padding="lg">
              <div className="text-center">
                <div className="inline-block bg-[#E8E0FF] rounded-full p-4 mb-4">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                  Ready to Go!
                </h2>
                <p className="text-[#666666] mb-6">
                  This is a prototype based on your PRD. Customize it to match your specific requirements.
                </p>
                <Button fullWidth onClick={() => setStep('overview')}>
                  Start Over
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
