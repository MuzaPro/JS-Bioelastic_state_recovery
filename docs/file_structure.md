# Haptic Transducer Interactive - File Structure

```
haptic-transducer-interactive/
│
├── 📄 README.md
├── 📄 LICENSE
├── 📄 .gitignore
├── 📄 index.html                        # Main landing page (ROOT for GitHub Pages/Vercel)
├── 📄 favicon.ico
├── 📄 manifest.json                     # PWA manifest (optional)
├── 📄 package.json                      # Optional, for dependencies
│
├── 📁 states/
│   ├── 📄 state1.html                   # Transducer on hand
│   ├── 📄 state2.html                   # Exploded view
│   ├── 📄 state3.html                   # Force diagrams
│   ├── 📄 state4.html                   # Array configuration
│   └── 📄 state5.html                   # Sensory demo
│
├── 📁 css/
│   ├── 📄 reset.css                     # CSS reset/normalize
│   ├── 📄 variables.css                 # CSS custom properties
│   ├── 📄 base.css                      # Base styles and typography
│   ├── 📄 components.css                # Reusable components
│   ├── 📄 state-machine.css             # State-specific layouts
│   ├── 📄 animations.css                # Animation and transition styles
│   ├── 📄 responsive.css                # Media queries and mobile
│   └── 📄 themes.css                    # Dark/light mode support
│
├── 📁 js/
│   ├── 📄 config.js                     # Global configuration
│   ├── 📄 state-machine.js              # Core state management
│   ├── 📄 animation-player.js           # WebP sequence player
│   ├── 📄 preloader.js                  # Asset preloading system
│   ├── 📄 navigation.js                 # Navigation logic
│   ├── 📄 interactive-elements.js       # Interactive components
│   ├── 📄 force-diagram.js              # State 3 force interactions
│   ├── 📄 utils.js                      # Helper functions
│   └── 📄 analytics.js                  # Analytics and tracking
│
├── 📁 assets/
│   ├── 📁 animations/
│   │   ├── 📁 state1-to-state2/
│   │   │   ├── 📄 frame-00000000.webp
│   │   │   ├── 📄 frame-00000001.webp
│   │   │   └── 📄 ... (25 frames total)
│   │   ├── 📁 state2-to-state3/
│   │   ├── 📁 state1-to-state4/
│   │   ├── 📁 state4-to-state5/
│   │   └── 📁 state-static/             # Static state images
│   │
│   ├── 📁 images/
│   │   ├── 📁 components/
│   │   │   ├── 📄 magnet-permanent.svg
│   │   │   ├── 📄 electromagnet.svg
│   │   │   ├── 📄 titanium-rod.svg
│   │   │   └── 📄 battery.svg
│   │   ├── 📁 diagrams/
│   │   │   ├── 📄 force-vectors.svg
│   │   │   ├── 📄 magnetic-field.svg
│   │   │   └── 📄 array-layout.svg
│   │   ├── 📁 ui/
│   │   │   ├── 📄 navigation-arrows.svg
│   │   │   ├── 📄 loading-spinner.svg
│   │   │   └── 📄 progress-indicators.svg
│   │   └── 📁 backgrounds/
│   │       ├── 📄 gradient-light.jpg
│   │       └── 📄 gradient-dark.jpg
│   │
│   ├── 📁 icons/
│   │   ├── 📄 icon-192x192.png
│   │   ├── 📄 icon-512x512.png
│   │   ├── 📄 apple-touch-icon.png
│   │   └── 📁 nav-icons/
│   │       ├── 📄 home.svg
│   │       ├── 📄 design.svg
│   │       ├── 📄 functionality.svg
│   │       ├── 📄 array.svg
│   │       └── 📄 demo.svg
│   │
│   └── 📁 fonts/
│       ├── 📄 Assistant-Regular.woff2
│       ├── 📄 Assistant-Medium.woff2
│       ├── 📄 InknutAntiqua-Regular.woff2
│       └── 📄 InknutAntiqua-SemiBold.woff2
│
├── 📁 docs/
│   ├── 📄 PRD.md                       # Product Requirements Document
│   ├── 📄 technical-specs.md           # Implementation details
│   ├── 📄 content-guide.md             # Writing guidelines
│   ├── 📄 deployment.md                # Deployment instructions
│   ├── 📄 browser-compatibility.md     # Browser testing results
│   └── 📁 design/
│       ├── 📄 state-diagrams.md        # State machine documentation
│       ├── 📄 animation-specs.md       # Animation requirements
│       └── 📄 style-guide.md           # Visual design guidelines
│
├── 📁 tools/
│   ├── 📄 frame-converter.js           # Blender → WebP conversion script
│   ├── 📄 asset-optimizer.js           # Image compression utility
│   └── 📄 deployment-helper.js         # Build and deploy automation
│
├── 📁 tests/
│   ├── 📄 state-machine.test.js        # State navigation tests
│   ├── 📄 animation-player.test.js     # Animation functionality tests
│   ├── 📄 responsive.test.js           # Mobile compatibility tests
│   └── 📁 fixtures/
│       └── 📄 test-animations/         # Sample animation files
│
└── 📁 deploy/
    ├── 📄 vercel.json                  # Vercel configuration
    ├── 📄 netlify.toml                 # Netlify configuration
    ├── 📄 github-pages.yml             # GitHub Actions workflow
    └── 📄 .htaccess                    # Apache server configuration
```

## Key Organizational Principles

### 📁 **src/** - Source Code
All development files organized by type (HTML, CSS, JS, assets)

### 📁 **public/** - Production Files  
Clean, deployment-ready files with minimal structure

### 📁 **assets/animations/** - Frame Sequences
- Organized by transition (e.g., `state1-to-state2/`)
- Consistent naming: `frame-XXXXXXXX.webp`
- Include reverse sequences for backward navigation

### 📁 **docs/** - Documentation
Complete project documentation for developers and content creators

### 📁 **tools/** - Development Utilities
Scripts for asset conversion and optimization

### 📁 **tests/** - Quality Assurance
Automated testing for core functionality

### 📁 **deploy/** - Deployment Configurations
Platform-specific deployment settings

## File Naming Conventions

- **HTML**: `state[N].html` (e.g., `state1.html`)
- **Animation frames**: `frame-XXXXXXXX.webp` (8-digit zero-padded)
- **CSS**: Kebab-case (e.g., `state-machine.css`)
- **JavaScript**: Kebab-case (e.g., `animation-player.js`)
- **Images**: Descriptive names (e.g., `titanium-rod.svg`)

## Development Workflow

1. **Development**: Work directly in root directory for static files
2. **Testing**: Run tests from `tests/` directory  
3. **Building**: Use `tools/` scripts to optimize assets
4. **Deployment**: Push to main branch for GitHub Pages, or use `deploy/` configurations

This structure supports:
- ✅ **GitHub Pages Ready** - index.html in root directory
- ✅ **Vercel Compatible** - Proper static file organization
- ✅ **Scalability** - Easy to add new states or features
- ✅ **Maintainability** - Clear separation of concerns
- ✅ **Performance** - Optimized asset organization
- ✅ **Collaboration** - Clear file organization for team development