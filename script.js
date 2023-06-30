function createGameWindow(rows, cellsPerRow) {
  const game = document.getElementById("game-window");
  for (let i = 0; i < rows; i++) {
    const row = game.insertRow(i);
    row.id = "row_" + i;
    for (let j = 0; j < cellsPerRow; j++) {
      const cell = row.insertCell(j);
      cell.id = "cell_" + i + "_" + j;
    }
  }
}

function getGameMatrix(cells, rows, cellsPerRow) {
  let gameMatrix = new Array(rows)
    .fill()
    .map(() => new Array(cellsPerRow).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cellsPerRow; j++) {
      if (cells[i * cellsPerRow + j].textContent === "") gameMatrix[i][j] = 0;
      else {
        gameMatrix[i][j] = cells[i * cellsPerRow + j].textContent;
      }
    }
  }
  return gameMatrix;
}

function createSnake(gameMatrix, snake) {
  gameMatrix[snake.i][snake.j] = 1;
  console.log("initial snake pos", gameMatrix);
}

function main() {
  let rows = 50;
  let cellsPerRow = 80;

  let snake = {
    i: 9,
    j: 9,
  };

  createGameWindow(rows, cellsPerRow);
  const cells = document.querySelectorAll('td[id^="cell_"]');
  let gameMatrix = getGameMatrix(cells, rows, cellsPerRow);

  createSnake(gameMatrix, snake);
}

document.addEventListener("DOMContentLoaded", main);
