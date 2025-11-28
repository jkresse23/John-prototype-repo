'use client'

import { useState } from 'react'

// Mock data
const initialBooks = [
  { id: 1, title: 'Dog Man', status: 'reading' as const },
  { id: 2, title: 'Captain Underpants', status: 'finished' as const },
  { id: 3, title: 'Pete the Cat', status: 'finished' as const },
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type View = 'home' | 'log' | 'books' | 'progress'

export default function ReadingTrackerPrototype() {
  const [view, setView] = useState<View>('home')
  const [todayMinutes, setTodayMinutes] = useState(0)
  const [streak, setStreak] = useState(5)
  const [showCelebration, setShowCelebration] = useState(false)
  const [books, setBooks] = useState(initialBooks)
  const [logMinutes, setLogMinutes] = useState(15)
  const [weekData, setWeekData] = useState([20, 15, 25, 0, 18, 0, 0]) // Sun-Sat
  const [newBookTitle, setNewBookTitle] = useState('')
  const [showAddBook, setShowAddBook] = useState(false)

  const handleLogReading = () => {
    setTodayMinutes(prev => prev + logMinutes)
    // Update today in week data (assuming today is Saturday for demo)
    const newWeekData = [...weekData]
    newWeekData[6] = (newWeekData[6] || 0) + logMinutes
    setWeekData(newWeekData)
    
    // Show celebration
    setShowCelebration(true)
    setTimeout(() => {
      setShowCelebration(false)
      setView('home')
    }, 2000)
    
    // Update streak if this is first reading today
    if (todayMinutes === 0) {
      setStreak(prev => prev + 1)
    }
  }

  const handleAddBook = () => {
    if (newBookTitle.trim()) {
      setBooks([...books, { 
        id: Date.now(), 
        title: newBookTitle.trim(), 
        status: 'reading' 
      }])
      setNewBookTitle('')
      setShowAddBook(false)
    }
  }

  const toggleBookStatus = (id: number) => {
    setBooks(books.map(book => 
      book.id === id 
        ? { ...book, status: book.status === 'reading' ? 'finished' : 'reading' }
        : book
    ))
  }

  const totalWeekMinutes = weekData.reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-500 to-purple-700 p-4">
      <div className="max-w-md mx-auto">
        
        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-purple-600 mb-2">Amazing!</h2>
              <p className="text-gray-600">You logged {logMinutes} minutes of reading!</p>
              {streak > 0 && (
                <p className="text-orange-500 font-semibold mt-2">🔥 {streak} day streak!</p>
              )}
            </div>
          </div>
        )}

        {/* Home View */}
        {view === 'home' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center pt-4">
              <h1 className="text-3xl font-bold text-white mb-1">📚 Reading Time!</h1>
              <p className="text-purple-200">Let's read today!</p>
            </div>

            {/* Today's Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="text-center">
                <p className="text-gray-500 text-sm uppercase tracking-wide">Today</p>
                <div className="text-6xl font-bold text-purple-600 my-4">
                  {todayMinutes}
                  <span className="text-2xl text-gray-400 ml-2">min</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-purple-100 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (todayMinutes / 20) * 100)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">Goal: 20 minutes</p>
              </div>
            </div>

            {/* Streak */}
            <div className="bg-orange-400 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🔥</span>
                <div>
                  <p className="text-white font-bold text-xl">{streak} Day Streak!</p>
                  <p className="text-orange-100 text-sm">Keep it going!</p>
                </div>
              </div>
            </div>

            {/* Big Log Button */}
            <button
              onClick={() => setView('log')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-6 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              📖 Log Reading
            </button>

            {/* Bottom Nav */}
            <div className="bg-white/20 backdrop-blur rounded-2xl p-2 flex justify-around">
              <NavButton icon="🏠" label="Home" active onClick={() => setView('home')} />
              <NavButton icon="📚" label="Books" onClick={() => setView('books')} />
              <NavButton icon="📊" label="Progress" onClick={() => setView('progress')} />
            </div>
          </div>
        )}

        {/* Log Reading View */}
        {view === 'log' && (
          <div className="space-y-6">
            <button 
              onClick={() => setView('home')}
              className="text-white flex items-center gap-2"
            >
              ← Back
            </button>

            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                How long did you read?
              </h2>

              {/* Minutes Selector */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => setLogMinutes(Math.max(5, logMinutes - 5))}
                  className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 text-3xl font-bold hover:bg-purple-200 transition-colors"
                >
                  −
                </button>
                <div className="text-center">
                  <span className="text-6xl font-bold text-purple-600">{logMinutes}</span>
                  <p className="text-gray-400">minutes</p>
                </div>
                <button
                  onClick={() => setLogMinutes(logMinutes + 5)}
                  className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 text-3xl font-bold hover:bg-purple-200 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Quick Select */}
              <div className="flex justify-center gap-2 mb-8">
                {[10, 15, 20, 30].map(min => (
                  <button
                    key={min}
                    onClick={() => setLogMinutes(min)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                      logMinutes === min 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                  >
                    {min}m
                  </button>
                ))}
              </div>

              {/* Currently Reading */}
              <div className="border-t pt-4 mb-6">
                <p className="text-sm text-gray-500 mb-2">Currently reading:</p>
                <div className="flex flex-wrap gap-2">
                  {books.filter(b => b.status === 'reading').map(book => (
                    <span 
                      key={book.id}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {book.title}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLogReading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 rounded-xl transition-all"
              >
                ✓ Save Reading
              </button>
            </div>
          </div>
        )}

        {/* Books View */}
        {view === 'books' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pt-4">
              <h1 className="text-2xl font-bold text-white">📚 My Books</h1>
              <button
                onClick={() => setShowAddBook(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-colors"
              >
                + Add Book
              </button>
            </div>

            {/* Add Book Modal */}
            {showAddBook && (
              <div className="bg-white rounded-2xl p-4 shadow-xl">
                <input
                  type="text"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  placeholder="Book title..."
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl mb-3 focus:outline-none focus:border-purple-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddBook}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-xl font-semibold"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddBook(false)}
                    className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Reading Now */}
            <div>
              <h2 className="text-white/80 text-sm uppercase tracking-wide mb-2">Reading Now</h2>
              <div className="space-y-2">
                {books.filter(b => b.status === 'reading').map(book => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    onToggle={() => toggleBookStatus(book.id)} 
                  />
                ))}
                {books.filter(b => b.status === 'reading').length === 0 && (
                  <p className="text-white/60 text-center py-4">No books in progress</p>
                )}
              </div>
            </div>

            {/* Finished */}
            <div>
              <h2 className="text-white/80 text-sm uppercase tracking-wide mb-2">
                Finished ({books.filter(b => b.status === 'finished').length})
              </h2>
              <div className="space-y-2">
                {books.filter(b => b.status === 'finished').map(book => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    onToggle={() => toggleBookStatus(book.id)} 
                  />
                ))}
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-white/20 backdrop-blur rounded-2xl p-2 flex justify-around">
              <NavButton icon="🏠" label="Home" onClick={() => setView('home')} />
              <NavButton icon="📚" label="Books" active onClick={() => setView('books')} />
              <NavButton icon="📊" label="Progress" onClick={() => setView('progress')} />
            </div>
          </div>
        )}

        {/* Progress View */}
        {view === 'progress' && (
          <div className="space-y-6">
            <div className="pt-4">
              <h1 className="text-2xl font-bold text-white">📊 This Week</h1>
            </div>

            {/* Week Summary */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm">Total Reading</p>
                <p className="text-5xl font-bold text-purple-600">{totalWeekMinutes}</p>
                <p className="text-gray-400">minutes this week</p>
              </div>

              {/* Week Chart */}
              <div className="flex items-end justify-between gap-2 h-32 mb-2">
                {weekData.map((minutes, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg transition-all ${
                        minutes > 0 
                          ? 'bg-gradient-to-t from-purple-600 to-purple-400' 
                          : 'bg-gray-200'
                      }`}
                      style={{ height: `${Math.max(8, (minutes / 30) * 100)}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {weekDays.map((day, i) => (
                  <span 
                    key={day} 
                    className={`text-xs flex-1 text-center ${
                      i === 6 ? 'font-bold text-purple-600' : 'text-gray-400'
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-orange-500">🔥 {streak}</p>
                <p className="text-gray-500 text-sm">Day Streak</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-green-500">
                  {books.filter(b => b.status === 'finished').length}
                </p>
                <p className="text-gray-500 text-sm">Books Finished</p>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-white/20 backdrop-blur rounded-2xl p-2 flex justify-around">
              <NavButton icon="🏠" label="Home" onClick={() => setView('home')} />
              <NavButton icon="📚" label="Books" onClick={() => setView('books')} />
              <NavButton icon="📊" label="Progress" active onClick={() => setView('progress')} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NavButton({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: string
  label: string
  active?: boolean
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
        active 
          ? 'bg-white text-purple-600' 
          : 'text-white hover:bg-white/20'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

function BookCard({ 
  book, 
  onToggle 
}: { 
  book: { id: number; title: string; status: 'reading' | 'finished' }
  onToggle: () => void 
}) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">
          {book.status === 'finished' ? '✅' : '📖'}
        </span>
        <span className={`font-medium ${book.status === 'finished' ? 'text-gray-400' : 'text-gray-800'}`}>
          {book.title}
        </span>
      </div>
      <button
        onClick={onToggle}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          book.status === 'finished'
            ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            : 'bg-green-100 text-green-600 hover:bg-green-200'
        }`}
      >
        {book.status === 'finished' ? 'Read again' : 'Finish'}
      </button>
    </div>
  )
}

