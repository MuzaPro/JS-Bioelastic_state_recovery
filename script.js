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

const animations = {
    "1-2": "assets/animations/state1-to-state2.webm",
    "2-1": "assets/animations/state2-to-state1.webm",
    "1-4": "assets/animations/state1-to-state4.webm",
    "4-1": "assets/animations/state4-to-state1.webm"
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

// Initialise
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

// Update text/buttons for a given state
function updateContent(stateId) {
    const state = states[stateId];
    if (!state) return;

    mainTitle.textContent = state.title;
    description.textContent = state.description;

    buttonGroup.innerHTML = '';
    state.buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = 'action-button';
        btn.id = button.id;
        btn.textContent = button.text;
        buttonGroup.appendChild(btn);
    });
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
