import { STATIONS } from '../data/stations'

export function generateJourney(from, to) {
  const fromStation = STATIONS.find(s => s.name.toLowerCase() === from.toLowerCase())
  const toStation = STATIONS.find(s => s.name.toLowerCase() === to.toLowerCase())

  if (!fromStation || !toStation || fromStation.id === toStation.id) {
    return null
  }

  // Simple fare calculation based on distance
  const fare = calculateFare(fromStation, toStation)
  
  // Create journey based on line connections
  const journey = createJourney(fromStation, toStation)

  return {
    from: fromStation.name,
    to: toStation.name,
    stations: journey.stations,
    duration: journey.duration,
    fare: fare,
    notes: journey.notes,
  }
}

function calculateFare(from, to) {
  // Simple fare calculation
  // Metro Manila fare ranges from ₱16-32 depending on distance
  const baseFare = 16
  const distanceFactor = Math.abs(from.id.charCodeAt(0) - to.id.charCodeAt(0)) % 5
  const fare = baseFare + (distanceFactor * 3)
  return Math.min(fare, 32)
}

function createJourney(from, to) {
  const fromLine = from.line
  const toLine = to.line

  // Same line journey
  if (fromLine === toLine) {
    return {
      stations: [from, to],
      duration: 15 + Math.random() * 20,
      notes: ['Direct route on ' + from.lineCode],
    }
  }

  // Transfer required
  const transferHub = STATIONS.find(s => s.line === toLine && s.name.includes('Cubao')) || 
                     STATIONS.find(s => s.line === toLine)

  return {
    stations: [
      from,
      { ...from, message: 'Check departure times', transfer: transferHub.lineCode },
      { ...transferHub, message: 'Transfer here' },
      to,
    ],
    duration: 30 + Math.random() * 20,
    notes: [
      'Transfer required at ' + transferHub.name,
      'Allow 5-10 minutes for transfer',
      'Check transfer station signage carefully',
    ],
  }
}
