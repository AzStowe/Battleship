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
	let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Please enter a letter and a number listed on the board.");
	} else {
		let firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
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



// init - called when the page has completed loading
window.onload = init;

function init() {
	// Fire! button onclick handler
	let fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	// place the ships on the game board
	model.generateShipLocations();
}