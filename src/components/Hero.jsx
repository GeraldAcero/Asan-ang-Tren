import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-light opacity-5 rounded-full mix-blend-screen blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 opacity-5 rounded-full mix-blend-screen blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="inline-block mb-4 px-4 py-2 bg-primary-50 dark:bg-gray-900 rounded-full">
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">🚇 Welcome to Manila Transit</p>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-950 dark:text-white mb-6 leading-tight">
          Navigate Manila&apos;s Metro with
          <span className="block bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">Ease & Precision</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Get real-time route planning, accurate fare calculations, and discover transit landmarks across LRT-1, LRT-2, and MRT-3. Your modern guide to Manila&apos;s public transportation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary flex items-center justify-center gap-2 group">
            Start Planning
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="btn-secondary">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
