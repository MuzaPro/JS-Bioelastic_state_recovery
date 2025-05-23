// Animation Player for Bioelastic State Recovery Platform

class AnimationPlayer {
    constructor() {
        this.currentVideo = null;
        this.init();
    }
    
    init() {
        this.createVideoElement();
        console.log('🎬 Animation Player initialized');
    }
    
    createVideoElement() {
        // Create video element for transitions
        const video = document.createElement('video');
        video.id = 'transition-video';
        video.className = 'transition-video hidden';
        video.muted = true; // Required for autoplay
        video.preload = 'metadata';
        
        // Add to DOM
        const app = document.getElementById('app');
        if (app) {
            app.appendChild(video);
        }
        
        this.currentVideo = video;
    }
    
    play(animationFile, reverse = false, callback = null) {
        if (!this.currentVideo) return;
        
        const videoPath = CONFIG.ANIMATION.PATH + animationFile;
        
        console.log(`🎬 Playing: ${animationFile}${reverse ? ' (reversed)' : ''}`);
        
        // Show video container
        this.currentVideo.classList.remove('hidden');
        
        // Set up video
        this.currentVideo.src = videoPath;
        
        // Handle playback direction
        if (reverse) {
            // For reverse playback, we'll need to implement reverse logic
            // For now, just play forward (browsers don't support reverse natively)
            this.currentVideo.playbackRate = -1; // This may not work in all browsers
        } else {
            this.currentVideo.playbackRate = 1;
        }
        
        // Event handlers
        this.currentVideo.onloadeddata = () => {
            this.currentVideo.play().catch(e => {
                console.warn('Video autoplay failed:', e);
                // Fallback: just call callback immediately
                if (callback) callback();
            });
        };
        
        this.currentVideo.onended = () => {
            this.hideVideo();
            if (callback) callback();
        };
        
        this.currentVideo.onerror = (e) => {
            console.error('Video playback error:', e);
            this.hideVideo();
            if (callback) callback();
        };
        
        // Load the video
        this.currentVideo.load();
    }
    
    hideVideo() {
        if (this.currentVideo) {
            this.currentVideo.classList.add('hidden');
            this.currentVideo.src = ''; // Clear source
        }
    }
    
    stop() {
        if (this.currentVideo) {
            this.currentVideo.pause();
            this.currentVideo.currentTime = 0;
            this.hideVideo();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationPlayer = new AnimationPlayer();
});
