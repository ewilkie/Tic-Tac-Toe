/* TODO */
// define end game logic
// for this i need to keep track of which shapes are in which cells
// translate to 0 and 1
// define winning orientations as a matrix?
// [1,1,1]
// [0,0,0]
// [0,0,0]
// etc
// draw a line through winning combination
// pop-up displaying winner


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
const cells = document.querySelectorAll('.base-child');
const cellElements = Array.from(cells)
console.log(cellElements);

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


cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
  
// this needs to be interactively changed based on either user input or who goes first. 
// doesn't really matter, leave this for now will be defined elsewhere
let fig = "cross"
let isPlayer_O_Turn = false

// need to set this up during start game
let PLAYER_O_CLASS = "O"
let PLAYER_X_CLASS = "X"


function handleClick() {

  // check who's turn it is
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS

    // add figure in cell 
    if (currentClass == "X"){
        // toggle cross visibility
        let c = this.querySelector(".cross");
        c.classList.toggle('hidden')

        this.classList.add(PLAYER_X_CLASS)
        console.log(checkWin(currentClass))

        // swap classes
        isPlayer_O_Turn = true
    } else {
        let c = this.querySelector(".circle");
        c.classList.toggle('hidden')
        fig = "cross";
        this.classList.add("circle")
        
        // add class list to determine winning
        this.classList.add(PLAYER_O_CLASS)
        console.log(checkWin(currentClass))


        // swap classes
        isPlayer_O_Turn = false
    }

    // Remove the click event listener for cell
    this.removeEventListener('click', handleClick);

    console.log(this.classList)
}

function resetGrid() {
    // Remove the highlight class from all cells
    cells.forEach(cell => {
        cell.classList.add('hidden');
    });

    // Add the click event listener back to all cells
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}


/* this adds event listeners to each square 
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