'use client'

import { useState } from 'react'

// This is a sample prototype page - replace with your own components!

export default function CounterPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-8">Counter</h1>
      
      <div className="text-8xl font-bold mb-8 tabular-nums">{count}</div>
      
      <div className="flex gap-4">
        <button
          onClick={() => setCount(c => c - 1)}
          className="px-6 py-3 text-xl bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
        >
          −
        </button>
        
        <button
          onClick={() => setCount(0)}
          className="px-6 py-3 text-xl bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-6 py-3 text-xl bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

