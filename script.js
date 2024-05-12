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
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
}

  

function checkWin() {
    if (winningCombos.some(combo => combo.every(index => board[index] === currentPlayer))) {
        // Show a confirm dialog with customized buttons
        let restart = confirm(`${currentPlayer} wins! Would you like to restart the game?`);
        if (restart) {
            window.location.reload(); // Reload the page if user chooses to restart
        } else {
            // Perform any other action if user chooses not to restart
            // For example, close the window
            window.close();
        }
        return true;
    } else if (board.every(cell => cell !== '')) {
        // Show a confirm dialog with customized buttons
        let restart = confirm('It\'s a draw! Would you like to restart the game?');
        if (restart) {
            window.location.reload(); // Reload the page if user chooses to restart
        } else {
            // Perform any other action if user chooses not to restart
            // For example, close the window
            window.close();
        }
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
