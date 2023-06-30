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
}

function moveRight(gameMatrix, snake) {
  gameMatrix[snake.i][snake.j] = 0;
  snake.previousI = snake.i;
  snake.previousJ = snake.j;
  snake.j += 1;
  gameMatrix[snake.i][snake.j] = 1;
  console.log(snake);
}

function moveleft(gameMatrix, snake) {
  gameMatrix[snake.i][snake.j] = 0;
  snake.previousI = snake.i;
  snake.previousJ = snake.j;
  snake.j -= 1;
  gameMatrix[snake.i][snake.j] = 1;
  console.log(snake);
}

function moveUp(gameMatrix, snake) {
  gameMatrix[snake.i][snake.j] = 0;
  snake.previousI = snake.i;
  snake.previousJ = snake.j;
  snake.i -= 1;
  gameMatrix[snake.i][snake.j] = 1;
  console.log(snake);
}

function moveDown(gameMatrix, snake) {
  gameMatrix[snake.i][snake.j] = 0;
  snake.previousI = snake.i;
  snake.previousJ = snake.j;
  snake.i += 1;
  gameMatrix[snake.i][snake.j] = 1;
  console.log(snake);
}

function movesHandler(gameMatrix, snake) {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowRight":
        moveRight(gameMatrix, snake);
        break;
      case "ArrowLeft":
        moveleft(gameMatrix, snake);
        break;
      case "ArrowUp":
        moveUp(gameMatrix, snake);
        break;
      case "ArrowDown":
        moveDown(gameMatrix, snake);
        break;
    }
  });
}

function main() {
  let rows = 50;
  let cellsPerRow = 80;

  let snake = {
    i: 10,
    j: 10,
    previousI: 0,
    previousJ: 0,
  };

  createGameWindow(rows, cellsPerRow);
  const cells = document.querySelectorAll('td[id^="cell_"]');
  let gameMatrix = getGameMatrix(cells, rows, cellsPerRow);

  createSnake(gameMatrix, snake);
  movesHandler(gameMatrix, snake);
}

document.addEventListener("DOMContentLoaded", main);
