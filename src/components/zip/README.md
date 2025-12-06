# Zip Design System Component Library

A reusable component library based on the Zip mobile app design patterns. Use these components to create prototypes that match the Zip app's look and feel.

## Installation

Components are already set up in `src/components/zip/`. Import them like this:

```tsx
import { Button, Card, Header, SpendingPowerCard } from '@/components/zip'
```

## Components

### Button

Primary action button with multiple variants and sizes.

```tsx
import { Button } from '@/components/zip'

<Button variant="primary" size="lg" fullWidth onClick={handleClick}>
  Get Started
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `fullWidth`: `boolean` (default: `false`)
- Standard button props (onClick, disabled, etc.)

### Card

Container component with different background variants.

```tsx
import { Card } from '@/components/zip'

<Card variant="white" padding="md">
  Content here
</Card>
```

**Props:**
- `variant`: `'white' | 'lightPurple' | 'purple'` (default: `'white'`)
- `padding`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `onClick`: Optional click handler (makes card clickable)
- `className`: Additional CSS classes

### SpendingPowerCard

Displays spending power amount with optional click action.

```tsx
import { SpendingPowerCard } from '@/components/zip'

<SpendingPowerCard 
  amount={650}
  label="Spending power"
  onClick={handleClick}
/>
```

**Props:**
- `amount`: `string | number` - The amount to display
- `label`: `string` (default: `'Spending power'`)
- `onClick`: Optional click handler

### PaymentPlanCard

Displays a payment plan with timeline visualization.

```tsx
import { PaymentPlanCard } from '@/components/zip'

<PaymentPlanCard
  payments={[
    { amount: 50, dueDate: 'Due today', isCurrent: true },
    { amount: 28.99, dueDate: 'Oct 19' },
    { amount: 28.99, dueDate: 'Nov 2' },
    { amount: 28.99, dueDate: 'Nov 16' },
  ]}
/>
```

**Props:**
- `payments`: Array of payment objects with `amount`, `dueDate`, and optional `isCurrent`
- `title`: `string` (default: `'Payment plan'`)

### PaymentMethodCard

Displays a payment method (card) with icon and last 4 digits.

```tsx
import { PaymentMethodCard } from '@/components/zip'

<PaymentMethodCard 
  type="visa"
  lastFour="5555"
  onClick={handleClick}
/>
```

**Props:**
- `type`: `'visa' | 'mastercard' | 'amex' | 'discover'`
- `lastFour`: `string` - Last 4 digits of the card
- `onClick`: Optional click handler

### Header

Page header with title, subtitle, and optional back/close buttons.

```tsx
import { Header } from '@/components/zip'

<Header
  title="Order summary"
  subtitle="Your order total is split in 4 payments over 6 weeks"
  showBack
  onBack={handleBack}
  onClose={handleClose}
/>
```

**Props:**
- `title`: `string` - Main heading
- `subtitle`: `string` - Subtitle text
- `showBack`: `boolean` - Show back button
- `onBack`: `() => void` - Back button handler
- `onClose`: `() => void` - Close button handler
- `className`: Additional CSS classes

### BottomNav

Bottom navigation bar for app navigation.

```tsx
import { BottomNav } from '@/components/zip'

<BottomNav
  items={[
    { label: 'Home', icon: '🔍', href: '/', active: true },
    { label: 'Orders', icon: '📋', href: '/orders' },
    { label: 'Account', icon: '👤', href: '/account' },
  ]}
/>
```

**Props:**
- `items`: Array of nav items with `label`, `icon` (string or ReactNode), `href`, and optional `active`

## Design Tokens

Design tokens are available in `theme.ts`:

```tsx
import { zipColors, zipSpacing, zipTypography } from '@/components/zip'

// Colors
zipColors.purple[500] // Primary purple: #8660FF
zipColors.text.primary // #1A1A1A
zipColors.bg.lightPurple // #F5F3FF

// Spacing
zipSpacing.md // 1rem (16px)

// Typography
zipTypography.fontSize.xl // 1.25rem (20px)
```

## Color Palette

- **Primary Purple**: `#8660FF`
- **Light Purple Background**: `#F5F3FF`
- **Purple Background**: `#E8E0FF`
- **Text Primary**: `#1A1A1A`
- **Text Secondary**: `#666666`
- **Text Tertiary**: `#999999`

## Usage Example

```tsx
'use client'

import { Button, Card, Header, SpendingPowerCard } from '@/components/zip'

export default function MyPrototype() {
  return (
    <div className="min-h-screen bg-[#F5F3FF] p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Header title="My Prototype" />
        
        <SpendingPowerCard amount={650} />
        
        <Card variant="white" padding="lg">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            Feature Title
          </h2>
          <p className="text-[#666666] mb-6">
            Description text here
          </p>
          <Button fullWidth size="lg">
            Continue
          </Button>
        </Card>
      </div>
    </div>
  )
}
```

## Best Practices

1. **Use the light purple background** (`bg-[#F5F3FF]`) for the main app background
2. **Use white cards** (`Card variant="white"`) for primary content
3. **Use light purple cards** (`Card variant="lightPurple"`) for secondary information
4. **Follow the color hierarchy**: Primary purple for CTAs, dark text for headings, gray for body text
5. **Use consistent spacing**: Leverage the `padding` prop on Cards rather than custom margins
6. **Keep it simple**: The Zip design is clean and minimal - avoid over-styling



