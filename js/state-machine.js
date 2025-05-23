// State Machine for Bioelastic State Recovery Platform

class StateMachine {
    constructor() {
        this.currentState = 1;
        this.isTransitioning = false;
        this.init();
    }
    
    init() {
        this.setupUI();
        this.bindEvents();
        this.showState(1);
        console.log('🎯 State Machine initialized');
    }
    
    setupUI() {
        // Create state containers
        const app = document.getElementById('app');
        if (!app) return;
        
        // Clear loading screen after setup
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            document.getElementById('state-container')?.classList.remove('hidden');
            document.getElementById('state-nav')?.classList.remove('hidden');
        }, 500);
    }
    
    bindEvents() {
        // Navigation button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-transition]')) {
                e.preventDefault();
                const targetState = parseInt(e.target.dataset.transition);
                this.transitionTo(targetState);
            }
        });
        
        // Browser navigation (back/forward buttons)
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.appState) {
                this.showState(e.state.appState, false);
            }
        });
    }
    
    transitionTo(targetState) {
        if (this.isTransitioning || targetState === this.currentState) return;
        
        // Check if transition is valid
        const validTransitions = CONFIG.NAVIGATION[this.currentState];
        if (!validTransitions.includes(targetState)) {
            console.warn(`Invalid transition: ${this.currentState} -> ${targetState}`);
            return;
        }
        
        this.isTransitioning = true;
        
        // Play transition animation
        this.playTransition(this.currentState, targetState, () => {
            this.showState(targetState);
            this.isTransitioning = false;
        });
    }
    
    playTransition(fromState, toState, callback) {
        const transitionKey = `${fromState}-${toState}`;
        const reverseKey = `${toState}-${fromState}`;
        
        // Check if we have this transition or its reverse
        let animationFile = CONFIG.TRANSITIONS[transitionKey];
        let playReverse = false;
        
        if (!animationFile) {
            animationFile = CONFIG.TRANSITIONS[reverseKey];
            playReverse = true;
        }
        
        if (animationFile) {
            window.animationPlayer.play(animationFile, playReverse, callback);
        } else {
            // No animation, just transition immediately
            console.log(`No animation for ${fromState} -> ${toState}`);
            callback();
        }
    }
    
    showState(stateNum, updateHistory = true) {
        // Hide all states
        document.querySelectorAll('.state').forEach(state => {
            state.classList.remove('active');
        });
        
        // Show target state
        const targetState = document.getElementById(`state${stateNum}`);
        if (targetState) {
            targetState.classList.add('active');
        }
        
        // Update navigation buttons
        this.updateNavigation(stateNum);
        
        // Update URL
        if (updateHistory) {
            const url = stateNum === 1 ? '/' : `/state${stateNum}`;
            history.pushState({ appState: stateNum }, '', url);
        }
        
        // Update current state
        this.currentState = stateNum;
        
        console.log(`📍 Now in State ${stateNum}: ${CONFIG.STATES[stateNum].title}`);
    }
    
    updateNavigation(currentState) {
        const navContainer = document.getElementById('state-nav');
        if (!navContainer) return;
        
        const validTransitions = CONFIG.NAVIGATION[currentState];
        
        // Clear existing navigation
        navContainer.innerHTML = '';
        
        // Add navigation buttons for valid transitions
        validTransitions.forEach(targetState => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.dataset.transition = targetState;
            
            // Button text based on target state
            const buttonText = this.getButtonText(currentState, targetState);
            button.textContent = buttonText;
            
            navContainer.appendChild(button);
        });
    }
    
    getButtonText(fromState, toState) {
        // Define button labels based on transitions
        const labels = {
            '1-2': 'Explore Design',
            '1-4': 'View Array', 
            '2-1': 'Back to Start',
            '2-3': 'Explore Functionality',
            '3-1': 'Back to Start',
            '3-2': 'Back to Design',
            '4-1': 'Back to Start',
            '4-5': 'Demo Application',
            '5-1': 'Back to Start',
            '5-4': 'Back to Array'
        };
        
        return labels[`${fromState}-${toState}`] || `Go to State ${toState}`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.stateMachine = new StateMachine();
});
