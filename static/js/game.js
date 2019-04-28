function checkCell () {
    return event.target.innerHTML
}

function getNumberOfCols() {
    return parseInt(gameBoard.dataset.colNum)
}

function getNumberOfRows() {
    return parseInt(gameBoard.dataset.rowNum)
}

function putMark () {
    if (!checkCell()) {
        if (playerTurn) {
            playerTurn = !playerTurn;
            event.target.innerHTML = `O`;
            currentPlayer.innerText = "Choose a square 'X'";
        }
        else {
            playerTurn = !playerTurn;
            event.target.innerHTML = `X`;
            currentPlayer.innerText = "Choose a square 'O'";
        }
    }
}


function getSquareDom (x, y) {
    return document.querySelector("[data-coordinate-y=" + CSS.escape(String(y)) + "]" +
                                           "[data-coordinate-x=" + CSS.escape(String(x)) + "]"
    );
}


function checkDiagonal (x, y, pointsToWin, mark) {
    let counter = 0;

    let countingY = y;
    for (let i = parseInt(x); i < (parseInt(x) + pointsToWin); i++) {  //checks down/right
        try {
            if (getSquareDom(i, countingY).innerHTML === mark) {
                countingY += 1;
                counter += 1;
                if (counter === pointsToWin) {
                    return true
                }
            } else {
                break;
            }
        } catch (e) {
            console.log('caught index error');
            break;
        }
    }

    counter = 0;
    countingY = y;
    for (let i = parseInt(x); i < (parseInt(x) + pointsToWin); i++) {  //checks down/left
        try {
            if (getSquareDom(i, countingY).innerHTML === mark) {
                countingY -= 1;
                counter += 1;
                if (counter === pointsToWin) {
                    return true
                }
            } else {
                break;
            }
        } catch (e) {
            console.log('caught index error');
            break;
        }
    }

    counter = 0;
    let countingX = x;
    countingY = y;
    for (let i = parseInt(x); i < (parseInt(x) + pointsToWin); i++) {  //checks up/right
        try {
            if (getSquareDom(countingX, countingY).innerHTML === mark) {
                countingX -= 1;
                countingY += 1;
                counter += 1;
                if (counter === pointsToWin) {
                    return true
                }
            } else {
                break;
            }
        } catch (e) {
            console.log('caught index error');
            break;
        }
    }

    counter = 0;
    countingX = x;
    countingY = y;
    for (let i = parseInt(x); i < (parseInt(x) + pointsToWin); i++) {  //checks up/left
        try {
            if (getSquareDom(countingX, countingY).innerHTML === mark) {
                countingX -= 1;
                countingY -= 1;
                counter += 1;
                if (counter === pointsToWin) {
                    return true
                }
            } else {
                break;
            }
        } catch (e) {
            console.log('caught index error');
            break;
        }
    }
    return false;
}

function checkHorizontal (x, y, pointsToWin, mark) {
    let counter = 0;


    for (let i = parseInt(x); i < (parseInt(x) + pointsToWin); i++) {  //checks down
        try {
            if (getSquareDom(i, y).innerHTML === mark) {
                counter += 1;
                if (counter === pointsToWin) {
                    return true
                }
            }
            else {
                break;
            }
        }
        catch (e) {
            console.log('caught index error');
            break;
        }
    }
    counter = 0;
    for (let i = parseInt(x); i > (parseInt(x) - pointsToWin); i--) {  //checks up
        try {
            if (getSquareDom(i, y).innerHTML === mark) {
                counter += 1;
                if (counter === pointsToWin) {
                    return true
                }
            }
            else {
                counter = 0;
                break;
            }
        }
        catch (e) {
            console.log('caught index error');
            break;
        }
    }
    return false
}

function checkVertical (x, y, pointsToWin, mark) {
    let counter = 0;


    for (let i = parseInt(y); i < (parseInt(y) + pointsToWin); i++) {  //checks right
        try {
            if (getSquareDom(x, i).innerHTML === mark) {
                counter += 1;
                if (counter === pointsToWin) {
                    return true
                }
            }
            else {
                break;
            }
        }
        catch (e) {
            console.log('caught index error');
            break;
        }
    }
    counter = 0;
    for (let i = parseInt(y); i > (parseInt(y) - pointsToWin); i--) {  //checks left
        try {
            if (getSquareDom(x, i).innerHTML === mark) {
                counter += 1;
                if (counter === pointsToWin) {
                    return true
                }
            }
            else {
                counter = 0;
                break;
            }
        }
        catch (e) {
            console.log('caught index error');
            break;
        }
    }
    return false
}


function winChecker() {
    let mark = event.target.innerHTML;
    const pointsToWin = parseInt(gameBoard.dataset.winSize); //parseInt kene
    let x = event.target.dataset.coordinateX; //parseInt kene
    let y = event.target.dataset.coordinateY; //parseInt kene
    if (checkHorizontal(x, y, pointsToWin, mark) ||
        checkVertical(x, y, pointsToWin, mark) ||
        checkDiagonal(x, y, pointsToWin, mark)) {
        for (gameCell of gameCells) {
            gameCell.removeEventListener('click', putMark);
        }
        alert(mark + ' has won the game!');
        for (gameCell of gameCells) {
            gameCell.removeEventListener('click', winChecker);
        }
    }
}

function clearCells () {
    location.reload()
}


const gameCells = document.getElementsByClassName('game-cell');
const gameBoard = document.getElementById('game-board');
const retryButton = document.getElementById('retry-button');
const currentPlayer = document.getElementById('player-turn');
let playerTurn = 0;


retryButton.addEventListener('click', clearCells);
for (gameCell of gameCells) {
    gameCell.addEventListener('click', putMark);
    gameCell.addEventListener('click', winChecker);
}