// Global configuration for the Bioelastic State Recovery Interactive Platform
const CONFIG = {
    // Project info
    PROJECT_NAME: 'Bioelastic State Recovery',
    VERSION: '1.0.0',
    
    // Animation settings
    ANIMATION: {
        FPS: 25,
        FRAME_EXTENSION: '.webp',
        FRAME_PADDING: 8, // Number of digits in frame names
        PRELOAD_ENABLED: true
    },
    
    // State machine settings
    STATES: {
        1: { name: 'transducer-on-hand', title: 'Breakthrough Haptic Technology' },
        2: { name: 'exploded-view', title: 'Precision Engineering' },
        3: { name: 'force-diagram', title: 'Interactive Bistable Mechanics' },
        4: { name: 'array-configuration', title: 'Scalable Haptic Arrays' },
        5: { name: 'sensory-demo', title: 'Assistive Technology in Action' }
    },
    
    // Transition definitions
    TRANSITIONS: {
        '1-2': 'state1-to-state2',
        '2-3': 'state2-to-state3', 
        '1-4': 'state1-to-state4',
        '4-5': 'state4-to-state5'
    },
    
    // Performance settings
    PERFORMANCE: {
        PRELOAD_BUFFER_SIZE: 3, // Number of states to preload ahead
        LAZY_LOAD_THRESHOLD: 2000, // ms delay before loading non-critical assets
        CACHE_DURATION: 3600000 // 1 hour in milliseconds
    },
    
    // Academic citation
    PUBLICATION: {
        DOI: 'https://doi.org/10.1038/s41586-024-08155-9',
        TITLE: 'Bioelastic state recovery for haptic sensory substitution',
        JOURNAL: 'Nature'
    }
};

// Make config globally available
window.CONFIG = CONFIG;
