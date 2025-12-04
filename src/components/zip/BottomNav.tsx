import React from 'react'
import Link from 'next/link'

interface NavItem {
  label: string
  icon: string | React.ReactNode
  href: string
  active?: boolean
}

interface BottomNavProps {
  items: NavItem[]
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E0FF] safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              item.active
                ? 'text-[#8660FF]'
                : 'text-[#666666] hover:text-[#8660FF]'
            }`}
          >
            {typeof item.icon === 'string' ? (
              <span className="text-2xl mb-1">{item.icon}</span>
            ) : (
              <div className="mb-1">{item.icon}</div>
            )}
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

