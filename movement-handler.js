//repeat interval
let repeatMove = null, speed = 100;

//avoid collision
let currentDirection = null, previousDirection = null;

//listen to keyboard inputs so we can move the snake
document.addEventListener('keydown', function(event) {
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
});