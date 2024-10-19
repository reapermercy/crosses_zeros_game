let player = 'X';
let gameField = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let scoreX = 0, scoreO = 0;
const winX = new Audio('sound/bigboss.mp3');
const winO = new Audio('sound/callsaul.mp3');
const draw = new Audio('sound/walter.mp3');

function drawField() {
    const field = document.getElementById('field');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        field.appendChild(cell);
    }
}

function handleClick(event) {
    if (gameOver) return;
    const cell = event.target;
    const cellIndex = parseInt(cell.dataset.index);
    if (gameField[cellIndex] === '') {
        gameField[cellIndex] = player;
        cell.style.backgroundImage = player === 'X' ? 'url("images/bigboss.jpg")' : 'url("images/saulgoodman.png")';
        player = player === 'X' ? 'O' : 'X';
        document.getElementById('player').textContent = `Сейчас ходит: ${player}`;
        if (checkWin()) {
            gameOver = true;
            if (player === 'O') {
                winX.play();
                scoreX++;
                document.getElementById('scoreX').textContent = scoreX;
            } 
            else {
                winO.play();
                scoreO++;
                document.getElementById('scoreO').textContent = scoreO;
            }
            document.getElementById('gameResult').textContent = `Победил ${player = player === 'X' ? 'O' : 'X'}!`;
        }
        else if (checkDraw()) {
            gameOver = true;
            draw.play();
            document.getElementById('gameResult').textContent = 'Ничья!';
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.style.backgroundImage = 'url("images/walter.jpg")';
            });
        }
        if (cell.style.backgroundImage) {
            return;
        }
        if (player === 'X') {
            cell.style.backgroundImage = 'url("images/bigboss.jpg")';
        } 
        else {
            cell.style.backgroundImage = 'url("images/saulgoodman.png")';
        }
    player = player === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winComb = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winComb) {
        if (gameField[combo[0]] !== '' &&
        gameField[combo[0]] === gameField[combo[1]] &&
        gameField[combo[0]] === gameField[combo[2]]
        ) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return !gameField.includes('');
}

function nextRound() {
    winX.pause();
    winX.currentTime = 0;
    winO.pause();
    winO.currentTime = 0;
    draw.pause();
    draw.currentTime = 0;
    player = 'X';
    gameField = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    document.getElementById('player').textContent = `Сейчас ходит: ${player}`;
    document.getElementById('gameResult').textContent = 'Результат';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
    cell.style.backgroundImage = '';
    });
}

function resetScore() {
    scoreX = 0;
    scoreO = 0;
    document.getElementById('scoreX').textContent = scoreX;
    document.getElementById('scoreO').textContent = scoreO;
}


drawField();

const nextR = document.getElementById('nextRound');
nextR.addEventListener('click', nextRound);

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetScore);
resetBtn.addEventListener('click', nextRound);