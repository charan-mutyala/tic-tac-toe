const statusDisplay = document.querySelector('.game-status'); //it's x turn or y turn message
let gameActive = true; //initial state of a game 

let currentPlayer = "X"; //first X turns (initial player)

//initalize all the 9 cells as empty cells
let gameState = ["","","","","","","","",""]; //an array of 9 empty cells 

//give a winning message - X won or O won 
const winningMessage = ()=>`Player ${currentPlayer} has won!`;

//draw message
const drawMessage = ()=> 'Game ended in draw';

//Game turn message
const currentPlayerTurn = ()=> `Its ${currentPlayer} turn`;

//Displaying the current player turn
statusDisplay.innerHTML = currentPlayerTurn();

//declare 5 functions

// first function
function handleCellPlayed(){
}

//second function
function handlePlayerChange(){
}

//Third Function
function handleResultValidation(){
}

//fourth function
function handleCellClick(){
}

//fifth function
function handleRestartGame(){
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);



//PART-2 of code

//handle check
function handleCellClick(clickedCellEvent){
    const clickedcell=clickedCellEvent.target;
    const clickedCellIndex=parseInt(clickedcell.getAttribute('data-cell-index'));//its stores 2 as a value
if(gameState[clickedCellIndex]!==""|| !gameActive){
    return;
}
handleCellPlayed(clickedcell,clickedCellIndex);
handleResultValidation();

}

//Part-3
function handleCellPlayed(clickedcell,clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer;
    clickedcell.innerHTML=currentPlayer;
}

//part-4
//part-4 of the code - Result Validation - all probabilities - i.e 8
const winningConditions = [
    [0,1,2], //index - 0
    [3,4,5], //index - 1
    [6,7,8], //index - 2
    [0,4,8], //index - 3
    [2,4,6], //index - 4
    [0,3,6], //index - 5
    [1,4,7], //index - 6
    [2,5,8]  //index - 7
];

function handleResultValidation(){
    let roundWon = false;
    for(let i=0;i<=7;i++){
        const winCondition=winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if(a===""|| b === ""||c===""){
            continue;
        }

        if(a===b && b===c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes(""); //true if all 9 cells are occupied 
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
//part 5 - handlePlayerChange() => X to O or O to X
function handlePlayerChange(){
    currentPlayer = currentPlayer === "X"?"O":"X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//part-6 - Restart the game
function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell=>cell.innerHTML="");
}
