/**
 * Theme Management for Bioelastic State Recovery Documentation
 * Handles theme toggling, persistence, and integration with Mermaid diagrams
 */

// Get the user's preferred theme from localStorage or system preferences
function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply the selected theme to the document and update Mermaid diagrams
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update Mermaid diagrams if Mermaid is loaded
  if (window.mermaid) {
    const mermaidTheme = theme === 'dark' ? 'dark' : 'base';
    window.mermaid.initialize({ 
      startOnLoad: true,
      theme: mermaidTheme,
      themeVariables: {
        primaryColor: theme === 'dark' ? '#ffd700' : '#f4c430',
        primaryTextColor: theme === 'dark' ? '#e5e5e5' : '#1a1a1a',
        primaryBorderColor: theme === 'dark' ? '#404040' : '#e5e5e5',
        lineColor: theme === 'dark' ? '#888888' : '#666666',
        background: theme === 'dark' ? '#1a1a1a' : '#fafafa'
      }
    });
    
    // Refresh existing Mermaid diagrams
    const mermaidElements = document.querySelectorAll('.mermaid');
    mermaidElements.forEach(element => {
      element.removeAttribute('data-processed');
    });
    window.mermaid.init();
  }
}

// Toggle between light and dark themes
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  setTheme(getPreferredTheme());
  
  // Initialize Mermaid with the current theme
  if (window.mermaid) {
    window.mermaid.initialize({ 
      startOnLoad: true,
      theme: getPreferredTheme() === 'dark' ? 'dark' : 'base',
      themeVariables: {
        primaryColor: '#ffd700',
        primaryTextColor: getPreferredTheme() === 'dark' ? '#e5e5e5' : '#1a1a1a',
        primaryBorderColor: getPreferredTheme() === 'dark' ? '#404040' : '#e5e5e5',
        lineColor: getPreferredTheme() === 'dark' ? '#888888' : '#666666'
      }
    });
  }
});

// Listen for system theme preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Expose the toggle function globally for use with onclick events
window.toggleTheme = toggleTheme;
