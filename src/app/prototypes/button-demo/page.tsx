'use client'

// This is a sample prototype page - replace with your own components!

export default function ButtonDemoPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Button Demo</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">Variants</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Primary
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Secondary
            </button>
            <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
              Outline
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Sizes</h2>
          <div className="flex items-center gap-4">
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">
              Small
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Medium
            </button>
            <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg">
              Large
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

