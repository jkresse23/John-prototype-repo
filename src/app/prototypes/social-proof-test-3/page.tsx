'use client'

import { useState } from 'react'
import { Button, Card, Header } from '@/components/zip'

type Variant = 'control' | 'variant1' | 'variant2' | 'variant3'

type VariantData = {
  title: string
  showSocialProof: boolean
  socialProofText?: string
  showPhoneChangeLink: boolean
}

const socialProofVariants: Record<Variant, VariantData> = {
  control: {
    title: 'Control - No Social Proof',
    showSocialProof: false,
    showPhoneChangeLink: true,
  },
  variant1: {
    title: 'Variant 1: Scale Social Proof',
    showSocialProof: true,
    socialProofText: 'Join 5M+ customers who trust Zip',
    showPhoneChangeLink: true,
  },
  variant2: {
    title: 'Variant 2: Trust Social Proof',
    showSocialProof: true,
    socialProofText: '4.8/5 stars from 50,000+ reviews',
    showPhoneChangeLink: true,
  },
  variant3: {
    title: 'Variant 3: Benefit-Focused',
    showSocialProof: true,
    socialProofText: 'Get approved in seconds. No credit check required.',
    showPhoneChangeLink: false,
  },
}

export default function SocialProofTest3Prototype() {
  const [variant, setVariant] = useState<Variant>('control')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input')
  const [otpCode, setOtpCode] = useState('')
  const [linkClicked, setLinkClicked] = useState(false)

  const currentVariant = socialProofVariants[variant]

  const handlePhoneSubmit = () => {
    if (phoneNumber.trim()) {
      setStep('otp')
    }
  }

  const handleOtpSubmit = () => {
    if (otpCode.length === 6) {
      setStep('success')
    }
  }

  const handleReset = () => {
    setStep('input')
    setPhoneNumber('')
    setOtpCode('')
    setLinkClicked(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F3FF] p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        <Header 
          title="Social Proof Test 3"
          subtitle="CKO and CKOA Welcome Authentication Screen"
        />

        {/* Variant Selector */}
        <Card variant="white" padding="lg">
          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Test Variant</h3>
          <div className="space-y-2">
            {Object.entries(socialProofVariants).map(([key, variantData]) => (
              <button
                key={key}
                onClick={() => {
                  setVariant(key as Variant)
                  handleReset()
                }}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                  key === variant
                    ? 'border-[#8660FF] bg-[#F5F3FF]'
                    : 'border-[var(--border)] hover:border-[#8660FF]/50'
                }`}
              >
                <div className="font-medium text-[#1A1A1A]">{variantData.title}</div>
                {variantData.showSocialProof && variantData.socialProofText && (
                  <div className="text-sm text-[#666666] mt-1">{variantData.socialProofText}</div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Phone Number Input Screen */}
        {step === 'input' && (
          <Card variant="white" padding="lg">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
              Verify Your Phone Number
            </h2>
            <p className="text-[#666666] mb-6">
              We'll send you a verification code to confirm your number.
            </p>

            {/* Phone Number Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[#8660FF] transition-colors text-[#1A1A1A]"
              />
            </div>

            {/* Phone Change Link */}
            {currentVariant.showPhoneChangeLink && (
              <div className="mb-6">
                <button
                  onClick={() => setLinkClicked(true)}
                  className="text-sm text-[#8660FF] hover:underline"
                >
                  Have you recently changed your phone number?
                </button>
                {linkClicked && (
                  <div className="mt-2 p-3 bg-[#E8E0FF] rounded-lg text-sm text-[#666666]">
                    Click tracked: Update your information link clicked
                  </div>
                )}
              </div>
            )}

            <Button 
              fullWidth 
              size="lg" 
              onClick={handlePhoneSubmit}
              disabled={!phoneNumber.trim()}
            >
              Send Verification Code
            </Button>

            {/* Social Proof Message */}
            {currentVariant.showSocialProof && (
              <Card variant="lightPurple" padding="md" className="mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <p className="text-[#8660FF] font-medium text-sm">
                    {currentVariant.socialProofText}
                  </p>
                </div>
              </Card>
            )}

            {/* Tracking Info */}
            <div className="mt-4 p-3 bg-[#E8E0FF] rounded-lg">
              <p className="text-xs text-[#666666]">
                <strong>Tracking:</strong> OTP page viewed → Phone number submitted
              </p>
            </div>
          </Card>
        )}

        {/* OTP Verification Screen */}
        {step === 'otp' && (
          <Card variant="white" padding="lg">
            <Header
              title="Enter Verification Code"
              subtitle={`We sent a code to ${phoneNumber}`}
              showBack
              onBack={() => setStep('input')}
            />

            {/* Social Proof (if shown on OTP screen) */}
            {currentVariant.showSocialProof && (
              <Card variant="lightPurple" padding="md" className="mb-6">
                <p className="text-[#8660FF] font-medium text-sm text-center">
                  {currentVariant.socialProofText}
                </p>
              </Card>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[#8660FF] transition-colors text-[#1A1A1A] text-center text-2xl tracking-widest font-mono"
              />
            </div>

            <Button 
              fullWidth 
              size="lg" 
              onClick={handleOtpSubmit}
              disabled={otpCode.length !== 6}
            >
              Verify Code
            </Button>

            <div className="mt-4 text-center">
              <button className="text-sm text-[#8660FF] hover:underline">
                Resend code
              </button>
            </div>

            {/* Tracking Info */}
            <div className="mt-4 p-3 bg-[#E8E0FF] rounded-lg">
              <p className="text-xs text-[#666666]">
                <strong>Tracking:</strong> OTP viewed → OTP completed
              </p>
            </div>
          </Card>
        )}

        {/* Success Screen */}
        {step === 'success' && (
          <Card variant="white" padding="lg">
            <div className="text-center">
              <div className="inline-block bg-[#E8E0FF] rounded-full p-4 mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                Phone Verified!
              </h2>
              <p className="text-[#666666] mb-6">
                Your phone number has been verified successfully.
              </p>

              {/* Conversion Metrics */}
              <Card variant="lightPurple" padding="md" className="mb-6">
                <h3 className="font-semibold text-[#1A1A1A] mb-3">Conversion Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">OTP viewed → Phone submitted:</span>
                    <span className="font-medium text-[#8660FF]">✓ Tracked</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">OTP viewed → OTP completed:</span>
                    <span className="font-medium text-[#8660FF]">✓ Tracked</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Variant tested:</span>
                    <span className="font-medium text-[#8660FF]">{currentVariant.title}</span>
                  </div>
                </div>
              </Card>

              <Button fullWidth onClick={handleReset}>
                Test Another Variant
              </Button>
            </div>
          </Card>
        )}

        {/* PRD Context */}
        <Card variant="lightPurple" padding="lg">
          <h3 className="font-semibold text-[#1A1A1A] mb-3">PRD Context</h3>
          <div className="space-y-2 text-sm text-[#666666]">
            <p>
              <strong>Problem:</strong> Conversion dropped from 90.9% to 70.5% after migration.
            </p>
            <p>
              <strong>Goal:</strong> Test social proof messaging to improve OTP screen conversion.
            </p>
            <p>
              <strong>Primary Metric:</strong> OTP page viewed → Phone number submitted
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

