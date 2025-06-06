// State Machine Animation Script
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
        image: "assets/animations/state-static/state3-static.webp",
        hasSubstate: true,
        currentSubstate: "A"
    },
    "3B": {
        title: "Force Distribution", // Same title as state 3
        description: "The transducer generates precisely controlled forces that interact with multiple layers of skin tissue. This mechanical stimulation activates specific mechanoreceptors at different depths, creating distinct tactile sensations. The bistable design allows the device to maintain either state with zero power consumption, requiring energy only during state transitions. This fundamental reimagining of haptic actuation results in unprecedented energy efficiency while delivering high-fidelity tactile feedback.", // Same description as state 3
        image: "assets/animations/state-static/state3b-static.webp",
        hasSubstate: true,
        currentSubstate: "B"
    },
    4: {
        title: "Scalable Haptic Arrays",
        description: "Multiple transducers integrate into flexible arrays capable of rendering complex spatial patterns across the skin. The wireless control system coordinates up to 19 individual units, each operating independently to create rich tactile experiences. A compact battery powers the entire array for over 3 hours of continuous operation. This scalable architecture enables applications ranging from sensory substitution for the visually impaired to immersive virtual reality interfaces.",
        image: "assets/animations/state-static/state4_static.webp",
        contextImage: "assets/images/Device_on_neck.jpeg" // Added context image
    },
    5: {
        title: "Sensory Feedback",
        description: "User studies demonstrate the transducer's ability to create distinguishable tactile sensations with high spatial and temporal resolution. Participants successfully identified complex patterns rendered by the haptic array with over 95% accuracy after minimal training. The device's energy-efficient operation allows for extended use without discomfort or skin irritation. This technology opens new possibilities for human-machine interfaces, sensory augmentation, and medical applications requiring precise tactile feedback.",
        image: "assets/images/use-case-1.webp"
        // contextImage: "path/to/another/image.jpg" // Uncomment and set path if context image needed
    }
};

// Update animations object to include the new substate transitions
const animations = {
    "1-2": "assets/animations/state1-to-state2.webm",
    "2-1": "assets/animations/state2-to-state1.webm",
    "1-4": "assets/animations/state1-to-state4.webm",
    "4-1": "assets/animations/state4-to-state1.webm",
    "2-3": "assets/animations/state2-to-state3.webm",
    "3-2": "assets/animations/state3-to-state2.webm",
    "2-4": "assets/animations/state2-to-state4.webm",
    "4-2": "assets/animations/state4-to-state2.webm",
    "3-3B": "assets/animations/3Ato3B.webm",
    "3B-3": "assets/animations/3Bto3A.webm"
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
    // Setup click navigation on visuals
    setupVisualClickNavigation();
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
function updateActiveNav(stateToHighlight = currentState) {
    navLinks.forEach(link => {
        // For state 3B, highlight the state 3 nav button
        if (stateToHighlight === "3B" && Number(link.dataset.state) === 3) {
            link.classList.add('active');
        } else {
            // Normal numeric comparison for other states
            link.classList.toggle('active', Number(link.dataset.state) === stateToHighlight);
        }
    });
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
    
    // Immediately update the active nav
    updateActiveNav(targetState);
    
    // Start fading out text content immediately
    textContent.classList.add('fade-out');
    
    const key = `${currentState}-${targetState}`;
    const animationPath = animations[key];
    
    try {
        // Handle different transition cases
        if (currentState === "3B") {
            if (targetState === 3) {
                // Direct transition from 3B to 3
                await playTransitionAnimation(animations["3B-3"], targetState);
            } 
            else if (targetState === 2) {
                // Double transition: 3B → 3 → 2
                await performCompoundTransition("3B", 3, targetState);
            }
            else if (targetState === 5) {
                // Direct cut to state 5 - no animation
                await wait(150);
                updateContent(targetState);
                textContent.classList.remove('fade-out');
                await instantTransition(targetState);
            }
            else if (targetState === 1 || targetState === 4) {
                // Triple transition: 3B → 3 → 2 → target
                await performTripleTransition("3B", 3, 2, targetState);
            }
            else {
                // Fallback for any other targets
                await performCompoundTransition("3B", 3, targetState);
            }
        }
        else if (!animationPath) {
            // Handle other compound transitions
            if ((currentState === 1 && targetState === 3) || 
                (currentState === 3 && targetState === 1)) {
                await performCompoundTransition(currentState, 2, targetState);
            } 
            else if ((currentState === 3 && (targetState === 4 || targetState === 5)) ||
                     ((currentState === 4 || currentState === 5) && targetState === 3)) {
                await performCompoundTransition(currentState, 2, targetState);
            }
            else {
                // For instant transitions, handle text update directly
                await wait(150);
                updateContent(targetState);
                textContent.classList.remove('fade-out');
                await instantTransition(targetState);
            }
        } else {
            // Let the animation function handle text timing
            await playTransitionAnimation(animationPath, targetState);
        }

        // Update state
        currentState = targetState;

    } catch (error) {
        console.error('Transition error:', error);
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
    try {
        // First transition - skip text update
        const firstKey = `${fromState}-${intermediateState}`;
        const firstAnimation = animations[firstKey];
        
        if (firstAnimation) {
            await playTransitionAnimation(firstAnimation, intermediateState, false);
        } else {
            await instantTransition(intermediateState);
        }
        
        // Reduce pause between animations
        await wait(50);
        
        // Second transition - update text
        const secondKey = `${intermediateState}-${toState}`;
        const secondAnimation = animations[secondKey];
        
        if (secondAnimation) {
            await playTransitionAnimation(secondAnimation, toState, true);
        } else {
            // For direct jumps, update text manually
            updateContent(toState);
            textContent.classList.remove('fade-out');
            await instantTransition(toState);
        }
    } catch (error) {
        console.error('Error in compound transition:', error);
        await instantTransition(toState);
    }
}

// Similarly update the triple transition function
async function performTripleTransition(fromState, firstIntermediate, secondIntermediate, toState) {
    try {
        // First two transitions - skip text updates
        const firstKey = `${fromState}-${firstIntermediate}`;
        const firstAnimation = animations[firstKey];
        
        if (firstAnimation) {
            await playTransitionAnimation(firstAnimation, firstIntermediate, false);
        } else {
            await instantTransition(firstIntermediate);
        }
        
        await wait(50);
        
        const secondKey = `${firstIntermediate}-${secondIntermediate}`;
        const secondAnimation = animations[secondKey];
        
        if (secondAnimation) {
            await playTransitionAnimation(secondAnimation, secondIntermediate, false);
        } else {
            await instantTransition(secondIntermediate);
        }
        
        await wait(50);
        
        // Final transition - update text
        const thirdKey = `${secondIntermediate}-${toState}`;
        const thirdAnimation = animations[thirdKey];
        
        if (thirdAnimation) {
            await playTransitionAnimation(thirdAnimation, toState, true);
        } else {
            // Update text manually for the final state
            updateContent(toState);
            textContent.classList.remove('fade-out');
            await instantTransition(toState);
        }
    } catch (error) {
        console.error('Error in triple transition:', error);
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

// Modify the playTransitionAnimation function to begin text transition earlier
function playTransitionAnimation(animationPath, targetState, updateTextContent = true) {
    return new Promise((resolve, reject) => {
        stateAnimation.src = animationPath;

        stateAnimation.onloadedmetadata = () => {
            stateAnimation.currentTime = 0;
            stateAnimation.playbackRate = 1;
            
            // Only update text if specified
            if (updateTextContent) {
                // Calculate when to start text transition (around 70% into the animation)
                const videoDuration = stateAnimation.duration * 1000; // in milliseconds
                const textStartTime = Math.max(videoDuration * 0.7, 300); // at least 300ms
                
                // Start a timer to update text before animation ends
                setTimeout(() => {
                    // Update content and start fade-in while animation is still playing
                    updateContent(targetState);
                    textContent.classList.remove('fade-out');
                }, textStartTime);
            }

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

// New function to toggle between substates for state 3
async function toggleState3Substate() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    console.log("Before toggle - Current state:", currentState, "Type:", typeof currentState);
    
    try {
        // Fix: Ensure we're using the right type for states
        let targetSubstate;
        if (currentState === 3) {
            targetSubstate = "3B";
        } else {
            // Important: Convert string "3" to number 3
            targetSubstate = 3;  // This must be number 3, not string "3"
        }
        
        console.log(`Toggling state 3 substate to: ${targetSubstate}, Type: ${typeof targetSubstate}`);
        
        // Play transition animation
        const key = `${currentState}-${targetSubstate}`;
        const animationPath = animations[key];
        
        if (animationPath) {
            await playTransitionAnimation(animationPath, targetSubstate);
        } else {
            await instantTransition(targetSubstate);
        }
        
        // Update state (but not content since title and description stay the same)
        currentState = targetSubstate;
        console.log("After toggle - Current state:", currentState, "Type:", typeof currentState);
        
        // Update active nav state - state 3 remains highlighted
        updateActiveNav();
        
    } catch (error) {
        console.error('Substate transition error:', error);
    } finally {
        isTransitioning = false;
    }
}

// Update content for a given state
function updateContent(stateId) {
    const state = states[stateId];
    if (!state) return;

    mainTitle.textContent = state.title;
    description.textContent = state.description;
    
    // Handle context image
    const contextImageContainer = document.querySelector('.context-image-container');
    
    // If there's a context image for this state
    if (state.contextImage) {
        // Create/update the image
        let contextImage = contextImageContainer.querySelector('.context-image');
        if (!contextImage) {
            contextImage = document.createElement('img');
            contextImage.className = 'context-image';
            contextImageContainer.appendChild(contextImage);
        }
        
        // Set or update the image source with fade effect
        if (contextImage.src !== state.contextImage) {
            contextImageContainer.classList.add('fade-out');
            setTimeout(() => {
                contextImage.src = state.contextImage;
                contextImage.onload = () => {
                    contextImageContainer.classList.remove('fade-out');
                };
            }, 150);
        }
    } else {
        // If this state doesn't have a context image, clear the container
        contextImageContainer.innerHTML = '';
    }
    
    // Existing code for switch button
    const existingSwitchBtn = document.querySelector('.switch-btn');
    if (existingSwitchBtn) {
        existingSwitchBtn.remove();
    }
    
    if (state.hasSubstate) {
        const switchBtn = document.createElement('button');
        switchBtn.className = 'switch-btn';
        switchBtn.textContent = 'Switch';
        switchBtn.addEventListener('click', toggleState3Substate);
        
        description.insertAdjacentElement('afterend', switchBtn);
    }
}

// Modify the setupVisualClickNavigation function to keep state 3/3B in a loop
function setupVisualClickNavigation() {
    const visualContent = document.querySelector('.visual-content');
    
    visualContent.addEventListener('click', () => {
        if (isTransitioning) return;
        
        let nextState;
        
        // Determine next state based on current state
        switch(currentState) {
            case 1:
                nextState = 2;
                break;
            case 2:
                nextState = 3;
                break;
            case 3:
                // Toggle to 3B and stay in this case for future clicks
                toggleState3Substate();
                return;
            case "3B":
                // Toggle back to 3 and stay in this case for future clicks
                toggleState3Substate();
                return;
            case 4:
                nextState = 5;
                break;
            case 5:
                nextState = 1;
                break;
            default:
                nextState = 1;
        }
        
        // Regular transition for non-3/3B states
        transitionToState(nextState);
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
