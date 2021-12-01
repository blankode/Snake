//score (apples eaten)
let score = 0;

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

function easyMode() {
    document.getElementById(`gameMode`).innerHTML = `Score: <strong id="score"></strong>`;
    document.getElementById(`playGround`).innerHTML = ``;
    makeTable();
    refreshSnake();
    generateFood();
    speed = 150;
}

function hardMode() {
    document.getElementById(`gameMode`).innerHTML = `Score: <strong id="score"></strong>`;
    document.getElementById(`playGround`).innerHTML = ``;
    makeTable();
    refreshSnake();
    generateFood();
    speed = 50;
}

function insaneMode() {
    document.getElementById(`gameMode`).innerHTML = `Score: <strong id="score"></strong>`;
    document.getElementById(`playGround`).innerHTML = ``;
    makeTable();
    refreshSnake();
    generateFood();
    speed = 25;
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
    if (!collision) {
        document.getElementById(fX + `,` + fY).classList.add('food');
    } else {
        generateFood();
    }
}