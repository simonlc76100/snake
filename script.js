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
  let gameMatrix = new Array(rows).fill().map(() => new Array(cellsPerRow));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cellsPerRow; j++) {
      gameMatrix[i][j] = cells[i * cellsPerRow + j];
    }
  }
  return gameMatrix;
}

function main() {
  let rows = 50;
  let cellsPerRow = 80;
  createGameWindow(rows, cellsPerRow);
  const cells = document.querySelectorAll('td[id^="cell_"]');
  let gameMatrix = getGameMatrix(cells, rows, cellsPerRow);
  console.log(gameMatrix);
}

document.addEventListener("DOMContentLoaded", main);
