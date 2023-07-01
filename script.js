function createGameWindow(game) {
  const window = document.getElementById("game-window");
  for (let i = 0; i < game.rows; i++) {
    const row = window.insertRow(i);
    row.id = "row_" + i;
    for (let j = 0; j < game.cellsPerRow; j++) {
      const cell = row.insertCell(j);
      cell.id = "cell_" + i + "_" + j;
    }
  }
}

function getGameMatrix(game) {
  let gameMatrix = new Array(game.rows)
    .fill()
    .map(() => new Array(game.cellsPerRow).fill(0));

  for (let i = 0; i < game.rows; i++) {
    for (let j = 0; j < game.cellsPerRow; j++) {
      if (game.cells[i * game.cellsPerRow + j].textContent === "")
        gameMatrix[i][j] = 0;
      else {
        gameMatrix[i][j] = game.cells[i * game.cellsPerRow + j].textContent;
      }
    }
  }
  return gameMatrix;
}

function createSnake(game) {
  game.matrix[game.snake.i][game.snake.j] = 1;
  console.log(game.snake);
  updateGame(game);
}

function createApple(game) {
  game.matrix[game.apple.i][game.apple.j] = 1;
  console.log(game.snake);
  updateGame(game);
}

function moveSnake(game, direction) {
  game.matrix[game.snake.i][game.snake.j] = 0;
  game.snake.previousI = game.snake.i;
  game.snake.previousJ = game.snake.j;

  switch (direction) {
    case "right":
      game.snake.j += 1;
      break;
    case "left":
      game.snake.j -= 1;
      break;
    case "up":
      game.snake.i -= 1;
      break;
    case "down":
      game.snake.i += 1;
      break;
  }
  game.matrix[game.snake.i][game.snake.j] = 2;
  console.log(game.apple);
  updateGame(game);
}

function updateGame(game) {
  let previousCell =
    game.cells[game.snake.previousI * game.cellsPerRow + game.snake.previousJ];
  let cell = game.cells[game.snake.i * game.cellsPerRow + game.snake.j];

  if (previousCell.classList.contains("snake")) {
    previousCell.classList.remove("snake");
  }
  cell.classList.add("snake");

  game.cells[game.apple.i * game.cellsPerRow + game.apple.j].classList.add(
    "apple"
  );
}

function movesHandler(game) {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowRight":
        moveSnake(game, "right");
        break;
      case "ArrowLeft":
        moveSnake(game, "left");
        break;
      case "ArrowUp":
        moveSnake(game, "up");
        break;
      case "ArrowDown":
        moveSnake(game, "down");
        break;
    }
  });
}

function main() {
  let game = {
    rows: 50,
    cellsPerRow: 80,
    snake: {
      i: 10,
      j: 10,
      previousI: 0,
      previousJ: 0,
    },
    apple: {
      i: 25,
      j: 40,
    },
    cells: [],
    matrix: [],
  };

  createGameWindow(game);
  game.cells = document.querySelectorAll('td[id^="cell_"]');
  game.matrix = getGameMatrix(game);

  createSnake(game);
  movesHandler(game);
}

document.addEventListener("DOMContentLoaded", main);
