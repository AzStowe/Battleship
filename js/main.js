<<<<<<< HEAD
/*----- constants -----*/
let model = {
    numShips: 3,
    shipLength: 3,
    boardSize: 7,
    shipsSunk: 0,
    
    ships: [
    {locations: [0, 0, 0,], hits: ['', '', '']},
    {locations: [0, 0, 0,], hits: ['', '', '']},
    {locations: [0, 0, 0,], hits: ['', '', '']},
],

fire: function(guess) {

  for(let i = 0; i < this.numShips; i++) {
    let ship = this.ships[i];
    let index = ship.locations.indexOf(guess);

    // check if a ship location has already been hit
    if ( ship.hits[index] === "hit" ) {
      view.displayMessage("You already tried that");
      return true;
    } else if ( index >= 0 ) {
      ship.hits[index] = "hit";
      view.displayHit(guess);
      view.displayMessage("HIT!");

      if (this.isSunk(ship) ) {
        view.displayMessage("You sank my battleship!");
        this.shipsSunk++;
      }
      return true;
    }
  }
  view.displayMiss(guess);
  view.displayMessage("You Missed!");
  return false;
},

isSunk: function(ship) {
  for (let i = 0; i < this.shipLength; i++) {
    if (ship.hits[i] !== "hit") {
      return false;
    }
  }
  return true;
},

generateShipLocations: function() {
  let locations;
  for (let i = 0; i < this.numShips; i++) {
  do {
      locations = this.generateShip();
  } while (this.collision(locations));
    this.ships[i].locations = locations;
  }
},

generateShip: function() {
  let direction = Math.floor(Math.random() * 2);
  let row, col;

  if (direction === 1) { // horizontal
    row = Math.floor(Math.random() * this.boardSize);
    col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
  } else { // vertical
    row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    col = Math.floor(Math.random() * this.boardSize);
  }

  let newShipLocations = [];

  for (let i = 0; i < this.shipLength; i++) {
    if (direction === 1) {
      newShipLocations.push(row + "" + (col + i));
    } else {
      newShipLocations.push((row + i) + "" + col);
    }
  }
  return newShipLocations;
},

collision: function(locations) {
  for (let i = 0; i < this.numShips; i++) {
    let ship = this.ships[i];
    for (let j = 0; j < locations.length; j++) {
      if (ship.locations.indexOf(locations[j]) >= 0) {
        return true;
      }
    }
  }
  return false;
}
};

let view = {
	displayMessage: function(msg) {
		let messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		let cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayMiss: function(location) {
		let cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};

let controller = {
	guesses: 0,

	processGuess: function(guess) {
		let location = getGuess(guess);

		if (location) {

			let hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships!");
			}
		}
	}
};

/*----- app's state (variables) -----*/
let winner, board, turn;

/*----- cached element references -----*/


/*----- event listeners -----*/
function handleFireButton() {
	let guessInput = document.getElementById("guessInput");
	let guess = guessInput.value.toUpperCase();
	controller.processGuess(guess);
	guessInput.value = "";
}
/*----- functions -----*/


//click function to register the input
function getGuess(guess) {
	let letters = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Please enter a letter and a number listed on the board.");
	} else {
		let firstChar = guess.charAt(0);
		let row = letters.indexOf(firstChar);
		let column = guess.charAt(1);
		if (isNaN(row) || isNaN(column)) {
			alert("That isn't on the board.");
		} else if (row < 0 || row >= 7 || column <= 0 || column >= 8) {
				alert("That's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

window.onload = init;

function init() {
	// Fire! button onclick handler
	let fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	// place the ships on the game board
	model.generateShipLocations();
}
=======
/*--Cached Elements--*/

let cells = document.querySelectorAll('.cells');
let msgElem = document.getElementById('msg');

//--State Variables--//
let board = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47, 48]
];
let square, hitCount, guess, sunkenShips, prevGuesses, hit;

let ships = {
    locations: {
        },
    hits: {
        }
}

init();

/*--Functions--*/


/*--Get Row--*/
function getRow() {
    var ranNum1 = Math.floor(Math.random() * (5));
    var ranNum2 = Math.floor(Math.random() * (12 - 7) + 7);
    var ranNum3 = Math.floor(Math.random() * (19 - 14) + 14);
    var ranNum4 = Math.floor(Math.random() * (40 - 35) + 35);
    let horizontalStarting = [ranNum1, ranNum2, ranNum3, ranNum4];
    let horizontalStart = horizontalStarting[Math.floor(Math.random() * horizontalStarting.length)];
    return horizontalStart;
}

/*--Get Column--*/
function getColumn() {
    let idx = Math.floor(Math.random() * (5));
    let vertIdx = board[idx][Math.floor(Math.random() * (7))];
    return vertIdx;
}

/*--Generate Ships--*/

function addShips() {
    for (let i = 0; i < 2; i++) {
        var ranNum1 = getRow();
        var ranNum2 = getColumn();
        while (ranNum1 === ranNum2 || ranNum1 === ranNum2 + 7 || ranNum1 === ranNum2 + 14 || ranNum1 + 1 === ranNum2 || ranNum1 + 1 === ranNum2 + 7 || ranNum1 + 1 === ranNum2 + 14 || ranNum1 + 2 === ranNum2 || ranNum1 + 2 === ranNum2 + 7 || ranNum1 + 2 === ranNum2 + 14) {
           ranNum2 = getColumn();
        }
    }
    ships.locations.shipOne = [ranNum1, ranNum1 + 1, ranNum1 + 2];
    ships.locations.shipTwo = [ranNum2, ranNum2 + 7, ranNum2 + 14];
}
/*--Winner Function--*/
function checkWinner() {
    if (hitCount === 6) {
        msgElem.innerHTML = "YOU WIN!";
    } else if (hitCount !== 6) {
        return;
}
}
/*--Test Hit Function--*/
function getHit() {
    if (prevGuesses.includes(guess)) {
        return;
    }
    if (ships.locations.shipOne.includes(guess)) {
        hit = true;
        prevGuesses.push(guess);
        hitCount ++;
        ships.hits.hitsOne.push(guess);
        ships.hits.hitsOne.sort(function(a, b) {
            return a - b;
        })
        if (ships.hits.hitsOne.length === 3) {
            sunkenShips ++;
            msgElem.innerText = "YOU SANK THE FIRST SHIP!";
        } document.getElementById(guess).innerText = "HIT!"
    } else if (ships.locations.shipTwo.includes(guess)) {
        hit = true;
        prevGuesses.push(guess);
        hitCount ++;
        ships.hits.hitsTwo.push(guess);
        ships.hits.hitsTwo.sort(function(a, b){
            return a - b;
        })
        if (ships.hits.hitsTwo.length === 3) {
            sunkenShips ++;
            msgElem.innerText = "YOU SANK THE SECOND SHIP!";
        }
        document.getElementById(guess).innerText = "HIT!"
    } else {
        hit = false;
        document.getElementById(guess).innerText = "MISS!"
    }
    
}
/*--Update InfoFunction--*/

function giveMessage() {
    let msgElem;
    msgElem = document.getElementById('msg');
}

/*--Display Message--*/
function hitsDisplay() {
    if (hit === true) {
        square.setAttribute("class", "hit");
    } else if (hit === false) {
        square.setAttribute("class", "miss");
    };
}
/*--Handle Event Function--*/
function handleClick(evt) {
    guess = parseInt(evt.target.id);
    square = document.getElementById(evt.target.id);
    getHit();
    giveMessage();
    hitsDisplay();
    checkWinner();
}

/*--Init Function--*/
function init() {
    prevGuesses = [];
    ships.locations.shipOne = [];
    ships.locations.shipTwo = [];
    ships.hits.hitsOne = [];
    ships.hits.hitsTwo = [];
    for (i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', handleClick);
        cells[i].setAttribute("class", "cells");
        cells[i].innerHTML = '';
};
    addShips();
}
>>>>>>> master
