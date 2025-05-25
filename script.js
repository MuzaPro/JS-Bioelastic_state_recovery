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
        image: "assets/animations/state-static/state3_static.webp"
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

const animations = {
    "1-2": "assets/animations/state1-to-state2.webm",
    "2-1": "assets/animations/state2-to-state1.webm",
    "1-4": "assets/animations/state1-to-state4.webm",
    "4-1": "assets/animations/state4-to-state1.webm",
    "1-3": "assets/animations/state1-to-state3.webm",
    "3-1": "assets/animations/state3-to-state1.webm",
    "2-3": "assets/animations/state2-to-state3.webm",
    "3-2": "assets/animations/state3-to-state2.webm",
    "3-4": "assets/animations/state3-to-state4.webm",
    "4-3": "assets/animations/state4-to-state3.webm",
    "4-5": "assets/animations/state4-to-state5.webm",
    "5-4": "assets/animations/state5-to-state4.webm",
    "1-5": "assets/animations/state1-to-state5.webm",
    "5-1": "assets/animations/state5-to-state1.webm",
    "2-5": "assets/animations/state2-to-state5.webm",
    "5-2": "assets/animations/state5-to-state2.webm",
    "3-5": "assets/animations/state3-to-state5.webm",
    "5-3": "assets/animations/state5-to-state3.webm"
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
    });
}

// Main transition function
async function transitionToState(targetState) {
    if (isTransitioning || targetState === currentState) return;

    isTransitioning = true;

    const key = `${currentState}-${targetState}`;
    const animationPath = animations[key];
    const useInstantTransition = !animationPath;

    try {
        if (useInstantTransition) {
            await instantTransition(targetState);
        } else {
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
    } finally {
        isTransitioning = false;
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
            reject(new Error('Animation failed to load'));
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
