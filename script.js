// State management
const states = {
    1: {
        title: "Breakthrough Haptic Technology",
        description: "This breakthrough transducer integrates human skin as a central mechanical component, creating the first energy-recovering haptic actuator. By leveraging skin's natural elasticity, the device achieves bistable operation with 285% greater energy efficiency than conventional approaches. The electromagnetic mechanism delivers forces up to 1.4 N with displacements exceeding 2 mm, targeting specific mechanoreceptor classes for precise tactile sensations. This bio-integrated approach fundamentally reimagines the interface between technology and human sensory perception.",
        buttons: [
            { id: "exploreDesign", text: "Explore Design", target: 2 },
            { id: "viewApplications", text: "View Applications", target: 4 }
        ],
        image: "assets/animations/state-static/state1_static.webp"
    },
    2: {
        title: "Precision Engineering",
        description: "The transducer's sophisticated design features rare-earth neodymium magnets, soft ferromagnetic cores, and precision-machined titanium components. This electromagnetic architecture enables bistable operation through careful mechanical integration with human skin. The device switches between compressed and relaxed states using minimal current pulses, storing and recovering elastic energy from skin deformation. Each component is optimized for maximum efficiency while maintaining biocompatibility and long-term reliability.",
        buttons: [
            { id: "backToStart", text: "Back to Start", target: 1 },
            { id: "exploreMechanics", text: "Explore Mechanics", target: 3 }
        ],
        image: "assets/animations/state-static/state2_static.webp"
    },
    4: {
        title: "Scalable Haptic Arrays",
        description: "Multiple transducers integrate into flexible arrays capable of rendering complex spatial patterns across the skin. The wireless control system coordinates up to 19 individual units, each operating independently to create rich tactile experiences. A compact battery powers the entire array for over 3 hours of continuous operation. This scalable architecture enables applications ranging from sensory substitution for the visually impaired to immersive virtual reality interfaces.",
        buttons: [
            { id: "backToStart", text: "Back to Start", target: 1 },
            { id: "seeDemo", text: "See Demo", target: 5 }
        ],
        image: "assets/animations/state-static/state4_static.webp"
    }
};

// Animation paths - only forward animations needed
const animations = {
    "1-2": "assets/animations/state1-to-state2.webm",
    "1-4": "assets/animations/state1-to-state4.webm"
};

// Current state
let currentState = 1;
let isTransitioning = false;

// DOM elements
const stateVisual = document.getElementById('stateVisual');
const stateAnimation = document.getElementById('stateAnimation');
const textContent = document.querySelector('.text-content');
const mainTitle = document.querySelector('.main-title');
const description = document.querySelector('.description');
const buttonGroup = document.querySelector('.button-group');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupButtonListeners();
    preloadAnimations();
});

// Setup button listeners
function setupButtonListeners() {
    buttonGroup.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-button') && !isTransitioning) {
            const button = e.target;
            const targetState = states[currentState].buttons.find(b => b.id === button.id)?.target;
            if (targetState) {
                transitionToState(targetState);
            }
        }
    });
}

// Preload animations for smooth playback
function preloadAnimations() {
    Object.entries(animations).forEach(([key, path]) => {
        const video = document.createElement('video');
        video.src = path;
        video.preload = 'auto';
    });
}

// Main transition function
async function transitionToState(targetState) {
    if (isTransitioning || targetState === currentState) return;
    
    isTransitioning = true;
    
    // Determine if we need to play forward or use instant transition
    let animationPath;
    let useInstantTransition = false;
    
    if (currentState === 1) {
        // Going forward from state 1
        animationPath = animations[`${currentState}-${targetState}`];
    } else if (targetState === 1) {
        // Going back to state 1 - use instant transition
        useInstantTransition = true;
    } else {
        console.warn(`No direct animation path from state ${currentState} to ${targetState}`);
        isTransitioning = false;
        return;
    }
    
    if (!animationPath && !useInstantTransition) {
        console.warn(`Animation not found for transition`);
        isTransitioning = false;
        return;
    }
    
    try {
        if (useInstantTransition) {
            // Instant transition for going back
            await instantTransition(targetState);
        } else {
            // Play forward animation
            await playTransitionAnimation(animationPath, targetState);
        }
        
        // Fade out current content
        textContent.classList.add('fade-out');
        
        // Wait for fade out
        await wait(300);
        
        // Update content
        updateContent(targetState);
        
        // Update state
        currentState = targetState;
        
        // Fade in new content
        textContent.classList.remove('fade-out');
        
    } catch (error) {
        console.error('Transition error:', error);
    } finally {
        isTransitioning = false;
    }
}

// Instant transition (for reverse navigation)
function instantTransition(targetState) {
    return new Promise((resolve) => {
        const newState = states[targetState];
        if (newState && newState.image) {
            // Preload the new image
            const tempImg = new Image();
            tempImg.onload = () => {
                stateVisual.src = tempImg.src;
                resolve();
            };
            tempImg.src = newState.image;
        } else {
            resolve();
        }
    });
}

// Check browser support for reverse playback
function supportsReversePlayback() {
    const video = document.createElement('video');
    return 'playbackRate' in video;
}

// Play transition animation (forward only)
function playTransitionAnimation(animationPath, targetState) {
    return new Promise((resolve, reject) => {
        // Set the video source
        stateAnimation.src = animationPath;
        
        stateAnimation.onloadedmetadata = () => {
            // Reset to beginning
            stateAnimation.currentTime = 0;
            stateAnimation.playbackRate = 1;
            
            // Make video visible instantly (no fade)
            stateAnimation.classList.add('playing');
            
            // Play the video
            stateAnimation.play().catch(err => {
                console.error('Playback error:', err);
                updateToTargetImage();
            });
        };
        
        // When video ends
        stateAnimation.onended = () => {
            updateToTargetImage();
        };
        
        function updateToTargetImage() {
            const newState = states[targetState];
            if (newState && newState.image) {
                // Preload the new image before switching
                const tempImg = new Image();
                tempImg.onload = () => {
                    stateVisual.src = tempImg.src;
                    // Hide video after image is ready
                    setTimeout(() => {
                        stateAnimation.classList.remove('playing');
                        resolve();
                    }, 50); // Small delay to ensure smooth transition
                };
                tempImg.src = newState.image;
            } else {
                stateAnimation.classList.remove('playing');
                resolve();
            }
        }
        
        stateAnimation.onerror = () => {
            reject(new Error('Animation failed to load'));
        };
    });
}

// Update content based on state
function updateContent(stateId) {
    const state = states[stateId];
    if (!state) return;
    
    // Update text
    mainTitle.textContent = state.title;
    description.textContent = state.description;
    
    // Update buttons
    buttonGroup.innerHTML = '';
    state.buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = 'action-button';
        btn.id = button.id;
        btn.textContent = button.text;
        buttonGroup.appendChild(btn);
    });
}

// Utility function for delays
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Handle back button navigation
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.stateId) {
        transitionToState(event.state.stateId);
    }
});

// Note: Reverse video playback may not work in all browsers
// Safari has the best support, Chrome/Firefox may have issues
// The fallback will just switch to the target image without animation