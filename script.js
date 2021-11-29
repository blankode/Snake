//snake body
let snake = ['5,5','5,6','5,7'];

//snake head coordinates
let headX = 5, headY = 7;

//snake tail coordinates
let tailX = 5, tailY = 5;

//generate table
function makeTable() {
    let table = `<table>`;
    for (let i = 0; i < 16; ++i) {
        table += `<tr>`;
        for (let j = 0; j < 16; ++j) {
            table += `<td id="`+ i +`,`+ j +`"></td>`;
        }
        table += `</tr>`;
    }
    table += `</table>`;
    document.getElementById(`playGround`).innerHTML = table;
}


//snake table refresh (movement effect)
function refreshSnake() {
    for (let i = 0; i < 16; ++i) {
        for (let j = 0; j < 16; ++j) {
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
        if (i === 0) {
            document.getElementById(x + `,` + y).classList.add('tail');
        } else if (i === snake.length - 1) {
            document.getElementById(x + `,` + y).classList.add('head');
        } else {
            document.getElementById(x + `,` + y).classList.add('body');
        }
        
    }
}

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
    let collision = false;
    let fX = getFoodCoordinates(1, 15);
    let fY = getFoodCoordinates(1, 15);
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
    if (!collision) {
        document.getElementById(fX + `,` + fY).classList.add('food');
    } else {
        generateFood();
    }
}