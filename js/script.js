
/* Functionality for when specific square is pressed */

const cells = document.querySelectorAll('.base-child');

let fig = "cross"

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
  });
  
function handleClick() {
    // Highlight the cell
    let c = this.querySelector(".cross");
    c.classList.toggle('hidden')

    // Remove the click event listener
    this.removeEventListener('click', handleClick);

}

function resetGrid() {
    // Remove the highlight class from all cells
    cells.forEach(cell => {
        cell.classList.remove('highlight');
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

/* first make it fully user interactive */
/* put in following functionality:
/* only one shape allowed to be visible */
/* so if square is shown, cannot add circle */
/* however if user interactive, that means that shapes will alternate
/* if computer driven, shapes will alternate too */
/* so perhaps need to disable square after first click */



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