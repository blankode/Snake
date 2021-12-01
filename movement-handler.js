//repeat interval
let repeatMove = null, speed = null;

//avoid collision
let currentDirection = null, previousDirection = null;

//listen to keyboard inputs so we can move the snake
document.addEventListener('keydown', function(event) {
    if (score != null) {
        clearInterval(repeatMove);
        if((event.key === 'A' || event.key === 'a' || event.key === 'ArrowLeft') && previousDirection !== 'right') {
            currentDirection = 'left';
            repeatMove = setInterval(moveLeft, speed);
        } else if((event.key === 'D' || event.key === 'd' || event.key === 'ArrowRight') && previousDirection !== 'left') {
            currentDirection = 'right';
            repeatMove = setInterval(moveRight, speed);
        } else if ((event.key === 'S' || event.key === 's' || event.key === 'ArrowDown') && previousDirection !== 'up') {
            currentDirection = 'down';
            repeatMove = setInterval(moveDown, speed);
        } else if ((event.key === 'W' || event.key === 'w' || event.key === 'ArrowUp') && previousDirection !== 'down') {
            currentDirection = 'up';
            repeatMove = setInterval(moveUp, speed);
        } else {
            if (previousDirection === 'left') {
                repeatMove = setInterval(moveLeft, speed);
            } else if (previousDirection === 'right') {
                repeatMove = setInterval(moveRight, speed);
            } else if (previousDirection === 'down') {
                repeatMove = setInterval(moveDown, speed);
            } else if (previousDirection === 'up') {
                repeatMove = setInterval(moveUp, speed);
            }
        }
        previousDirection = currentDirection;
    }
});

//snake movement
function moveLeft() {
    if (headY <= -1) {
        gameOver('wall');
    }
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
    } else if (document.getElementById(headX + `,` + headY).classList.contains('body') || document.getElementById(headX + `,` + headY).classList.contains('tail')) {
        gameOver('body');
    } else if (headY <= -1) {
        gameOver('wall');
    }
    refreshSnake();
}

function moveRight() {
    if (headY >= tableSize) {
        gameOver('wall');
    }
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
    } else if (document.getElementById(headX + `,` + headY).classList.contains('body') || document.getElementById(headX + `,` + headY).classList.contains('tail')) {
        gameOver('body');
    }
    refreshSnake();
}

function moveDown() {
    if (headX >= tableSize) {
        gameOver('wall');
    }
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
    } else if (document.getElementById(headX + `,` + headY).classList.contains('body') || document.getElementById(headX + `,` + headY).classList.contains('tail')) {
        gameOver('body');
    }
    refreshSnake();
}

function moveUp() {
    if (headX <= -1) {
        gameOver('wall');
    }
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
    } else if (document.getElementById(headX + `,` + headY).classList.contains('body') || document.getElementById(headX + `,` + headY).classList.contains('tail')) {
        gameOver('body');
    }
    refreshSnake();
}