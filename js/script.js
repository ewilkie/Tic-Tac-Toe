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


/* Functionality for when specific square is clicked */
const cells = document.querySelectorAll('.base-child');


cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
  
// this needs to be interactively changed based on either user input or who goes first. 
// doesn't really matter, leave this for now will be defined elsewhere
let fig = "cross"

function handleClick() {
    // Highlight the cell
    if (fig == "cross"){
        let c = this.querySelector(".cross");
        c.classList.toggle('hidden')
        fig = "circle";
    } else {
        let c = this.querySelector(".circle");
        c.classList.toggle('hidden')
        fig = "cross";
    }

    // Remove the click event listener for cell
    this.removeEventListener('click', handleClick);

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