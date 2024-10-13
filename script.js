// make the grid
const grid = document.getElementById('grid');
const numSquares = 288 * 288;

// make squares and put em on the grid
for (let i = 0; i < numSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('data-id', i); // Give each square a unique ID
    square.addEventListener('click', () => changeSquare(i));
    grid.appendChild(square);
}

// function to change the color of a square
function changeSquare(squareId) {
    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Random color

    // send new color and squareId to the server
    fetch(`change_square.php?id=${squareId}&color=${newColor}`).then(() => {
        document.querySelector(`[data-id='${squareId}']`).style.backgroundColor = newColor;
    });
}

// long polling to check for updates on squares
function checkForUpdates() {
    fetch('squares.txt').then(response => response.json()).then(squares => {
        for (const id in squares) {
            const color = squares[id];
            document.querySelector(`[data-id='${id}']`).style.backgroundColor = color;
        }
    });
}

setInterval(checkForUpdates, 1000); // Poll every second
