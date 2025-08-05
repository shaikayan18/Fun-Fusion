// Game State
let beatCounter = 0;
let isMuted = false;
let demoInterval = null;

// DOM Elements
const drums = document.querySelectorAll('.drum');
const muteBtn = document.getElementById('muteBtn');
const demoBtn = document.getElementById('demoBtn');
const beatCounterElement = document.getElementById('beatCounter');

// Sound mapping
const soundMap = {
    'w': 'sounds/tom-1.mp3',
    'a': 'sounds/tom-2.mp3',
    's': 'sounds/tom-3.mp3',
    'd': 'sounds/tom-4.mp3',
    'j': 'sounds/crash.mp3',
    'k': 'sounds/kick-bass.mp3',
    'l': 'sounds/snare.mp3'
};

// Initialize Game
function initGame() {
    updateBeatCounter();
    loadGameState();
}

// Update Beat Counter
function updateBeatCounter() {
    beatCounterElement.textContent = beatCounter;
}

// Save Game State
function saveGameState() {
    localStorage.setItem('drumKitState', JSON.stringify({
        beatCounter: beatCounter,
        isMuted: isMuted
    }));
}

// Load Game State
function loadGameState() {
    const savedState = localStorage.getItem('drumKitState');
    if (savedState) {
        const state = JSON.parse(savedState);
        beatCounter = state.beatCounter || 0;
        isMuted = state.isMuted || false;
        updateBeatCounter();
        updateMuteButton();
    }
}

// Play Sound
function playSound(key) {
    if (isMuted) return;
    
    const soundPath = soundMap[key];
    if (soundPath) {
        const audio = new Audio(soundPath);
        audio.volume = 0.7;
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}

// Animate Drum
function animateDrum(drumElement) {
    drumElement.classList.add('pressed');
    setTimeout(() => {
        drumElement.classList.remove('pressed');
    }, 100);
}

// Handle Drum Click
function handleDrumClick(drumElement) {
    const key = drumElement.dataset.key;
    if (key) {
        playSound(key);
        animateDrum(drumElement);
        beatCounter++;
        updateBeatCounter();
        saveGameState();
    }
}

// Handle Keyboard Press
function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    const drumElement = document.querySelector(`[data-key="${key}"]`);
    
    if (drumElement) {
        handleDrumClick(drumElement);
    }
}

// Toggle Mute
function toggleMute() {
    isMuted = !isMuted;
    updateMuteButton();
    saveGameState();
}

// Update Mute Button
function updateMuteButton() {
    if (isMuted) {
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Unmute';
        muteBtn.classList.add('active');
    } else {
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Mute All';
        muteBtn.classList.remove('active');
    }
}

// Demo Beat
function playDemoBeat() {
    if (demoInterval) {
        stopDemoBeat();
        return;
    }
    
    const demoSequence = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
    let sequenceIndex = 0;
    
    demoBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Demo';
    demoBtn.classList.add('active');
    
    demoInterval = setInterval(() => {
        const key = demoSequence[sequenceIndex];
        const drumElement = document.querySelector(`[data-key="${key}"]`);
        
        if (drumElement) {
            handleDrumClick(drumElement);
        }
        
        sequenceIndex = (sequenceIndex + 1) % demoSequence.length;
    }, 500);
}

// Stop Demo Beat
function stopDemoBeat() {
    if (demoInterval) {
        clearInterval(demoInterval);
        demoInterval = null;
        demoBtn.innerHTML = '<i class="fas fa-play"></i> Demo Beat';
        demoBtn.classList.remove('active');
    }
}

// Reset Game
function resetGame() {
    beatCounter = 0;
    updateBeatCounter();
    saveGameState();
}

// Add event listeners to drums
drums.forEach(drum => {
    drum.addEventListener('click', () => handleDrumClick(drum));
});

// Add keyboard event listener
document.addEventListener('keydown', handleKeyPress);

// Add control button event listeners
muteBtn.addEventListener('click', toggleMute);
demoBtn.addEventListener('click', playDemoBeat);

// Add visual feedback for keyboard presses
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const drumElement = document.querySelector(`[data-key="${key}"]`);
    
    if (drumElement) {
        drumElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            drumElement.style.transform = '';
        }, 100);
    }
});

// Add hover effects
drums.forEach(drum => {
    drum.addEventListener('mouseenter', () => {
        if (!drum.classList.contains('pressed')) {
            drum.style.transform = 'scale(1.05)';
        }
    });
    
    drum.addEventListener('mouseleave', () => {
        if (!drum.classList.contains('pressed')) {
            drum.style.transform = '';
        }
    });
});

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Clean up demo interval when page is unloaded
window.addEventListener('beforeunload', () => {
    if (demoInterval) {
        clearInterval(demoInterval);
    }
});
