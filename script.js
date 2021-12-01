//load table and generate snake/food
document.addEventListener('DOMContentLoaded', function() {
    makeTable();
    refreshSnake();
    generateFood();
}, false);

//score (apples eaten)
let score = 0;

//snake body
let snake = ['5,5','5,6','5,7'];

//snake head coordinates
let headX = 5, headY = 7;

//snake tail coordinates
let tailX = 5, tailY = 5;

//table size - 1
let tableSize = 25;

//generate table
function makeTable() {
    let table = `<table>`;
    for (let i = 0; i < tableSize; ++i) {
        table += `<tr>`;
        for (let j = 0; j < tableSize; ++j) {
            table += `<td id="`+ i +`,`+ j +`"></td>`;
        }
        table += `</tr>`;
    }
    table += `</table>`;
    document.getElementById(`playGround`).innerHTML = table;
}


//snake table refresh (movement effect)
function refreshSnake() {
    for (let i = 0; i < tableSize; ++i) {
        for (let j = 0; j < tableSize; ++j) {
            if (!(document.getElementById(i + `,` + j).classList.contains('food'))) {
                document.getElementById(i + `,` + j).classList = '';
            }
        }
    }
    for (let i = 0; i < snake.length; ++i) {
        let coordinates = snake[i];
        let index = coordinates.indexOf(",");
        let x = coordinates.substr(0, index);
        let y = coordinates.substr(index + 1);
        //rotateSnake(x, y);
        if (i === snake.length - 1) {
            document.getElementById(x + `,` + y).classList.add('head');
        } else if (i === 0) {
            document.getElementById(x + `,` + y).classList.add('tail');
        } else {
            document.getElementById(x + `,` + y).classList.add('body');
        }
    }
}

/*
//snake image rotation
function rotateSnake(x, y) {
    if (currentDirection === 'left') {
        document.getElementById(x + `,` + y).style.transform = "rotate(90deg)";
    } else if (currentDirection === 'right') {
        document.getElementById(x + `,` + y).style.transform = "rotate(270deg)";
    } else if (currentDirection === 'up') {
        document.getElementById(x + `,` + y).style.transform = "rotate(180deg)";
    } else if (currentDirection === 'down') {
        document.getElementById(x + `,` + y).style.transform = "rotate(0deg)";
    }
}
*/

function refreshHeadCoordinates() {
    let coordinates = snake[snake.length - 1];
    let index = coordinates.indexOf(",");
    headX = coordinates.substr(0, index);
    headY = coordinates.substr(index + 1);
}

function refreshTailCoordinates() {
    let tail = snake[snake.length - 1];
    let index = tail.indexOf(",");
    tailX = tail.substr(0, index);
    tailY = tail.substr(index + 1);
    document.getElementById(tailX + `,` + tailY).classList = '';
}

//snake movement
function moveLeft() {
    refreshHeadCoordinates();
    --headY;
    snake.shift();
    snake.push(headX + `,` + headY);
    if (document.getElementById(headX + `,` + headY).classList.contains('food')) {
        refreshTailCoordinates();
        --tailY;
        snake.push(tailX + `,` + tailY);
        ++score;
        generateFood();
    }
    refreshSnake();
}

function moveRight() {
    refreshHeadCoordinates();
    ++headY;
    snake.shift();
    snake.push(headX + `,` + headY);
    if (document.getElementById(headX + `,` + headY).classList.contains('food')) {
        refreshTailCoordinates();
        ++tailY;
        snake.push(tailX + `,` + tailY);
        ++score;
        generateFood();
    }
    refreshSnake();
}

function moveDown() {
    refreshHeadCoordinates();
    ++headX;
    snake.shift();
    snake.push(headX + `,` + headY);
    if (document.getElementById(headX + `,` + headY).classList.contains('food')) {
        refreshTailCoordinates();
        ++tailX;
        snake.push(tailX + `,` + tailY);
        ++score;
        generateFood();
    }
    refreshSnake();
}

function moveUp() {
    refreshHeadCoordinates();
    --headX;
    snake.shift();
    snake.push(headX + `,` + headY);
    if (document.getElementById(headX + `,` + headY).classList.contains('food')) {
        refreshTailCoordinates();
        --tailX;
        snake.push(tailX + `,` + tailY);
        ++score;
        generateFood();
    } else if (document.getElementById(headX + `,` + headY).classList.contains('body')) {

    } else if (document.getElementById(headX + `,` + headY).classList.contains('tail')) {

    }
    refreshSnake();
}

//food generation
function getFoodCoordinates(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function generateFood() {
    document.getElementById("score").innerText = score;
    let collision = false;
    let fX = getFoodCoordinates(1, (tableSize - 1));
    let fY = getFoodCoordinates(1, (tableSize - 1));
    for (let i = 0; i < snake.length; ++i) {
        let coordinates = snake[i];
        let index = coordinates.indexOf(",");
        let x = coordinates.substr(0, index);
        let y = coordinates.substr(index + 1);
        if (fX === x && fY === y) {
            collision = true;
        }
    }
    console.log(fX, fY);
    if (collision === false) {
        document.getElementById(fX + `,` + fY).classList.add('food');
    } else {
        generateFood();
    }
}