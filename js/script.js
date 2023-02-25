/* TODO */
// define computer logic
// timing of line, box shake and winning pop-up
// sounds
// styling



/* =========================== Player selection ================================= */

// Add click event to X and O on startgame screen
// change colour when selected and assign player classes
let crossSelect = document.querySelector('.cross');
let circleSelect = document.querySelector('.circle');

// this is to change the colors
let crossSpan = document.querySelectorAll('.cross-span');
let circleSpan = document.querySelector('.circle-span');

let isPlayer_O_Turn;
let player_symbol = document.querySelector('.score-player-symbol');
let pc_symbol = document.querySelector('.score-pc-symbol');

let cross = "X";
let circle = "O";

let player;
let pc;

// to keep track of if computer goes first or someone else
let goFirst;

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

/* Functionality for when specific square is clicked */
let cells = document.querySelectorAll('.base-child');

// need array for winning combinations check based on index
let cellElements = Array.from(cells)

// replace text
let playAs = document.querySelector('.playas');

function startGame(event) {

  //prevent game start without a selection being made
  if(player === undefined || pc === undefined){
    event.preventDefault();
    playAs.innerHTML = "Please make a selection";
    playAs.style.color = "red";
  }else {
    // remove start and display game grid
    startDiv.classList.add("hidden");
    mainDiv.classList.remove("hidden");

    // return icons to original color
    crossSpan.forEach(c => {c.style.backgroundColor = "green"});
    circleSpan.style.border = "10px solid orange";
  }

  // initialise game play
  playGame()
}

buttonStart.addEventListener('click', startGame);




// this function needs to control switching between whos turn it is an execute functionality based on this
// also called in resetGrid function to start game again 
function playGame() {

  // first move - determine who goes first
  if(goFirst == "player") {
    playerMove();
  } else if( goFirst == "pc"){
    pcMove();
  }

  // need to switch between symbols
  // subsequent moves

  // resetGrid function - replay

}

// need to change this function so that playGame takes over some of the functionality
function handleClick() {

  // check who's turn it is
  let currentClass = isPlayer_O_Turn ? circle : cross;

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
    this.onmouseover = null;
}



function playerMove(){
  // add hover function for grid
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick);

    // add hover styling 
    cell.onmouseover = function() {
      this.style.boxShadow = "0px 0px 10px 2px rgba(0,0,0, 0.75)";
    };  
    
    // remove hover styling when cell contains item
    cell.onmouseleave = function() {
      this.style.boxShadow = "none";
    };
  });
}


function pcMove() {
  // array of empty divs 
  var emptyCells = [];

  // use index in loop in case want to expand logic
  for (let i = 0; i < cells.length; i++) {
    // check if cell is empty
    if (!cells[i].classList.contains(circle) || !cells[i].classList.contains(cross)) {
      emptyCells.push(cells[i])     
    }
  }

  // get a random number 
  random = Math.ceil(Math.random() * emptyCells.length) - 1;

  // select a random div to add symbol
  if(pc === "X"){
    let c = emptyCells[random].querySelector(".cross");
    c.classList.toggle('hidden')
    c.classList.add(cross);
  }else if(pc === "O"){
    let c = emptyCells[random].querySelector(".circle");
    c.classList.toggle('hidden')
    c.classList.add(circle);
  }

};



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

// checks if every cell contains a player class, returns true if thats the case
function isDraw() {
	return cellElements.every(cell => {
		return cell.classList.contains(cross) || cell.classList.contains(circle);
	})
}



/* =========================== End game ================================= */

let winningMessageElement = document.querySelector('.endgame');
let winningMessageText = document.querySelector('#winningMessageText');

// check which player is what symbol
// keep track of score

let playerScoreDiv = document.querySelector('.score-player');
let pcScoreDiv = document.querySelector('.score-pc');
let tiesDiv = document.querySelector('.ties');


function endGame(end, classtype) {

  // get scores
  let playerScore = parseInt(playerScoreDiv.textContent);
  let pcScore = parseInt(pcScoreDiv.textContent);
  let ties = parseInt(tiesDiv.textContent);

  if (end === true){

    if(classtype === "X" && player === "X") {
      // drawing lines function
      drawWinningLine(classtype);
      winningMessageText.textContent = "You win";
      // update score
      playerScore += 1;
      playerScoreDiv.innerHTML = playerScore
      shakeScore("player")
    } else if (classtype === "X" && pc === "X"){
        // drawing lines function
        drawWinningLine(classtype);
        winningMessageText.textContent = "PC wins";
        pcScore += 1;
        pcScoreDiv.innerHTML = pcScore
        shakeScore("pc")
    } else if(classtype === "O" && player === "O") {
      // drawing lines function
        drawWinningLine(classtype);
        winningMessageText.textContent = "You win";
        playerScore += 1;
        playerScoreDiv.innerHTML = playerScore
        shakeScore("player")
    } else if (classtype === "O" && pc === "O"){
        // drawing lines function
        drawWinningLine(classtype);
        winningMessageText.textContent = "PC wins";
        pcScore += 1;
        pcScoreDiv.innerHTML = pcScore
        shakeScore("pc")
    }
    
  } else if (end === false){
    winningMessageText.textContent = "Its a draw";
    ties += 1;
    tiesDiv.innerHTML = ties
    shakeScore("ties")
  }

  // remove hover etc from remaining cells
  cells.forEach(cell => {
      // Remove the click event listener for cell
      cell.removeEventListener('click', handleClick);

      // remove hover styling 
      cell.onmouseover = null;
  });

  // show winning message
  setTimeout(() => {
    winningMessageElement.classList.remove('hidden');
  }, 1000);
}



function drawWinningLine(symbol) {

  // add line div main grid in html
  let board = document.querySelector(".main-grid");
  let line = document.createElement('div');

  // set background colour based on symbol
  if ( symbol === "X") {
    line.style.backgroundColor = "green";
  } else{
    line.style.backgroundColor = "orange";
  }

  // add default css styling
  line.classList.add('winning-line');

  // get winning cells to determin where to draw line 
  let winnerCells = getWin(symbol);    

  const firstCell = cells[winnerCells[0]];
  const lastCell = cells[winnerCells[2]];

  // get coordinates for positioning - values are relative to viewport
  let boardRect = board.getBoundingClientRect();
  let fcRect = firstCell.getBoundingClientRect();
  let lcRect = lastCell.getBoundingClientRect();

  // line type combinations
  hlineCombo = [[0, 1, 2],[3, 4, 5],[6, 7, 8]];
  vlineCombo = [[0, 3, 6],[1, 4, 7],[2, 5, 8]];

  // might need seperate dlines so that rotation works properly
  dlineCombo = [[0, 4, 8],[2, 4, 6]];

  // check for line combinations
  isHline = lineContain(hlineCombo,winnerCells);
  isVline = lineContain(vlineCombo,winnerCells);
  isDline = lineContain(dlineCombo,winnerCells);
  
  // since coords are give in viewport terms, need to subtract board coords 
  // add commented to set the position to the center of the cells
  if(isHline) {
    line.style.top = `${(fcRect.top + (fcRect.height /2)) - boardRect.top - 5}px`; 
    line.style.left = `${fcRect.left - boardRect.left}px`; // + (fcRect.width / 2)
    line.style.width = `${lcRect.right - fcRect.left }px`; // - (fcRect.width)
    line.style.height = "15px";

  } else if (isVline){
    line.style.top = `${(fcRect.top ) - boardRect.top}px`; // + (fcRect.height /2)
    line.style.left = `${(fcRect.left + (fcRect.width / 2)) - boardRect.left- 8}px`; 
    line.style.height = `${lcRect.bottom - fcRect.top }px`; // - fcRect.height
    line.style.width = "15px";

  } else if (isDline){
    // from top left to bottom right diag
    if(fcRect.x <= lcRect.x){
      line.style.top = `${(fcRect.top - boardRect.top)}px`; //+ (fcRect.height /2))
      line.style.left = `${(fcRect.left - boardRect.left) + 10}px`; // + (fcRect.width /2)) 
      line.style.width = `${lcRect.left - fcRect.left + (lcRect.width * 2) + 10}px`;
      line.style.height = "15px";
      line.style.transform = `rotate(45deg)`;
      line.style.transformOrigin = `top left`;
      
    } else if (fcRect.x >= lcRect.x){
      line.style.top = `${fcRect.top  - boardRect.top }px`; // + (fcRect.height /2)
      line.style.left = `${fcRect.left  - boardRect.left + fcRect.width - 10 }px`; // + fcRect.width / 2
      line.style.height = `${fcRect.left - lcRect.left + (fcRect.width * 2) + 10}px`; 
      line.style.width = "15px";
      line.style.transform = `rotate(45deg)`;
      line.style.transformOrigin = `top left`;    
    }
  }

  board.appendChild(line);

}

// returns true or false - to determine what line to draw
function lineContain(lineArrays,winningArray) {
  const isContained = lineArrays.some(array => {
    return array.length === winningArray.length && array.every((value, index) => {
      return value === winningArray[index];
    });
  });
  return isContained;
}


// make the scoreboard box shake 
let boxPlayer = document.querySelector(".section-player");
let boxPC = document.querySelector(".section-pc");
let boxTies = document.querySelector(".section-ties");


function shakeScore(type){
  if (type === "player"){
    boxPlayer.classList.add('shake');
  } else if(type == "pc"){
    boxPC.classList.add('shake');
  } else if(type == "ties"){
    boxTies.classList.add('shake');
  }
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

    playGame();
    /* replace this with startGame function 
    // Add the click event listener back to all cells
    cell.addEventListener('click', handleClick);

    // add hover styling when cell contains item
    cell.onmouseover = function() {
      this.style.boxShadow = "0px 0px 10px 2px rgba(0,0,0, 0.75)";
    };  

    // add hover styling when cell contains item
    cell.onmouseleave = function() {
      this.style.boxShadow = "none";
    }; */

  });

  // remove winning line
  let wl = document.querySelector('.winning-line'); 
  if (wl !== null) {
    wl.remove();
  }

  // remove box shake
  boxPlayer.classList.remove('shake');
  boxPC.classList.remove('shake');
  boxTies.classList.remove('shake');

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

  playAs.innerHTML = "Play as:";
  playAs.style.color = "black";
}

buttonQuit.addEventListener('click', quitGame);

