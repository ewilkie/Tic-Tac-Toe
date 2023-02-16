/* TODO */
// game start up screen
// define computer logic
// draw a line through winning combination
// pop-up displaying winner
// sounds
// scoreboard for x and O


// tentative logic
// add class list to cell to determine is x or o


//const cellElements = document.querySelectorAll('.base-child')


//const cellElements = Array.from(document.querySelectorAll('.base-child'));


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

// this needs to be interactively changed based on either user input or who goes first. 
// doesn't really matter, leave this for now will be defined elsewhere

let isPlayer_O_Turn = false

// need to set this up during start game
let PLAYER_O_CLASS = "O"
let PLAYER_X_CLASS = "X"


// checks whether any of the winning combinations through 'some' contain all current class list in cellElements. 
// the every method and the some method need to return true for the play to have won 
// So cell elements needs to be subsettable via index
function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}


function handleClick() {

  // check who's turn it is
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS

    // add figure in cell 
    if (currentClass == "X"){
        // toggle cross visibility
        let c = this.querySelector(".cross");
        c.classList.toggle('hidden')

        // to determine winning
        this.classList.add(PLAYER_X_CLASS)

        // if returns true, end game 
        if (checkWin(currentClass)){
          endGame();
        }
        // swap classes
        isPlayer_O_Turn = true
    } else {
        let c = this.querySelector(".circle");
        c.classList.toggle('hidden')
        
        // add class list to determine winning
        this.classList.add(PLAYER_O_CLASS)

        // of returns true, end game 
        if (checkWin(currentClass)){
          endGame();
        }

        // swap classes
        isPlayer_O_Turn = false
    }

    // Remove the click event listener for cell
    this.removeEventListener('click', handleClick);

    // remove hover styling when cell contains item
    this.onmouseover = function() {
      this.style.boxShadow = 'none';
      console.log(this.style);
    };
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

const winningMessageElement = document.querySelector('.results')
const winningMessageText = document.querySelector('#winningMessageText')

function endGame() {
  winningMessageText.innerText = `Player with ${isPlayer_O_Turn ? "O" : "X"} wins!`;
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
  });

  // Add the click event listener back to all cells
  cells.forEach(cell => {
      cell.addEventListener('click', handleClick);
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