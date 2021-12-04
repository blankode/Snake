//score (targets eaten)
let score = null;

//game
let eatSound = new Audio('./sounds/eat.mp3');
let deathSound = new Audio('./sounds/gameOver.mp3');

//table size - 1
let tableSize = 25;

//generate table
function makeTable() {
    let table = `<table>`;
    for (let i = 0; i < tableSize; ++i) {
        table += `<tr>`;
        for (let j = 0; j < tableSize; ++j) {
            table += `<td id="` + i + `,` + j + `"></td>`;
        }
        table += `</tr>`;
    }
    table += `</table>`;
    document.getElementById(`playGround`).innerHTML = table;
}

function startGame(hardness) {
    speed = hardness;
    score = 0;
    document.getElementById(`gameMode`).innerHTML = `Score: <strong id="score"></strong>`;
    document.getElementById(`playGround`).innerHTML = ``;
    makeTable();
    refreshSnake();
    generateFood();
}

//food generation
function getCoordinates(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateFood() {
    document.getElementById("score").innerText = score;
    let collision = false;
    let fX = getCoordinates(1, (tableSize - 1));
    let fY = getCoordinates(1, (tableSize - 1));
    for (let i = 0; i < snake.length; ++i) {
        let coordinates = snake[i];
        let index = coordinates.indexOf(",");
        let x = coordinates.substr(0, index);
        let y = coordinates.substr(index + 1);
        if (fX === x && fY === y) {
            collision = true;
        }
    }
    if (!collision) {
        document.getElementById(fX + `,` + fY).classList.add('food');
    } else {
        generateFood();
    }
}

function gameOver(status) {
    clearInterval(repeatMove);
    deathSound.play();
    document.getElementById(`gameMode`).innerHTML = `<div class="alert alert-bg" role="alert"><h3>Game Over<br> You have scored  <strong id="score">` + score + `</strong>
    </h3></div>`;
    document.getElementById(`playGround`).innerHTML = `
    <button type="button" class="btn button-bg" onclick="location.reload();">Try again!</button>
    `;
}