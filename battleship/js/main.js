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

  for(var i = 0; i < this.numShips; i++) {
    var ship = this.ships[i];
    var index = ship.locations.indexOf(guess);

    // check if a ship location has already been hit
    if ( ship.hits[index] === "hit" ) {
      view.displayMessage("Oops, you already hit that location");
      return true;
    } else if ( index >= 0 ) {
      ship.hits[index] = "hit";
      view.displayHit(guess);
      view.displayMessage("HIT!");

      if ( this.isSunk(ship) ) {
        view.displayMessage("You sank my battleship!");
        this.shipsSunk++;
      }
      return true;
    }
  }
  view.displayMiss(guess);
  view.displayMessage("You Missed");
  return false;
},

isSunk: function(ship) {
  for (var i = 0; i < this.shipLength; i++) {
    if (ship.hits[i] !== "hit") {
      return false;
    }
  }
  return true;
},
}




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

init();

//click function to register the input
function getGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Please enter a letter and a number on the board.");
	} else {
		let firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
		let column = guess.charAt(1);
		if (isNaN(row) || isNaN(column)) {
			alert("That isn't on the board.");
		} else if (row < 0 || row >= 6 || column <= 0 || column >= 6) {
				alert("That's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

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