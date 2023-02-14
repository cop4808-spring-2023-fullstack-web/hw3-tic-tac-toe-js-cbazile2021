const statusDisplay = document.querySelector('.status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const arr = [0,0,0]
const barStat = document.querySelector(".barStat")
const state = () =>
{
    barStat.innerHTML = `<p>Human:${arr[1]} Robot:${arr[0]} TIES:${arr[2]}</p>`
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function verifyWin() {
    let roundWon1 = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c && a === "X" && b === "X" && c === "X") {
            roundWon1 = true;
            break
        }
    }
    let roundWon2 = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c && a === "O" && b === "O" && c === "O") {
            roundWon2 = true;
            break
        }
    }


    if (roundWon1) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        arr[1] += 1
        state()
        return roundWon;
    }
    else if (roundWon2) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        arr[0] += 1
        state()
        return roundWon;
    }

    

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        arr[2] += 1
        state()
        return roundDraw;
    }
    return false;
}



function handleResultValidation () {
    verifyWin()

    if (gameActive) {
        handlePlayerChange();
        handleComputerMOve();
    }
}

function handleComputerMOve(){
    setTimeout(() => {
      chooseComputerMOve()
      if(!verifyWin())
          handlePlayerChange()
    }, 800)
  }

function chooseComputerMOve() {
    while (true) {
        //loop through the gamestate to find a spot randomly
        var spot = Math.floor(Math.random() * 9)
        if (gameState[spot] == '') //checking for empty spot
            break;
    }

    //spot will have the computer move
    gameState[spot] = currentPlayer
    document.querySelectorAll('.cell').forEach((cell) => {
      if(cell.getAttribute("data-cell-index") === spot.toString()){
        cell.innerHTML = currentPlayer
      }
    })
}


function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);