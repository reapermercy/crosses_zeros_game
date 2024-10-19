let currentPlayer = 'X';

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
const cell = event.target;
if (cell.style.backgroundImage) {
return;
}
if (currentPlayer === 'X') {
cell.style.backgroundImage = 'url("images/bigboss.jpg")';

} else {
cell.style.backgroundImage = 'url("images/soulgoodman.png")';
}
currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

drawField();
