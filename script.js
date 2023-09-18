// Define constants
const colors = {
    null: "",
    1: "X",
    "-1": "O",
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Define variables
let board = Array(9).fill(null);
let turn = 1;
let winner = null;

// Store elements
const squares = Array.from(document.querySelectorAll(".cell"));
const message = document.getElementById("message");
const replayButton = document.getElementById("reset");

// Function to render the board and message
function render() {
    squares.forEach((square, index) => {
        square.textContent = colors[board[index]];
        square.style.backgroundColor = board[index] ? "white" : "lightgray";
    });

    if (winner !== null) {
        if (winner === "T") {
            message.textContent = "It's a tie!";
        } else {
            message.textContent = `Player ${colors[winner]} wins!`;
        }
        // Disable further moves
        squares.forEach((square) => {
            square.removeEventListener("click", handleSquareClick);
        });
    } else {
        message.textContent = `Player ${colors[turn]}'s turn`;
    }
}

// Function to handle square clicks
function handleSquareClick(event) {
    const index = squares.indexOf(event.target);

    if (board[index] !== null || winner !== null) {
        return; // Square already taken or game over
    }

    board[index] = turn;
    turn *= -1;

    // Check for a winner
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            break;
        }
    }

    // Check for a tie
    if (!board.includes(null) && winner === null) {
        winner = "T";
    }

    render();
}

// Function to handle replay button click
function handleReplayClick() {
    board = Array(9).fill(null);
    turn = 1; // Player 'X' starts
    winner = null;
    render();
    // Enable square clicks
    squares.forEach((square) => {
        square.addEventListener("click", handleSquareClick);
    });
}

// Add event listeners
squares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
});

replayButton.addEventListener("click", handleReplayClick);

// Initialize and render the game
render();