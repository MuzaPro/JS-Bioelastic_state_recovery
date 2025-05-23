// Global configuration for Bioelastic State Recovery Platform
const CONFIG = {
    // Project info
    PROJECT_NAME: 'Bioelastic State Recovery',
    VERSION: '1.0.0',
    
    // States definition
    STATES: {
        1: { 
            name: 'transducer-on-hand', 
            title: 'Breakthrough Haptic Technology',
            content: 'Revolutionary bistable transducer that stores energy in compressed skin, requiring power only during state transitions.'
        },
        2: { 
            name: 'exploded-view', 
            title: 'Precision Engineering',
            content: 'Permanent magnets and electromagnets work together to drive the titanium rod that contacts the skin.'
        },
        3: { 
            name: 'force-diagram', 
            title: 'Interactive Bistable Mechanics',
            content: 'Push the transducer up and down to see how magnetic forces balance skin elasticity in real-time.'
        },
        4: { 
            name: 'array-configuration', 
            title: 'Scalable Haptic Arrays',
            content: 'Hexagonal arrays with 1.3cm pitch enable complex spatial information patterns across body surfaces.'
        },
        5: { 
            name: 'sensory-demo', 
            title: 'Assistive Technology in Action',
            content: 'LiDAR-guided navigation translates visual information into intuitive haptic feedback patterns.'
        }
    },
    
    // Navigation rules
    NAVIGATION: {
        1: [2, 4], // State 1 can go to State 2 or 4
        2: [1, 3], // State 2 can go to State 1 or 3  
        3: [1, 2], // State 3 can go to State 1 or 2
        4: [1, 5], // State 4 can go to State 1 or 5
        5: [1, 4]  // State 5 can go to State 1 or 4
    },
    
    // Transition animations
    TRANSITIONS: {
        '1-2': 'state1-to-state2.webm',
        '2-3': 'state2-to-state3.webm', 
        '1-4': 'state1-to-state4.webm',
        '4-5': 'state4-to-state5.webm'
    },
    
    // Animation settings
    ANIMATION: {
        DURATION: 1000, // 1 second
        FPS: 25,
        PATH: 'assets/animations/'
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
