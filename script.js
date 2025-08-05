// DOM Elements
const modal = document.getElementById('gameModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');
const navLinks = document.querySelectorAll('.nav-link');

// Game Information Data
const gameInfo = {
    'tic-tac-toe': {
        title: 'Tic Tac Toe',
        description: 'A classic strategy game where two players take turns marking spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.',
        features: ['2 Players', 'Strategy Game', 'Easy to Learn', 'Quick Play'],
        instructions: 'Click on any empty square to place your mark (X or O). Get three in a row to win!',
        difficulty: 'Easy',
        playTime: '2-5 minutes'
    },
    'drum-kit': {
        title: 'Drum Kit',
        description: 'An interactive virtual drum kit that lets you create music using your keyboard or mouse. Perfect for music enthusiasts and those who want to learn basic drum patterns.',
        features: ['Interactive', 'Musical', 'Keyboard Controls', 'Sound Effects'],
        instructions: 'Use keys W, A, S, D, J, K, L or click the drum buttons to create beats!',
        difficulty: 'Medium',
        playTime: 'Unlimited'
    },
    'dicee': {
        title: 'Dicee Challenge',
        description: 'A simple yet exciting dice rolling game where two players compete to see who gets the higher number. Perfect for quick decision-making and friendly competitions.',
        features: ['2 Players', 'Luck Based', 'Quick Game', 'Simple Rules'],
        instructions: 'Refresh the page to roll the dice and see who wins!',
        difficulty: 'Easy',
        playTime: '1-2 minutes'
    }
};

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Show Game Information Modal
function showGameInfo(gameId) {
    const game = gameInfo[gameId];
    if (!game) return;
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${game.title}</h2>
            <div class="game-meta">
                <span class="difficulty">Difficulty: ${game.difficulty}</span>
                <span class="play-time">Play Time: ${game.playTime}</span>
            </div>
        </div>
        <div class="modal-body">
            <p class="game-description">${game.description}</p>
            <div class="game-instructions">
                <h3>How to Play:</h3>
                <p>${game.instructions}</p>
            </div>
            <div class="game-features-list">
                <h3>Features:</h3>
                <ul>
                    ${game.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="modal-footer">
            <a href="${getGameUrl(gameId)}" class="play-button">
                <i class="fas fa-play"></i>
                Start Playing
            </a>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Get Game URL
function getGameUrl(gameId) {
    const urls = {
        'tic-tac-toe': 'tic-tac-toe/tic.html',
        'drum-kit': 'drum-kit/index.html',
        'dicee': 'dicee/index.html'
    };
    return urls[gameId] || '#';
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Scroll-based Navigation Highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// Add loading animation to game cards
document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add hover sound effect (optional)
function addHoverSound() {
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Create a subtle hover sound effect
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
            audio.volume = 0.1;
            audio.play().catch(() => {}); // Ignore errors if audio fails
        });
    });
}

// Initialize hover sounds
addHoverSound();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.querySelector('.particles');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }
});

// Add game card click effects
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on buttons
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
            return;
        }
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

// Add statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(target);
        
        if (isNumber) {
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        }
    });
}

// Initialize counter animation when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}); 