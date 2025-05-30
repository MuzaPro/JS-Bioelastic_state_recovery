// State management
const states = {
    1: {
        title: "Breakthrough Haptic Technology",
        description: "This breakthrough transducer integrates human skin as a central mechanical component, creating the first energy-recovering haptic actuator. By leveraging skin's natural elasticity, the device achieves bistable operation with 285% greater energy efficiency than conventional approaches. The electromagnetic mechanism delivers forces up to 1.4 N with displacements exceeding 2 mm, targeting specific mechanoreceptor classes for precise tactile sensations. This bio-integrated approach fundamentally reimagines the interface between technology and human sensory perception.",
        image: "assets/animations/state-static/state1_static.webp"
    },
    2: {
        title: "Precision Engineering",
        description: "The transducer's sophisticated design features rare-earth neodymium magnets, soft ferromagnetic cores, and precision-machined titanium components. This electromagnetic architecture enables bistable operation through careful mechanical integration with human skin. The device switches between compressed and relaxed states using minimal current pulses, storing and recovering elastic energy from skin deformation. Each component is optimized for maximum efficiency while maintaining biocompatibility and long-term reliability.",
        image: "assets/animations/state-static/state2_static.webp"
    },
    3: {
        title: "Force Distribution",
        description: "The transducer generates precisely controlled forces that interact with multiple layers of skin tissue. This mechanical stimulation activates specific mechanoreceptors at different depths, creating distinct tactile sensations. The bistable design allows the device to maintain either state with zero power consumption, requiring energy only during state transitions. This fundamental reimagining of haptic actuation results in unprecedented energy efficiency while delivering high-fidelity tactile feedback.",
        image: "assets/animations/state-static/state3-static.webp"  // Updated hyphen instead of underscore
    },
    4: {
        title: "Scalable Haptic Arrays",
        description: "Multiple transducers integrate into flexible arrays capable of rendering complex spatial patterns across the skin. The wireless control system coordinates up to 19 individual units, each operating independently to create rich tactile experiences. A compact battery powers the entire array for over 3 hours of continuous operation. This scalable architecture enables applications ranging from sensory substitution for the visually impaired to immersive virtual reality interfaces.",
        image: "assets/animations/state-static/state4_static.webp"
    },
    5: {
        title: "Sensory Feedback",
        description: "User studies demonstrate the transducer's ability to create distinguishable tactile sensations with high spatial and temporal resolution. Participants successfully identified complex patterns rendered by the haptic array with over 95% accuracy after minimal training. The device's energy-efficient operation allows for extended use without discomfort or skin irritation. This technology opens new possibilities for human-machine interfaces, sensory augmentation, and medical applications requiring precise tactile feedback.",
        image: "assets/animations/state-static/state5_static.webp"
    }
};

// Update animations object to only include files that actually exist
const animations = {
    "1-2": "assets/animations/state1-to-state2.webm",
    "2-1": "assets/animations/state2-to-state1.webm",
    "1-4": "assets/animations/state1-to-state4.webm",
    "4-1": "assets/animations/state4-to-state1.webm",
    "2-3": "assets/animations/state2-to-state3.webm",
    "3-2": "assets/animations/state3-to-state2.webm",
    "2-4": "assets/animations/state2-to-state4.webm",
    "4-2": "assets/animations/state4-to-state2.webm"
    // Removed non-existent animation files
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
const navLinks = document.querySelectorAll('.state-link');

// Initialise
document.addEventListener('DOMContentLoaded', () => {
    setupNavListeners();
    preloadAnimations();
    updateActiveNav();
});

// Setup nav listeners
function setupNavListeners() {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = Number(link.dataset.state);
            if (!isTransitioning && target !== currentState) {
                transitionToState(target);
            }
        });
    });
}

// Update active nav state
function updateActiveNav() {
    navLinks.forEach(link =>
        link.classList.toggle('active', Number(link.dataset.state) === currentState)
    );
}

// Pre‑load all animations for smooth playback
function preloadAnimations() {
    Object.values(animations).forEach(path => {
        const video = document.createElement('video');
        video.src = path;
        video.preload = 'auto';
        // Add error handling to prevent console errors
        video.onerror = () => {
            console.warn(`Unable to preload animation: ${path}`);
        };
    });
}

// Main transition function
async function transitionToState(targetState) {
    if (isTransitioning || targetState === currentState) return;

    isTransitioning = true;

    const key = `${currentState}-${targetState}`;
    const animationPath = animations[key];
    
    try {
        // Check if we need a compound transition
        if (!animationPath) {
            // For state 1-3 transitions, go through state 2
            if ((currentState === 1 && targetState === 3) || 
                (currentState === 3 && targetState === 1)) {
                console.log(`Using compound transition: ${currentState} → 2 → ${targetState}`);
                await performCompoundTransition(currentState, 2, targetState);
            } 
            // For state 3-4 or 3-5 transitions, also go through state 2
            else if ((currentState === 3 && (targetState === 4 || targetState === 5)) ||
                     ((currentState === 4 || currentState === 5) && targetState === 3)) {
                console.log(`Using compound transition: ${currentState} → 2 → ${targetState}`);
                await performCompoundTransition(currentState, 2, targetState);
            }
            else {
                // Fallback to instant transition if no animation path exists
                console.log(`No animation found for transition ${currentState}-${targetState}, using instant transition`);
                await instantTransition(targetState);
            }
        } else {
            // Direct transition animation exists
            console.log(`Playing direct transition: ${currentState} → ${targetState}`);
            await playTransitionAnimation(animationPath, targetState);
        }

        // Fade out current content
        textContent.classList.add('fade-out');
        await wait(300);

        // Update content
        updateContent(targetState);

        // Update state
        currentState = targetState;

        // Update nav state
        updateActiveNav();

        // Fade in new content
        textContent.classList.remove('fade-out');
    } catch (error) {
        console.error('Transition error:', error);
        // Recovery in case of error - still update the content
        updateContent(targetState);
        currentState = targetState;
        updateActiveNav();
        textContent.classList.remove('fade-out');
    } finally {
        isTransitioning = false;
    }
}

// New function to handle compound transitions through an intermediate state
async function performCompoundTransition(fromState, intermediateState, toState) {
    console.log(`Starting compound transition: ${fromState} → ${intermediateState} → ${toState}`);
    
    try {
        // First transition: from current to intermediate
        const firstKey = `${fromState}-${intermediateState}`;
        const firstAnimation = animations[firstKey];
        
        // Only update the visual, not the content yet
        if (firstAnimation) {
            await playTransitionAnimation(firstAnimation, intermediateState);
            console.log(`First leg complete: ${fromState} → ${intermediateState}`);
        } else {
            await instantTransition(intermediateState);
            console.log(`First leg complete (instant): ${fromState} → ${intermediateState}`);
        }
        
        // Brief pause between animations
        await wait(100);
        
        // Second transition: from intermediate to target
        const secondKey = `${intermediateState}-${toState}`;
        const secondAnimation = animations[secondKey];
        
        if (secondAnimation) {
            await playTransitionAnimation(secondAnimation, toState);
            console.log(`Second leg complete: ${intermediateState} → ${toState}`);
        } else {
            await instantTransition(toState);
            console.log(`Second leg complete (instant): ${intermediateState} → ${toState}`);
        }
        
        console.log(`Compound transition complete: ${fromState} → ${intermediateState} → ${toState}`);
    } catch (error) {
        console.error('Error in compound transition:', error);
        // Fallback to direct instant transition in case of error
        await instantTransition(toState);
    }
}

// Instant transition (fallback when no animation provided)
function instantTransition(targetState) {
    return new Promise((resolve) => {
        const newState = states[targetState];
        if (newState && newState.image) {
            const tempImg = new Image();
            tempImg.onload = () => {
                stateVisual.src = tempImg.src;
                resolve();
            };
            tempImg.onerror = () => {
                console.warn(`Failed to load image: ${newState.image}`);
                // Fallback to a generic image or just resolve
                resolve();
            };
            tempImg.src = newState.image;
        } else {
            resolve();
        }
    });
}

// Play transition animation
function playTransitionAnimation(animationPath, targetState) {
    return new Promise((resolve, reject) => {
        stateAnimation.src = animationPath;

        stateAnimation.onloadedmetadata = () => {
            stateAnimation.currentTime = 0;
            stateAnimation.playbackRate = 1;

            // Show the video instantly
            stateAnimation.classList.add('playing');
            stateAnimation
                .play()
                .catch(err => {
                    console.error('Playback error:', err);
                    updateToTargetImage();
                });
        };

        stateAnimation.onended = () => {
            updateToTargetImage();
        };

        stateAnimation.onerror = () => {
            console.error(`Failed to load animation: ${animationPath}`);
            // Fallback to instant transition
            instantTransition(targetState).then(resolve).catch(reject);
        };

        function updateToTargetImage() {
            const newState = states[targetState];
            if (newState && newState.image) {
                const tempImg = new Image();
                tempImg.onload = () => {
                    stateVisual.src = tempImg.src;
                    setTimeout(() => {
                        stateAnimation.classList.remove('playing');
                        resolve();
                    }, 50);
                };
                tempImg.onerror = () => {
                    console.warn(`Failed to load image: ${newState.image}`);
                    stateAnimation.classList.remove('playing');
                    resolve();
                };
                tempImg.src = newState.image;
            } else {
                stateAnimation.classList.remove('playing');
                resolve();
            }
        }
    });
}

// Update text content for a given state
function updateContent(stateId) {
    const state = states[stateId];
    if (!state) return;

    mainTitle.textContent = state.title;
    description.textContent = state.description;
}

// Utility delay
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state?.stateId !== undefined) {
        transitionToState(event.state.stateId);
    }
});

/* 
 * Notes:
 * - Reverse transitions are provided as separate WebM files to ensure full
 *   cross‑browser compatibility. No runtime reverse playback is attempted.
 * - If a particular transition video is missing, the code gracefully falls back
 *   to an instant static image swap.
 */
