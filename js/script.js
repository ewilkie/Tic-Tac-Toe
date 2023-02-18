/* TODO */
// scoreboard for x and O
// define computer logic
// draw a line through winning combination
// pop-up displaying winner
// resent button
// sounds
// styling



/* =========================== Player selection ================================= */



// Add click event to X and O on startgame screen
// change colour when selected and assign player classes
let crossSelect = document.querySelector('.cross');
let circleSelect = document.querySelector('.circle');

let cross = "cross";
let circle = "circle";

let player;
let pc;

let crossSpan = document.querySelectorAll('.cross-span');
let circleSpan = document.querySelector('.circle-span');

let isPlayer_O_Turn;
let player_symbol = document.querySelector('.score-player-symbol');
let pc_symbol = document.querySelector('.score-pc-symbol');

// need to refine this so its less hacky using a different method from changing style ?
function playerSelection(event, type) {
  event.preventDefault();
    if (type == cross){

      crossSpan.forEach(c => {c.style.backgroundColor = "black"});
      circleSpan.style.border = "10px solid orange";

      isPlayer_O_Turn = false;
      player_symbol.innerHTML = "Player - X";
      pc_symbol.innerHTML = " PC - O";

      player = "X";
      pc = "O";

    } else {

      circleSpan.style.border = "10px solid black";
      crossSpan.forEach(c => {c.style.backgroundColor = "green"});

      isPlayer_O_Turn = true;
      player_symbol.innerHTML = "Player - O";
      pc_symbol.innerHTML = "PC - X";

      player = "O";
      pc = "X";

    }
  
}

crossSelect.addEventListener('click', function(event) {playerSelection(event, cross)});
circleSelect.addEventListener('click', function(event) {playerSelection(event, circle)});

/* =========================== Start Game ================================= */


let PLAYER_O_CLASS = "O"
let PLAYER_X_CLASS = "X"


let buttonStart = document.querySelector('#startbutton');
let startDiv = document.querySelector('.game-start');
let mainDiv = document.querySelector('.main-grid');
let scoreBoard = document.querySelector('.scoreboard');


function startGame(event) {

  //prevent game start without a selection being made
  if(isPlayer_O_Turn === undefined){
    event.preventDefault();
  }else {
    startDiv.classList.add("hidden");
    mainDiv.classList.remove("hidden");
    scoreBoard.classList.remove("hidden");

    // return icons to original color
    crossSpan.forEach(c => {c.style.backgroundColor = "green"});
    circleSpan.style.border = "10px solid orange";
  }
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


function handleClick() {

  // check who's turn it is
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;

    // add figure in cell 
    if (currentClass === "X"){
        // toggle cross visibility
        let c = this.querySelector(".cross");
        c.classList.toggle('hidden')

        // to determine winning add class to each cell depending on type X or O
        this.classList.add(PLAYER_X_CLASS)

        // if returns true, end game 
        if (checkWin(currentClass) === true){
          //console.log(currentClass);
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
        this.classList.add(PLAYER_O_CLASS)

        // if returns true, end game 
        if (checkWin(currentClass) === true){
          //console.log(currentClass);
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
    this.onmouseover = function() {
      this.style.boxShadow = 'none';
    };
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// checks if every cell contains a player class, returns true if thats the case
function isDraw() {
	return cellElements.every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

const winningMessageElement = document.querySelector('.endgame')
const winningMessageText = document.querySelector('#winningMessageText')

function endGame(end, classtype) {
  //console.log(player_symbol);


  if (end === true){
    console.log(player)
    if(classtype === "X" && player === "X") {
      winningMessageText.innerText = "you win";
    } else if (classtype === "X" && pc === "X"){
        winningMessageText.innerText = "pc wins";
    } else if(classtype === "O" && player === "O") {
      winningMessageText.innerText = "you win";
    } else if (classtype === "O" && pc === "O"){
        winningMessageText.innerText = "pc wins";
    }

    //winningMessageText.innerText = `Player with ${isPlayer_O_Turn ? "O" : "X"} wins!`;
    //winningMessageText.innerText = ` `
    
  } else if (end === false){
    winningMessageText.innerText = "Its a draw";
  }
  winningMessageElement.classList.add('show');
}

/* ================================ Reset Game ============================= */

function resetGrid() {
  // Remove classes
  cells.forEach(cell => {
    // make cross hidden
    let cross = cell.querySelector(".cross");
    cross.classList.add('hidden');

    // make circle hidden 
    let circle = cell.querySelector(".circle");
    circle.classList.add('hidden');

    // remove classess added to determine winning combination
    cell.classList.remove(PLAYER_O_CLASS);
    cell.classList.remove(PLAYER_X_CLASS);

    // Add the click event listener back to all cells
    cell.addEventListener('click', handleClick);

    // add hover styling when cell contains item
    cell.style.boxShadow = '0px 0px 10px 2px rgba(0,0,0, 0.75);';
  });
}


let buttonReset = document.querySelector('#resetbutton');

function resetGame() {
  winningMessageElement.classList.remove('show');
  resetGrid()
}

buttonReset.addEventListener('click', resetGame);



/*
 this adds event listeners to each square 
const cells = document.querySelectorAll('.base-child');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.classList.toggle('highlight');
    let c = cell.querySelector(".cross");
    console.log(c);
    c.classList.toggle('hidden')
  });
});


/* this doesn't really work */
/* need to keep track of if there is already is a shape in there 
// Get the grid container element
const gridContainer = document.querySelector('.main-grid');

// Add a click event listener to the grid container element
gridContainer.addEventListener('click', event => {
  // Get the target element that was clicked
  const clickedElement = event.target;

  
  // Get the grid area of the clicked element
  const gridArea = window.getComputedStyle(clickedElement).getPropertyValue('grid-area');
/* this doesn't work
  // Get the grid template areas of the grid container
  const gridTemplateAreas = window.getComputedStyle(gridContainer).getPropertyValue('grid-template-areas');

  // Split the grid template areas into rows
  const rows = gridTemplateAreas.split('" "');

  console.log( gridArea);
  // Find the row and column of the clicked element
  let row = 0;
  let column = 0;

  rows.forEach((rowTemplate, rowIndex) => {
    const columns = rowTemplate.split(' ');

    columns.forEach((columnTemplate, columnIndex) => {
      if (columnTemplate === gridArea) {
        row = rowIndex + 1;
        column = columnIndex + 1;
      }
    });
  });

  // Log the row and column to the console
  console.log(`Grid item at row ${row} and column ${column} was clicked`);

    console.log( gridArea);
  clickedElement.classList.remove("hidden");
});
*/