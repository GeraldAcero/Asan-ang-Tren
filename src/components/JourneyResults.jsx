import { ArrowLeft, Clock, MapPin, DollarSign } from 'lucide-react'
import { generateJourney } from '../utils/routeCalculator'

export default function JourneyResults({ journey, onClear }) {
  const result = generateJourney(journey.from, journey.to)

  if (!result) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={onClear}
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 font-medium"
          >
            <ArrowLeft size={20} />
            New Search
          </button>
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No route found between these stations.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6">
        <button
          onClick={onClear}
          className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          New Search
        </button>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center gap-3">
              <Clock className="text-primary-600 dark:text-primary-400" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{result.duration} mins</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <MapPin className="text-primary-600 dark:text-primary-400" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stations</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{result.stations.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <DollarSign className="text-accent" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fare</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">₱{result.fare}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Journey Timeline</h3>
          
          <div className="space-y-4">
            {result.stations.map((station, index) => (
              <div key={index} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-4 h-4 rounded-full border-2"
                    style={{ borderColor: station.line }}
                  ></div>
                  {index < result.stations.length - 1 && (
                    <div
                      className="w-1 h-12 mt-2"
                      style={{ backgroundColor: station.line }}
                    ></div>
                  )}
                </div>

                {/* Station Info */}
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{station.name}</h4>
                    <span className="px-2 py-1 text-xs font-semibold text-white rounded" style={{ backgroundColor: station.line }}>
                      {station.lineCode}
                    </span>
                  </div>
                  {station.transfer && (
                    <p className="text-sm text-accent font-medium">↪ Transfer to {station.transfer}</p>
                  )}
                  {station.message && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{station.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {result.notes && result.notes.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">ℹ️ Notes:</p>
              <ul className="space-y-2">
                {result.notes.map((note, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
