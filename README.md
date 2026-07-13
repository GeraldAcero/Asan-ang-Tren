# Asan ang Tren? - Modern Redesign 🚇

A completely reimagined, modern transit guide for navigating Manila's public transportation system (LRT-1, LRT-2, and MRT-3). Built with React, Vite, and Tailwind CSS for optimal performance and visual appeal.

## ✨ What's New

This is a ground-up redesign of the original Asan ang Tren application, featuring:

### Modern Design System
- **Color Palette**: Teal primary (#0BA5A1), lime accents (#7FFF00), and sophisticated neutrals
- **Typography**: Inter font family with strong visual hierarchy
- **Components**: Card-based layouts with smooth animations and transitions
- **Responsive**: Mobile-first design that works beautifully on all devices

### Key Features
- 🗺️ **Smart Route Planning** - Find optimal routes across all three transit lines
- 💰 **Instant Fare Calculator** - Know exactly how much your journey costs
- ⏱️ **Accurate Journey Times** - Precise duration calculations with transfer times
- 🔖 **Save Favorites** - Bookmark frequent routes for quick access
- 🌙 **Dark Mode** - Beautiful dark theme with system preference detection
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable React components
│   ├── Header.jsx      # Navigation and theme toggle
│   ├── Hero.jsx        # Landing section
│   ├── RoutePlannerCard.jsx  # Route search form
│   ├── JourneyResults.jsx    # Journey timeline visualization
│   ├── FeaturesSection.jsx   # Features showcase
│   └── Footer.jsx      # Footer with links
├── data/
│   └── stations.js     # Station database (80+ stations)
├── utils/
│   └── routeCalculator.js    # Route and fare calculation logic
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles with Tailwind
```

### Technology Stack
- **React 18.3** - UI framework
- **Vite 5.2** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS
- **Lucide React 0.408** - Beautiful icons
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

The development server runs at `http://localhost:3000` with hot module replacement (HMR).

## 🎨 Design Tokens

### Colors
- **Primary**: `#0BA5A1` (teal)
- **Primary Dark**: `#078A87` (darker teal)
- **Accent**: `#7FFF00` (lime green)
- **Background**: `#FFFFFF` (light), `#0F0F0F` (dark)
- **Surface**: `#F5F5F5` (light), `#1A1A1A` (dark)
- **Border**: `#E0E0E0` (light), `#333333` (dark)

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Border Radius
- sm: 6px
- md: 8px
- lg: 12px

## 📊 Features in Detail

### Route Planner
Search for routes with autocomplete suggestions from 80+ stations across LRT-1, LRT-2, and MRT-3. Swap origin/destination with a single click.

### Journey Timeline
Visual timeline showing:
- Each station stop with line color indicators
- Transfer information and stations
- Estimated journey duration
- Total fare calculation

### Fare System
Dynamic fare calculation based on:
- Origin and destination
- Line transfers
- Distance between stations
- Current Manila transit pricing

## 🌙 Dark Mode

Dark mode is automatically enabled based on system preferences but can be toggled manually. Preference is saved to localStorage for persistence.

```javascript
// Automatic detection and manual toggle
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = localStorage.getItem('darkMode') ?? prefersDark
```

## 📱 Responsive Breakpoints

- Mobile: 0px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

All components gracefully adapt to different screen sizes.

## 🔧 Configuration

### Tailwind Config
See `tailwind.config.js` for complete theming setup including:
- Extended color palette
- Custom spacing scale
- Custom shadow utilities
- Border radius configuration

### Vite Config
See `vite.config.js` for build and development settings.

## 📦 Build Output

Production build creates an optimized bundle:
- **CSS**: ~4.28 kB (gzipped)
- **JS**: ~52.98 kB (gzipped)
- **HTML**: ~0.42 kB (gzipped)

Total: ~58 kB gzipped, perfect for fast loading.

## 🎯 Performance

- Lightning-fast Vite builds
- Code splitting for optimal loading
- Tailwind CSS purging removes unused styles
- Optimized React component rendering
- Smooth animations with CSS transitions

## 🚢 Deployment

Ready for deployment to:
- **Vercel** (recommended, zero-config)
- **Netlify**
- **GitHub Pages**
- **Any static hosting**

Simply deploy the `dist/` folder after running `pnpm run build`.

## 📝 License

MIT License - feel free to use this project for any purpose.

## 🙏 Credits

- Original Asan ang Tren concept and data
- Modern redesign and development: v0 (Vercel AI)
- Icons: Lucide React
- Design: Custom Tailwind CSS configuration

---

**Happy Commuting! 🚇** Navigate Manila's transit system with confidence and style.
