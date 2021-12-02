//repeat interval
let repeatMove = null,
    speed = null;

//avoid collision
let currentDirection = null,
    previousDirection = 'right';

//listen to keyboard inputs so we can move the snake
document.addEventListener('keydown', function (event) {
    //starts movement repetition
    if (currentDirection === null) {
        repeatMove = setInterval(moveSnake, speed);
    }
        if ((event.key === 'A' || event.key === 'a' || event.key === 'ArrowLeft') && previousDirection !== 'right') {
            currentDirection = 'left';
        } else if ((event.key === 'D' || event.key === 'd' || event.key === 'ArrowRight') && previousDirection !== 'left') {
            currentDirection = 'right';
        } else if ((event.key === 'S' || event.key === 's' || event.key === 'ArrowDown') && previousDirection !== 'up') {
            currentDirection = 'down';
        } else if ((event.key === 'W' || event.key === 'w' || event.key === 'ArrowUp') && previousDirection !== 'down') {
            currentDirection = 'up';
        }
        previousDirection = currentDirection;
});

//snake movement
function moveSnake() {
    if (headY <= -1 || headX <= -1 || headY >= tableSize || headX >= tableSize) {
        gameOver('wall');
    }
    refreshHeadCoordinates();
    if (currentDirection === 'left') {
        --headY;
    } else if (currentDirection === 'right') {
        ++headY;
    } else if (currentDirection === 'down') {
        ++headX;
    } else if (currentDirection === 'up') {
        --headX;
    }
    snake.shift();
    snake.push(headX + `,` + headY);
    if (document.getElementById(headX + `,` + headY).classList.contains('food')) {
        refreshTailCoordinates();
        if (currentDirection === 'left') {
            --tailY;
        } else if (currentDirection === 'right') {
            ++tailY;
        } else if (currentDirection === 'down') {
            ++tailX;
        } else if (currentDirection === 'up') {
            --tailX;
        }
        snake.push(tailX + `,` + tailY);
        ++score;
        generateFood();
    } else if (document.getElementById(headX + `,` + headY).classList.contains('body') || document.getElementById(headX + `,` + headY).classList.contains('tail')) {
        gameOver('body');
    }
    refreshSnake();
}