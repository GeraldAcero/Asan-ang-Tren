import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer({ isDark }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-lg">Asan ang Tren?</span>
            </div>
            <p className="text-sm text-gray-400">Modern transit guide for Manila&apos;s public transportation.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">License</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Asan ang Tren? All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors" aria-label="Twitter">
                <Twitter size={20} className="text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors" aria-label="GitHub">
                <Github size={20} className="text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors" aria-label="Email">
                <Mail size={20} className="text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
