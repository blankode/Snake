//snake body
let snake = ['5,5','5,6','5,7'];

//snake head coordinates
let headX = 5, headY = 7;

//snake tail coordinates
let tailX = 5, tailY = 5;

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