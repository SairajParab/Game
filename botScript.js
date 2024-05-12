let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Define colors for text of each player
const playerTextColors = {
  'X': '#ffb100',
  'O': '#ff0000'
};

function playerMove(index) {
  if (board[index] === '') {
    board[index] = currentPlayer;
    let cell = document.getElementsByClassName('cell')[index];
    cell.innerText = currentPlayer;
    cell.style.background = currentPlayer === 'X' ? 'radial-gradient(circle, #f84a4a, #fb3e3c, #fd302d, #fe1f1c, #ff0000)' : 'radial-gradient(circle, #ffdc60, #ffd24e, #fec73a, #ffbc25, #ffb100)';
    cell.style.color = playerTextColors[currentPlayer]; // Change text color

    // Check for win after the move
    if (checkWin()) {
      // No need to do anything here, alert is handled in checkWin()
    } else if (board.every(cell => cell !== '')) {
      alert('It\'s a draw!');
      resetBoard();
    } else {
      // Switch to the bot's turn
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      // If the bot is playing, make its move after a short delay
      if (currentPlayer === 'O') {
        setTimeout(botMove, 500);
      }
    }
  }
}
function botMove() {
    // Generate a random number between 0 and 1
    let randomChance = Math.random();

    // Strategy: If the bot can win in the next move, make that move.
    // Otherwise, if the user is about to win in the next move, block them.
    // Otherwise, make a random move.

    // Check if the bot can win in the next move
    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        let emptyCell = combo.find(index => board[index] === '');
        if (emptyCell !== undefined) {
            let tempBoard = [...board];
            tempBoard[emptyCell] = currentPlayer;
            if (checkWinCondition(tempBoard, currentPlayer)) {
                // If the bot wins in the next move, make that move
                playerMove(emptyCell);
                return;
            }
        }
    }

    // Check if the user is about to win in the next move and block them
    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        let emptyCell = combo.find(index => board[index] === '');
        if (emptyCell !== undefined) {
            let tempBoard = [...board];
            tempBoard[emptyCell] = 'X'; // Assuming the user is represented by 'X'
            if (checkWinCondition(tempBoard, 'X')) {
                // If the user is about to win, block them by making a move in that cell
                playerMove(emptyCell);
                return;
            }
        }
    }

    // Occasionally make a suboptimal move to let the player win
    if (randomChance < 0.1) {
        makeSuboptimalMove();
    } else {
        // Otherwise, make a random move
        let emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                emptyCells.push(i);
            }
        }
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let randomCell = emptyCells[randomIndex];
        playerMove(randomCell);
    }
}

function makeSuboptimalMove() {
    // Find a cell that would allow the player to win
    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        let emptyCell = combo.find(index => board[index] === '');
        if (emptyCell !== undefined) {
            let tempBoard = [...board];
            tempBoard[emptyCell] = currentPlayer;
            if (checkWinCondition(tempBoard, currentPlayer)) {
                // Make the suboptimal move
                playerMove(emptyCell);
                return;
            }
        }
    }

    // If no move allows the player to win, make a random move
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            emptyCells.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let randomCell = emptyCells[randomIndex];
    playerMove(randomCell);
}

  
  function checkWinCondition(board, player) {
    return winningCombos.some(combo => combo.every(index => board[index] === player));
  }
  

function checkWin() {
  if (winningCombos.some(combo => combo.every(index => board[index] === currentPlayer))) {
    // Delay the alert by 0.5 seconds
    setTimeout(() => {
      // Show a confirm dialog with customized buttons
      let restart = confirm(`${currentPlayer} wins! Would you like to restart the game?`);
      if (restart) {
        window.location.reload(); // Reload the page if user chooses to restart
      } else {
        // Perform any other action if user chooses not to restart
        // For example, close the window
        window.close();
      }
    }, 250); // 500 milliseconds delay
    return true;
  } else if (board.every(cell => cell !== '')) {
    // Delay the alert by 0.5 seconds
    setTimeout(() => {
      // Show a confirm dialog with customized buttons
      let restart = confirm('It\'s a draw! Would you like to restart the game?');
      if (restart) {
        window.location.reload(); // Reload the page if user chooses to restart
      } else {
        // Perform any other action if user chooses not to restart
        // For example, close the window
        window.close();
      }
    }, 250); // 500 milliseconds delay
    return true;
  }
  return false;
}

function resetBoard() {
  // Clear the board
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  document.getElementById('result').innerText = '';

  // Clear text content and background of cells
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.style.background = 'linear-gradient(45deg, #f9a03f, #f5b9b3)';
    cell.style.color = ''; // Reset text color
  });
}
