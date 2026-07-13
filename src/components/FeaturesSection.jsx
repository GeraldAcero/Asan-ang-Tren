import { MapPin, Zap, TrendingDown, Bookmark, Moon, Share2 } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Smart Route Planning',
    description: 'Get optimal routes across Manila\'s LRT-1, LRT-2, and MRT-3 with real-time recommendations.',
  },
  {
    icon: Zap,
    title: 'Instant Fare Calculator',
    description: 'Know exactly how much your journey costs before you travel. No surprises.',
  },
  {
    icon: TrendingDown,
    title: 'Accurate Journey Times',
    description: 'Precise duration calculations including transfers and waiting times.',
  },
  {
    icon: Bookmark,
    title: 'Save Favorites',
    description: 'Bookmark your frequent routes and access them in a single tap.',
  },
  {
    icon: Moon,
    title: 'Dark Mode Support',
    description: 'Easy on the eyes with a beautifully designed dark theme.',
  },
  {
    icon: Share2,
    title: 'Share Routes',
    description: 'Share your planned journey with friends and colleagues instantly.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Asan ang Tren?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Everything you need for seamless Manila transit navigation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-900 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/20 transition-colors">
                    <Icon className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
