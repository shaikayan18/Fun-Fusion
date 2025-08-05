// Game State
let scores = {
    player1: 0,
    player2: 0,
    draws: 0
};

let gameHistory = [];
let isRolling = false;

// DOM Elements
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const value1 = document.getElementById('value1');
const value2 = document.getElementById('value2');
const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('statusText');
const winnerDisplay = document.getElementById('winnerDisplay');
const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');
const scoreDrawElement = document.getElementById('scoreDraw');
const historyList = document.getElementById('historyList');
const modal = document.getElementById('winnerModal');
const winnerText = document.getElementById('winnerText');
const winnerMessage = document.getElementById('winnerMessage');
const resultDice1 = document.getElementById('resultDice1');
const resultDice2 = document.getElementById('resultDice2');
const playAgainBtn = document.getElementById('playAgainBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Initialize Game
function initGame() {
    updateScores();
    loadScores();
    loadHistory();
    updateStatus('Ready to roll!');
}

// Update Status
function updateStatus(message) {
    statusText.textContent = message;
}

// Update Winner Display
function updateWinnerDisplay(message) {
    winnerDisplay.textContent = message;
}

// Update Scores Display
function updateScores() {
    score1Element.textContent = scores.player1;
    score2Element.textContent = scores.player2;
    scoreDrawElement.textContent = scores.draws;
}

// Save Scores to Local Storage
function saveScores() {
    localStorage.setItem('diceeScores', JSON.stringify(scores));
}

// Load Scores from Local Storage
function loadScores() {
    const savedScores = localStorage.getItem('diceeScores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        updateScores();
    }
}

// Save History to Local Storage
function saveHistory() {
    localStorage.setItem('diceeHistory', JSON.stringify(gameHistory));
}

// Load History from Local Storage
function loadHistory() {
    const savedHistory = localStorage.getItem('diceeHistory');
    if (savedHistory) {
        gameHistory = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
}

// Generate Random Dice Number
function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Roll Dice Animation
function rollDice() {
    if (isRolling) return;
    
    isRolling = true;
    rollBtn.disabled = true;
    updateStatus('Rolling dice...');
    
    // Add rolling animation
    dice1.classList.add('rolling');
    dice2.classList.add('rolling');
    
    // Simulate rolling with multiple random numbers
    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
        const temp1 = getRandomDice();
        const temp2 = getRandomDice();
        
        dice1.src = `dice${temp1}.png`;
        dice2.src = `dice${temp2}.png`;
        value1.textContent = temp1;
        value2.textContent = temp2;
        
        rollCount++;
        if (rollCount >= maxRolls) {
            clearInterval(rollInterval);
            finishRoll();
        }
    }, 100);
}

// Finish Roll
function finishRoll() {
    const dice1Value = getRandomDice();
    const dice2Value = getRandomDice();
    
    // Set final values
    dice1.src = `dice${dice1Value}.png`;
    dice2.src = `dice${dice2Value}.png`;
    value1.textContent = dice1Value;
    value2.textContent = dice2Value;
    
    // Remove rolling animation
    dice1.classList.remove('rolling');
    dice2.classList.remove('rolling');
    
    // Determine winner
    let result;
    if (dice1Value > dice2Value) {
        result = 'Player 1 wins!';
        scores.player1++;
        updateWinnerDisplay('Player 1 wins!');
    } else if (dice2Value > dice1Value) {
        result = 'Player 2 wins!';
        scores.player2++;
        updateWinnerDisplay('Player 2 wins!');
    } else {
        result = "It's a draw!";
        scores.draws++;
        updateWinnerDisplay("It's a draw!");
    }
    
    // Add to history
    const historyItem = {
        dice1: dice1Value,
        dice2: dice2Value,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    gameHistory.unshift(historyItem);
    if (gameHistory.length > 10) {
        gameHistory = gameHistory.slice(0, 10);
    }
    
    // Update displays
    updateScores();
    updateHistoryDisplay();
    saveScores();
    saveHistory();
    
    // Show result
    updateStatus(result);
    
    // Show modal after delay
    setTimeout(() => {
        showResultModal(dice1Value, dice2Value, result);
    }, 1000);
    
    // Re-enable roll button
    isRolling = false;
    rollBtn.disabled = false;
}

// Update History Display
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    gameHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span class="history-result">${item.dice1} vs ${item.dice2}</span>
            <span class="history-winner">${item.result}</span>
        `;
        historyList.appendChild(historyItem);
    });
}

// Show Result Modal
function showResultModal(dice1Value, dice2Value, result) {
    resultDice1.textContent = dice1Value;
    resultDice2.textContent = dice2Value;
    
    if (result.includes('Player 1')) {
        winnerText.textContent = 'Player 1 Wins!';
        winnerMessage.textContent = 'Congratulations Player 1!';
    } else if (result.includes('Player 2')) {
        winnerText.textContent = 'Player 2 Wins!';
        winnerMessage.textContent = 'Congratulations Player 2!';
    } else {
        winnerText.textContent = 'Draw!';
        winnerMessage.textContent = "It's a tie!";
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Hide Modal
function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Reset Game
function resetGame() {
    scores = { player1: 0, player2: 0, draws: 0 };
    gameHistory = [];
    updateScores();
    updateHistoryDisplay();
    updateStatus('Ready to roll!');
    updateWinnerDisplay('');
    saveScores();
    saveHistory();
}

// Add event listeners
rollBtn.addEventListener('click', rollDice);
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', () => {
    hideModal();
    rollDice();
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