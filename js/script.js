/* TODO */
// condense code
// timing of line, box shake and winning pop-up
// sounds
// styling
// make computer logic more sophisticated


/* =========================== Player selection ================================= */

// Add click event to X and O on startgame screen
// change colour when selected and assign player classes
let crossSelect = document.querySelector('.cross');
let circleSelect = document.querySelector('.circle');

// this is to change the colors
let crossSpan = document.querySelectorAll('.cross-span');
let circleSpan = document.querySelector('.circle-span');

// change scoreboard text
let player_symbol = document.querySelector('.score-player-symbol');
let pc_symbol = document.querySelector('.score-pc-symbol');


// to assign symbol based on game start selection
let cross = "X";
let circle = "O";

// to check for winning combination and allow symbol switching
let player;
let pc;

// to keep track of if computer goes first or someone else
let goFirst;

// need to refine this so its less hacky using a different method from changing style ?
function playerSelection(event, type) {
  event.preventDefault();
  if (type === cross){
    // change symbol colours
    crossSpan.forEach(c => {c.style.backgroundColor = "black"});
    circleSpan.style.border = "10px solid #5DB6AA";
    // change scoreboard text
    player_symbol.innerHTML = "Player - X";
    pc_symbol.innerHTML = " PC - O";

    player = "X";
    pc = "O";

    // who goes first
    goFirst = "player";

  } else {
    // change symbol colours
    circleSpan.style.border = "10px solid black";
    crossSpan.forEach(c => {c.style.backgroundColor = "#B75D69"});
    // change scoreboard text
    player_symbol.innerHTML = "Player - O";
    pc_symbol.innerHTML = "PC - X";

    player = "O";
    pc = "X";

    // who goes first
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
  if(goFirst === false){
    event.preventDefault();
    playAs.innerHTML = "Please make a selection";
    playAs.style.color = "red";
  }else {
    // remove start and display game grid
    startDiv.classList.add("hidden");
    mainDiv.classList.remove("hidden");

    // return icons to original color
    crossSpan.forEach(c => {c.style.backgroundColor = "#B75D69"});
    circleSpan.style.border = "10px solid #5DB6AA";

    // return text to default if 
    playAs.innerHTML = "Make your selection:";
    playAs.style.color = "black";
  }

  // initialise game play
  playGame()
}

buttonStart.addEventListener('click', startGame);

/* =========================== Game Logic ================================= */

let gameOver = false;

// first move - determine who goes first
function playGame() {
  if(goFirst === "player") {
    playerMove();
  } else if(goFirst === "pc"){
    pcMove();
  }
}

function playerMove(){
  // array of empty divs 
  var emptyCells = getEmpty();
  // add hover function for empty cells in grid
  emptyCells.forEach(cell => {
    // add hover styling 
    cell.onmouseover = function() {
      this.style.boxShadow = "0px 0px 10px 2px rgba(0,0,0, 0.75)";
    };      
    // remove hover styling when cell contains item
    cell.onmouseleave = function() {
      this.style.boxShadow = "none";
    };
    // add click event 
    cell.addEventListener('click', cellClick);
  });
}

// event for each cell for player click
function cellClick(event) {
  let cellc = event.target;
  drawPawn(player, cellc)
  winner(player);
  if (gameOver === false ) {
    setTimeout(pcMove(), 700);
  }
}


function pcMove() {
  // only allow player board interaction for non pc items
  cells.forEach(cell => { 
    cell.removeEventListener('click', cellClick);
    cell.onmouseover = null;
  });

  // array of empty divs 
  var emptyCells = getEmpty();
  // get a random number between 0 an 8 
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  pcCell = emptyCells[random];
  drawPawn(pc, pcCell)
  winner(pc);
  
  if (gameOver === false){
    playerMove()
  }
};

// make move visible on screen 
function drawPawn(pawn, cellArray) {
  if(pawn === "X"){
    let c = cellArray.querySelector(".cross");
    c.classList.toggle('hidden');
    cellArray.classList.add(cross);    
  }else if(pawn === "O"){
    let c = cellArray.querySelector(".circle");
    c.classList.toggle('hidden')
    cellArray.classList.add(circle);
  }
}

// determine empty cells
function getEmpty() {
  let emptyCells = [];
  cells.forEach(cell => {
    // check if cell is empty
    if (cell.classList.contains(circle) || cell.classList.contains(cross)) {
      // do nothing
    } else {
      emptyCells.push(cell);     
    }
  });
  return emptyCells;
}

/* =========================== End game ================================= */

// end game pop-up
let winningMessageElement = document.querySelector('.endgame');
let winningMessageText = document.querySelector('#winningMessageText');

// scoreboard
let playerScoreDiv = document.querySelector('.score-player');
let pcScoreDiv = document.querySelector('.score-pc');
let tiesDiv = document.querySelector('.ties');


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

// how to determine which winning combination to draw a line through it
// returns an array [0,1,2] with the index of the cells
function getWin(currentPawn) {
	return WINNING_COMBINATIONS.find(combination => {
		return combination.every(index => {
			 return cellElements[index].classList.contains(currentPawn);
		})
	})
}

// checks if every cell contains a player class, returns true if thats the case
function isDraw() {
	return cellElements.every(cell => {
		return cell.classList.contains(cross) || cell.classList.contains(circle);
	})
}

// checks for game end after each move
function winner(currentPawn) {
  if(getWin(currentPawn)) {
    endGameWin(currentPawn);
    gameOver = true;
  }else if (isDraw() === true){
    endGameDraw();
    gameOver = true;
  }
}

function endGameDraw() {

  let ties = parseInt(tiesDiv.textContent);
  winningMessageText.textContent = "It's a draw";
  ties += 1;
  tiesDiv.innerHTML = ties;
  shakeScore("ties");

  // show winning message
  setTimeout(() => {
    winningMessageElement.classList.remove('hidden');
  }, 500);
}

function endGameWin(classtype) {

  // get scores
  let playerScore = parseInt(playerScoreDiv.textContent);
  let pcScore = parseInt(pcScoreDiv.textContent);

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

  // show winning message
  setTimeout(() => {
    winningMessageElement.classList.remove('hidden');
  }, 500);
}

/* ================================ Winning effects ============================= */

function drawWinningLine(symbol) {

  // add line div main grid in html
  let board = document.querySelector(".main-grid");
  let line = document.createElement('div');

  // set background colour based on symbol
  if ( symbol === "X") {
    line.style.backgroundColor = "#B75D69";
  } else{
    line.style.backgroundColor = "#5DB6AA";
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

  });

  winningMessageElement.classList.add('hidden');
  gameOver = false;

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

// switch between starting player for each game when replaying game
function switchFirst() {
  if (goFirst  == 'pc') {
    goFirst = 'player';
  } else {
    goFirst = 'pc';
  }
}

function resetGame() {
  resetGrid()
  switchFirst()
  playGame();
}

buttonReplay.addEventListener('click', resetGame);


/* =========================== return to start =================================== */

let buttonQuit = document.querySelector('#quitbutton');

function quitGame() {
  resetGrid()

  // display start screen etc
  startDiv.classList.remove("hidden");
  mainDiv.classList.add("hidden");
  startDiv.classList.remove("hidden");

  // prevent button start
  goFirst = false;

  // reset score
  playerScoreDiv.innerHTML = 0
  pcScoreDiv.innerHTML = 0
  tiesDiv = 0;

}

buttonQuit.addEventListener('click', quitGame);

