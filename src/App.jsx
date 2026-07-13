import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import RoutePlannerCard from './components/RoutePlannerCard'
import JourneyResults from './components/JourneyResults'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [journey, setJourney] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedDark = localStorage.getItem('darkMode')
    const dark = savedDark !== null ? savedDark === 'true' : prefersDark
    setIsDark(dark)
    updateDarkMode(dark)
  }, [])

  const updateDarkMode = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleDarkMode = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem('darkMode', newDark)
    updateDarkMode(newDark)
  }

  const handleSearch = (from, to) => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setJourney({ from, to })
      setIsSearching(false)
    }, 600)
  }

  const handleClearResults = () => {
    setJourney(null)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <Header isDark={isDark} onToggleDark={toggleDarkMode} />
      
      {!journey ? (
        <>
          <Hero />
          <RoutePlannerCard onSearch={handleSearch} isLoading={isSearching} />
          <FeaturesSection />
        </>
      ) : (
        <JourneyResults journey={journey} onClear={handleClearResults} />
      )}
      
      <Footer isDark={isDark} />
    </div>
  )
}
