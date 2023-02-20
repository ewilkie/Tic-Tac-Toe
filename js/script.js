/* TODO */

// define computer logic
// draw a line through winning combination
// sounds
// styling



/* =========================== Player selection ================================= */

// Add click event to X and O on startgame screen
// change colour when selected and assign player classes
let crossSelect = document.querySelector('.cross');
let circleSelect = document.querySelector('.circle');

let cross = "X";
let circle = "O";

let player;
let pc;

let crossSpan = document.querySelectorAll('.cross-span');
let circleSpan = document.querySelector('.circle-span');

let isPlayer_O_Turn;
let player_symbol = document.querySelector('.score-player-symbol');
let pc_symbol = document.querySelector('.score-pc-symbol');


// to keep track of if computer goes first or someone else
let goFirst;

function pcMove(){
  console.log("pc")
}


// need to refine this so its less hacky using a different method from changing style ?
function playerSelection(event, type) {
  event.preventDefault();
    if (type === cross){

      crossSpan.forEach(c => {c.style.backgroundColor = "black"});
      circleSpan.style.border = "10px solid orange";

      isPlayer_O_Turn = false;
      player_symbol.innerHTML = "Player - X";
      pc_symbol.innerHTML = " PC - O";

      player = "X";
      pc = "O";

      goFirst = "player";

    } else {

      circleSpan.style.border = "10px solid black";
      crossSpan.forEach(c => {c.style.backgroundColor = "green"});

      isPlayer_O_Turn = true;
      player_symbol.innerHTML = "Player - O";
      pc_symbol.innerHTML = "PC - X";

      player = "O";
      pc = "X";

      goFirst = "pc";

    }
  
}

crossSelect.addEventListener('click', function(event) {playerSelection(event, cross)});
circleSelect.addEventListener('click', function(event) {playerSelection(event, circle)});

/* =========================== Start Game ================================= */

let buttonStart = document.querySelector('#startbutton');
let startDiv = document.querySelector('.game-start');
let mainDiv = document.querySelector('.main-game');


function startGame(event) {

  //prevent game start without a selection being made
  if(isPlayer_O_Turn === undefined){
    event.preventDefault();
  }else {
    startDiv.classList.add("hidden");
    mainDiv.classList.remove("hidden");

    // return icons to original color
    crossSpan.forEach(c => {c.style.backgroundColor = "green"});
    circleSpan.style.border = "10px solid orange";
  }

  // add hover function for grid
}

buttonStart.addEventListener('click', startGame);

/* =========================== Game Logic ================================= */

const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]


/* Functionality for when specific square is clicked */
let cells = document.querySelectorAll('.base-child');

// need array for winning combinations check based on index
let cellElements = Array.from(cells)


// checks whether any of the winning combinations through 'some' contains 'every' current class list in cellElements. 
// the every method and the some method need to return true for there to be a winner
// So cell elements needs to be subsettable via index
function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass);
		})
	})
}

// how to determine which winning combination to draw a line through it
// returns an array [0,1,2] with the index of the cells
function getWin(currentClass) {
	return WINNING_COMBINATIONS.find(combination => {
		return combination.every(index => {
			 return cellElements[index].classList.contains(currentClass);
		})
	})
}

// how to draw the lines
// in css determine horizontal, vertical and top-to-bottom and bottom-to-top

function handleClick() {

  // check who's turn it is
  const currentClass = isPlayer_O_Turn ? circle : cross;

  // check if pc or player

    // add figure in cell 
    if (currentClass === "X"){
        // toggle cross visibility
        let c = this.querySelector(".cross");
        c.classList.toggle('hidden')

        // to determine winning add class to each cell depending on type X or O
        this.classList.add(cross)

        // if returns true, end game 
        if (checkWin(currentClass) === true){
          endGame(true,currentClass);
        }else if (isDraw() === true){
          endGame(false,currentClass);
        }
        // swap classes
        isPlayer_O_Turn = true
    } else {
        let c = this.querySelector(".circle");
        c.classList.toggle('hidden')
        
        // add class list to determine winning
        this.classList.add(circle)

        // if returns true, end game 
        if (checkWin(currentClass) === true){
          endGame(true,currentClass);
        }else if (isDraw() === true){
          endGame(false,currentClass);
        }

        // swap classes
        isPlayer_O_Turn = false
    }

    // Remove the click event listener for cell
    this.removeEventListener('click', handleClick);

    // remove hover styling when cell contains item
    this.style.boxShadow = "initial";
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// checks if every cell contains a player class, returns true if thats the case
function isDraw() {
	return cellElements.every(cell => {
		return cell.classList.contains(cross) || cell.classList.contains(circle);
	})
}

let winningMessageElement = document.querySelector('.endgame');
let winningMessageText = document.querySelector('#winningMessageText');

// check which player is what symbol
// keep track of score

let playerScoreDiv = document.querySelector('.score-player');
let pcScoreDiv = document.querySelector('.score-pc');
let tiesDiv = document.querySelector('.ties');


function endGame(end, classtype) {

  let playerScore = parseInt(playerScoreDiv.textContent);
  let pcScore = parseInt(pcScoreDiv.textContent);
  let ties = parseInt(tiesDiv.textContent);

  if (end === true){

    if(classtype === "X" && player === "X") {
      winningMessageText.textContent = "You win";
      playerScore += 1;
      playerScoreDiv.innerHTML = playerScore

    // drawing lines
     // let linecells = getWin(classtype);
      
      //console.log(getWin(classtype), linecells);
      /*linecells.forEach((index) => {
        const cell = cells[index - 1];
        cell.classList.add('hline-through');
      });*/

    } else if (classtype === "X" && pc === "X"){
        winningMessageText.textContent = "PC wins";
        pcScore += 1;
        pcScoreDiv.innerHTML = pcScore
    } else if(classtype === "O" && player === "O") {
      winningMessageText.textContent = "You win";
      playerScore += 1;
      playerScoreDiv.innerHTML = playerScore
    } else if (classtype === "O" && pc === "O"){
        winningMessageText.textContent = "PC wins";
        pcScore += 1;
        pcScoreDiv.innerHTML = pcScore
    }
    
  } else if (end === false){
    winningMessageText.textContent = "Its a draw";
    ties += 1;
    tiesDiv.innerHTML = ties
  }
  winningMessageElement.classList.remove('hidden');
}

/* ================================ Reset Game ============================= */

function resetGrid() {
  // Remove classes
  cells.forEach(cell => {
    // make cross hidden
    let crossCell = cell.querySelector(".cross");
    crossCell.classList.add('hidden');

    // make circle hidden 
    let circleCell = cell.querySelector(".circle");
    circleCell.classList.add('hidden');

    // remove classess added to determine winning combination
    cell.classList.remove(circle);
    cell.classList.remove(cross);

    // Add the click event listener back to all cells
    cell.addEventListener('click', handleClick);

    // add hover styling when cell contains item
    cell.onmouseover = function() {
      this.style.boxShadow = "0px 0px 10px 2px rgba(0,0,0, 0.75)";
    };  

    // add hover styling when cell contains item
    cell.onmouseleave = function() {
      this.style.boxShadow = "initial";
    };

  });
}

/* =========================== replay game =================================== */

let buttonReplay = document.querySelector('#replaybutton');

function resetGame() {
  winningMessageElement.classList.add('hidden');
  resetGrid()
}

buttonReplay.addEventListener('click', resetGame);


/* =========================== return to start =================================== */

let buttonQuit = document.querySelector('#quitbutton');

function quitGame() {
  winningMessageElement.classList.add('hidden');
  resetGrid()
  startDiv.classList.remove("hidden");
  mainDiv.classList.add("hidden");

    // reset score
    playerScoreDiv.innerHTML = 0
    pcScoreDiv.innerHTML = 0
    tiesDiv = 0;

}

buttonQuit.addEventListener('click', quitGame);

