alert("Two player game , Don't Try Alone ☠️")

const board = document.querySelector("#board");
const statusDisplay = document.querySelector("#status");
let gameActive = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];

const winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

function handlePlayerChange(){
    currentPlayer = currentPlayer ==="X"?"O":"X";
}

function handleResultValidation(){
    let roundWon = false;
    for(let i=0;i<winningCondition.length;i++){
        const winCondition = winningCondition[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if(a===''||b===''||c===''){
            continue;
        }

        else{
            if(a===b && b===c){
                roundWon = true;
                break;
            }
        }

    }
    if(roundWon){
        statusDisplay.innerText = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    let roundDraw =!gameState.includes("");
    if(roundDraw){
        statusDisplay.innerText = "It's a draw!";
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',function(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

}));

function resetGame(){
    gameState=["","","","","","","","",""];
    gameActive=true;
    currentPlayer="X";
    document.querySelectorAll(".cell").forEach(cell => cell.textContent="");
    statusDisplay.innerText="";
}

document.querySelector(".reset-btn").addEventListener("click",resetGame);


