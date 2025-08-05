// Game State
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    player1: 0,
    player2: 0,
    draws: 0
};

// DOM Elements
const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('resetBtn');
const newBtn = document.getElementById('newBtn');
const modal = document.getElementById('winnerModal');
const winnerText = document.getElementById('winnerText');
const winnerMessage = document.getElementById('winnerMessage');
const playAgainBtn = document.getElementById('playAgainBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const turnText = document.getElementById('turn-text');
const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');
const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');
const scoreDrawElement = document.getElementById('scoreDraw');

// Winning Patterns
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize Game
function initGame() {
    updateTurnIndicator();
    updatePlayerDisplay();
    updateScores();
    loadScores();
}

// Update Turn Indicator
function updateTurnIndicator() {
    turnText.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s Turn`;
}

// Update Player Display
function updatePlayerDisplay() {
    if (currentPlayer === 'X') {
        player1Element.classList.add('active');
        player2Element.classList.remove('active');
    } else {
        player1Element.classList.remove('active');
        player2Element.classList.add('active');
    }
}

// Update Scores Display
function updateScores() {
    score1Element.textContent = scores.player1;
    score2Element.textContent = scores.player2;
    scoreDrawElement.textContent = scores.draws;
}

// Save Scores to Local Storage
function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

// Load Scores from Local Storage
function loadScores() {
    const savedScores = localStorage.getItem('ticTacToeScores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        updateScores();
    }
}

// Handle Box Click
function handleBoxClick(index) {
    if (gameBoard[index] !== '' || !gameActive) return;

    // Update game board
    gameBoard[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    boxes[index].classList.add(currentPlayer.toLowerCase());
    boxes[index].disabled = true;

    // Add click animation
    boxes[index].style.transform = 'scale(0.95)';
    setTimeout(() => {
        boxes[index].style.transform = '';
    }, 150);

    // Check for winner
    if (checkWinner()) {
        handleGameEnd('win');
        return;
    }

    // Check for draw
    if (checkDraw()) {
        handleGameEnd('draw');
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
    updatePlayerDisplay();
}

// Check for Winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Highlight winning boxes
            pattern.forEach(index => {
                boxes[index].style.background = 'rgba(255, 215, 0, 0.3)';
                boxes[index].style.borderColor = '#ffd700';
            });
            return true;
        }
    }
    return false;
}

// Check for Draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Handle Game End
function handleGameEnd(result) {
    gameActive = false;
    
    if (result === 'win') {
        const winner = currentPlayer === 'X' ? 'Player 1' : 'Player 2';
        winnerText.textContent = 'Winner!';
        winnerMessage.textContent = `${winner} wins!`;
        
        // Update scores
        if (currentPlayer === 'X') {
            scores.player1++;
        } else {
            scores.player2++;
        }
        
        // Add celebration animation
        setTimeout(() => {
            showModal();
        }, 500);
    } else {
        winnerText.textContent = 'Draw!';
        winnerMessage.textContent = "It's a tie!";
        scores.draws++;
        setTimeout(() => {
            showModal();
        }, 500);
    }
    
    updateScores();
    saveScores();
}

// Show Winner Modal
function showModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Hide Winner Modal
function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Reset Game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    // Reset boxes
    boxes.forEach(box => {
        box.textContent = '';
        box.disabled = false;
        box.classList.remove('x', 'o');
        box.style.background = '';
        box.style.borderColor = '';
    });
    
    updateTurnIndicator();
    updatePlayerDisplay();
}

// New Game (Reset Scores)
function newGame() {
    scores = { player1: 0, player2: 0, draws: 0 };
    updateScores();
    saveScores();
    resetGame();
}

// Add click event listeners to boxes
boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(index));
});

// Add event listeners to buttons
resetBtn.addEventListener('click', resetGame);
newBtn.addEventListener('click', newGame);
playAgainBtn.addEventListener('click', () => {
    hideModal();
    resetGame();
});
closeModalBtn.addEventListener('click', hideModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        hideModal();
    }
});

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);
