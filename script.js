
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

function handleCellClick(e) {
    const index = e.target.getAttribute('data-cell');

    if (gameBoard[index] || gameOver) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        alert(`${winner} wins!`);
        gameOver = true;
    } else if (gameBoard.every(cell => cell)) {
        alert('It\'s a draw!');
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to restart the game
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell content
    });
}

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add event listener for the restart button
restartBtn.addEventListener('click', restartGame);
