import { useState } from 'react'
import { MapPin, ArrowRightLeft, MapPinOff, Zap } from 'lucide-react'
import { STATIONS } from '../data/stations'

export default function RoutePlannerCard({ onSearch, isLoading }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)

  const handleFromChange = (value) => {
    setFrom(value)
    if (value.length > 0) {
      const filtered = STATIONS.filter(s => 
        s.name.toLowerCase().includes(value.toLowerCase())
      )
      setFromSuggestions(filtered)
      setShowFromSuggestions(true)
    } else {
      setFromSuggestions([])
      setShowFromSuggestions(false)
    }
  }

  const handleToChange = (value) => {
    setTo(value)
    if (value.length > 0) {
      const filtered = STATIONS.filter(s => 
        s.name.toLowerCase().includes(value.toLowerCase())
      )
      setToSuggestions(filtered)
      setShowToSuggestions(true)
    } else {
      setToSuggestions([])
      setShowToSuggestions(false)
    }
  }

  const selectFrom = (station) => {
    setFrom(station.name)
    setShowFromSuggestions(false)
  }

  const selectTo = (station) => {
    setTo(station.name)
    setShowToSuggestions(false)
  }

  const swapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (from && to && from !== to) {
      onSearch(from, to)
    }
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="card shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Plan Your Journey</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* From Location */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  From
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => handleFromChange(e.target.value)}
                  onFocus={() => from && setShowFromSuggestions(true)}
                  className="input-field"
                  placeholder="Enter starting station..."
                  autoComplete="off"
                />
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    {fromSuggestions.slice(0, 5).map((station) => (
                      <button
                        key={station.id}
                        type="button"
                        onClick={() => selectFrom(station)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: station.line }}></div>
                        <span className="text-sm">{station.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="flex items-end justify-center md:justify-center pb-2">
                <button
                  type="button"
                  onClick={swapLocations}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Swap locations"
                >
                  <ArrowRightLeft size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* To Location */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPinOff size={16} className="inline mr-1" />
                  To
                </label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => handleToChange(e.target.value)}
                  onFocus={() => to && setShowToSuggestions(true)}
                  className="input-field"
                  placeholder="Enter destination station..."
                  autoComplete="off"
                />
                {showToSuggestions && toSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    {toSuggestions.slice(0, 5).map((station) => (
                      <button
                        key={station.id}
                        type="button"
                        onClick={() => selectTo(station)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: station.line }}></div>
                        <span className="text-sm">{station.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!from || !to || from === to || isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Find Route
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
