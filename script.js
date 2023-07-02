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
  updateGame(game);
}

function createApple(game) {
  do {
    game.apple.i = Math.floor(Math.random() * game.rows);
    game.apple.j = Math.floor(Math.random() * game.cellsPerRow);
  } while (game.snake.i === game.apple.i && game.snake.j === game.apple.j);

  game.matrix[game.apple.i][game.apple.j] = 2;
  updateGame(game);
}

function moveSnake(game, direction) {
  game.matrix[game.snake.i][game.snake.j] = 0;
  game.snake.previousI = game.snake.i;
  game.snake.previousJ = game.snake.j;
  game.snake.nextI = game.snake.i;
  game.snake.nextJ = game.snake.j;

  switch (direction) {
    case "right":
      game.snake.nextJ += 1;
      break;
    case "left":
      game.snake.nextJ -= 1;
      break;
    case "up":
      game.snake.nextI -= 1;
      break;
    case "down":
      game.snake.nextI += 1;
      break;
  }

  isSnakeValid(game);
  if (game.collision) return;

  game.snake.i = game.snake.nextI;
  game.snake.j = game.snake.nextJ;
  game.matrix[game.snake.i][game.snake.j] = 1;
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

  if (game.apple.i !== null && game.apple.j !== null)
    game.cells[game.apple.i * game.cellsPerRow + game.apple.j].classList.add(
      "apple"
    );
}

function movesHandler(game) {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowRight":
        game.snake.direction = "right";
        break;
      case "ArrowLeft":
        game.snake.direction = "left";
        break;
      case "ArrowUp":
        game.snake.direction = "up";
        break;
      case "ArrowDown":
        game.snake.direction = "down";
        break;
    }
  });
}

function isSnakeValid(game) {
  if (game.snake.nextJ > game.cellsPerRow - 1 || game.snake.nextJ < 0)
    game.collision = true;
  if (game.snake.nextI > game.rows - 1 || game.snake.nextI < 0)
    game.collision = true;
}

function main() {
  let game = {
    rows: 50,
    cellsPerRow: 80,
    snake: {
      i: 10,
      j: 10,
      previousI: null,
      previousJ: null,
      nextI: null,
      nextJ: null,
      direction: "right",
    },
    apple: {
      i: null,
      j: null,
    },
    cells: [],
    matrix: [],
    collision: false,
  };

  createGameWindow(game);
  game.cells = document.querySelectorAll('td[id^="cell_"]');
  game.matrix = getGameMatrix(game);

  createSnake(game);
  movesHandler(game);
  createApple(game);

  function gameLoop() {
    moveSnake(game, game.snake.direction);
    if (game.collision) {
      clearInterval(gameInterval);
      alert("game over!");
    }
  }
  let gameInterval = setInterval(gameLoop, 50);
}

document.addEventListener("DOMContentLoaded", main);
