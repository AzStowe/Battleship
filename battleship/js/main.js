/*----- constants -----*/
let model = {
    numShips: 3,
    shipLength: 3,
    boardSize: 7,
    shipsSunk: 0,
}

ships: [
    {locations: [0, 0, 0,], hits: ['', '', '']},
    {locations: [0, 0, 0,], hits: ['', '', '']},
    {locations: [0, 0, 0,], hits: ['', '', '']},
];


/*----- app's state (variables) -----*/
let winner, board, turn;

/*----- cached element references -----*/


/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', handleFire);

/*----- functions -----*/

init();

//click function to register the input
function handleFire {

}

function init() {
    board = [
      [0, 0, 0, 0, 0, 0],  // column 1
      [0, 0, 0, 0, 0, 0],  // column 2
      [0, 0, 0, 0, 0, 0],  // column 3
      [0, 0, 0, 0, 0, 0],  // column 4
      [0, 0, 0, 0, 0, 0],  // column 5
      [0, 0, 0, 0, 0, 0],  // column 6
      [0, 0, 0, 0, 0, 0],  // column 7
    ];
    render();
  }