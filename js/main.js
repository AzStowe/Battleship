
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
