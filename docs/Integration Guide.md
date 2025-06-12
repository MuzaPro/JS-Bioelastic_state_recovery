# Haptic Technology Module - Integration Guide

**Quick Integration for Busy Researchers** • 15-30 minutes setup

## 🚀 Quick Start (Choose Your Path)

### **Option A: Dedicated Research Page** ⭐ *Recommended*

Copy entire module to `/research/haptic-technology/` → Done

```bash
# Your site structure
your-site/
├── research/
│   └── haptic-technology/    # ← Drop the entire module here
│       ├── index.html
│       ├── assets/
│       └── ...
```

### **Option B: Embedded Component**

Integrate into existing pages using iframe or direct embedding

### **Option C: Modal/Overlay**

Trigger module as full-screen overlay from existing content

---

## 📁 File Structure & Assets

### **Complete File Manifest**

```
haptic-module/
├── index.html                 # Main entry point
├── script.js                  # State machine logic
├── style.css                  # All styling
└── assets/
    ├── animations/
    │   ├── state-static/       # Static images (fallbacks)
    │   │   ├── state1_static.webp
    │   │   ├── state2_static.webp
    │   │   ├── state3-static.webp
    │   │   ├── state3b-static.webp
    │   │   ├── state4_static.webp
    │   │   └── state5_static.webp
    │   ├── state1-to-state2.webm
    │   ├── state2-to-state1.webm
    │   ├── state1-to-state4.webm
    │   ├── state4-to-state1.webm
    │   ├── state2-to-state3.webm
    │   ├── state3-to-state2.webm
    │   ├── state2-to-state4.webm
    │   ├── state4-to-state2.webm
    │   ├── 3Ato3B.webm
    │   └── 3Bto3A.webm
    ├── fonts/
    │   └── roboto/
    │       ├── Roboto-Regular.ttf
    │       └── Roboto-Black.ttf
    └── icons/
        ├── logo.png
        └── nav-icons/
            └── array.svg
```

### **Asset Optimization Tips**

- **Total size**: ~50MB (mostly video files)
- **Lazy loading**: Videos preload automatically
- **Fallbacks**: Static images if videos fail
- **CDN ready**: All paths are relative

---

## 🔧 Integration Methods

### **Method 1: Dedicated Page** (Easiest)

1. **Copy files** to your desired directory
2. **Update navigation** in your main site:

```html
<a href="/research/haptic-technology/">Haptic Research</a>
```

3. **Optional**: Customize header/footer to match your site

**Header Integration** (replace existing header):

```html
<!-- Replace the <header class="site-header"> section with: -->
<header class="site-header">
    <div class="container">
        <nav>
            <a href="/" class="logo">Your Lab Name</a>
            <ul class="nav-links">
                <li><a href="/people">PEOPLE</a></li>
                <li><a href="/research">RESEARCH</a></li>
                <li><a href="/publications">PUBLICATIONS</a></li>
                <li><a href="/contact">CONTACT</a></li>
            </ul>
        </nav>
    </div>
</header>
```

---

### **Method 2: Embedded Component**

**Option 2A: Iframe Embed** (Zero conflicts)

```html
<div class="research-showcase">
    <iframe src="/research/haptic-technology/" 
            width="100%" 
            height="800px" 
            frameborder="0"
            allow="autoplay">
    </iframe>
</div>
```

**Option 2B: Direct Embed** (More integration)

```html
<!-- In your existing page -->
<div id="haptic-module-container">
    <!-- Copy the main content section from index.html -->
    <main class="main-content">
        <div class="container">
            <!-- Module content here -->
        </div>
    </main>
</div>

<!-- Add these before closing </body> -->
<link rel="stylesheet" href="/assets/haptic-module/style.css">
<script src="/assets/haptic-module/script.js"></script>
```

---

### **Method 3: Modal/Overlay**

**Trigger Button** (in your existing page):

```html
<button onclick="openHapticModule()" class="research-button">
    Explore Interactive Haptic Research
</button>
```

**Modal Implementation**:

```html
<!-- Add to your page -->
<div id="haptic-modal" class="modal-overlay" style="display: none;">
    <div class="modal-content">
        <button onclick="closeHapticModule()" class="close-btn">×</button>
        <iframe src="/research/haptic-technology/" width="100%" height="90%"></iframe>
    </div>
</div>

<style>
.modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.9); z-index: 10000; display: flex;
    align-items: center; justify-content: center;
}
.modal-content { width: 95%; height: 95%; position: relative; }
.close-btn { position: absolute; top: 10px; right: 20px; z-index: 10001; }
</style>

<script>
function openHapticModule() {
    document.getElementById('haptic-modal').style.display = 'flex';
}
function closeHapticModule() {
    document.getElementById('haptic-modal').style.display = 'none';
}
</script>
```

---

## 🎨 Customization Options

### **Brand Colors** (Quick CSS updates)

```css
/* In style.css, find and replace: */
:root {
    --primary-color: #29292A;     /* Your brand color */
    --accent-color: #555;         /* Secondary color */
    --background: #ffffff;        /* Background */
    --text-color: #333;          /* Text color */
}
```

### **Typography** (Replace fonts)

```css
/* Replace Roboto with your fonts */
@font-face {
    font-family: 'YourFont';
    src: url('path/to/your-font.woff2');
}

body {
    font-family: 'YourFont', 'Roboto', sans-serif;
}
```

### **Logo Integration**

Replace `assets/icons/logo.png` with your lab logo, or update:

```html
<a href="/" class="logo">
    <img src="path/to/your-logo.png" alt="Your Lab">
</a>
```

---

## 📱 Responsive Behavior

**Automatic responsive design** includes:

- **Desktop**: Side-by-side layout
- **Tablet**: Stacked layout
- **Mobile**: Touch-optimized navigation

**Test responsive behavior**:

```bash
# Test on various devices/sizes
- Desktop: 1200px+
- Tablet: 768px - 1024px  
- Mobile: <768px
```

---

## ⚡ Performance Optimization

### **Video Loading Strategy**

- Videos **preload automatically** for smooth transitions
- **Fallback images** if videos fail to load
- **Progressive loading** based on user interaction

### **CDN Integration** (Optional)

If using a CDN, update asset paths in `script.js`:

```javascript
// Replace asset paths with CDN URLs
const animations = {
    "1-2": "https://your-cdn.com/haptic-assets/state1-to-state2.webm",
    // ... etc
};
```

### **Bundle Size**

- **Core files**: ~500KB (HTML/CSS/JS)
- **Videos**: ~4.5MB total
- **Images**: ~250kb total
- **Consider**: Lazy loading videos on user interaction

---

## 🔗 Analytics Integration

### **Google Analytics**

Add to `script.js` in the `transitionToState` function:

```javascript
// After successful transition
if (typeof gtag !== 'undefined') {
    gtag('event', 'haptic_module_transition', {
        'from_state': currentState,
        'to_state': targetState,
        'transition_type': 'user_initiated'
    });
}
```

### **Custom Tracking**

```javascript
// Add custom tracking in script.js
function trackModuleUsage(eventName, data) {
    // Your analytics implementation
    console.log(`Haptic Module: ${eventName}`, data);
}
```

---

## 🌐 Browser Compatibility

**Supported Browsers**:

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE11 (limited video support)

**Video Format Fallbacks**:

```html
<!-- If you need broader support, add MP4 versions -->
<video>
    <source src="animation.webm" type="video/webm">
    <source src="animation.mp4" type="video/mp4">
</video>
```

---

## 🛠️ Quick Troubleshooting

### **Videos not playing?**

- Check file paths in `script.js`
- Verify server MIME types for `.webm`
- Test in different browsers

### **Fonts not loading?**

- Verify font file paths in `style.css`
- Check CORS headers if fonts are on different domain

### **Layout issues?**

- Check for CSS conflicts with existing styles
- Use browser dev tools to inspect

### **State transitions broken?**

- Check browser console for JavaScript errors
- Verify all video files are present

---

## 📋 Deployment Checklist

- [ ] Files copied to correct directory
- [ ] All asset paths working
- [ ] Header/navigation updated
- [ ] Mobile responsive testing
- [ ] Cross-browser testing
- [ ] Analytics integration (optional)
- [ ] Performance testing with large video files

---

## 🚀 Go Live

**Minimal Setup** (5 minutes):

1. Copy entire module to `/research/haptic-technology/`
2. Update your main navigation to link to it
3. Test on mobile

**Full Integration** (30 minutes):

1. Choose integration method
2. Customize branding/colors
3. Add analytics
4. Performance testing
5. Cross-browser testing

---

**Questions?** The module is designed to be self-contained and should work out-of-the-box with minimal configuration. Most issues are path-related and easily fixed by checking the browser console.
