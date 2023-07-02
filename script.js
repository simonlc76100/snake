function createGameWindow(game) {
  const window = document.getElementById("game-window");
  for (let i = 0; i < game.rows; i++) {
    const row = window.insertRow(i);
    for (let j = 0; j < game.cellsPerRow; j++) {
      row.insertCell(j);
    }
  }
}

function getGameMatrix(game) {
  let gameMatrix = new Array(game.rows)
    .fill()
    .map(() => new Array(game.cellsPerRow).fill(0));

  return gameMatrix;
}

function getDomMatrix(game) {
  let domMatrix = new Array(game.rows)
    .fill()
    .map(() => new Array(game.cellsPerRow));

  for (let i = 0; i < game.rows; i++) {
    for (let j = 0; j < game.cellsPerRow; j++) {
      domMatrix[i][j] = game.cells[i * game.cellsPerRow + j];
    }
  }

  return domMatrix;
}

function createSnake(game) {
  game.gameMatrix[game.snake.i][game.snake.j] = 1;

  renderGame(game);
}

function createApple(game) {
  do {
    game.apple.i = Math.floor(Math.random() * game.rows);
    game.apple.j = Math.floor(Math.random() * game.cellsPerRow);
  } while (game.snake.i === game.apple.i && game.snake.j === game.apple.j);

  game.gameMatrix[game.apple.i][game.apple.j] = 2;

  renderGame(game);
}

function moveSnake(game, direction) {
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
  game.gameMatrix[game.snake.i][game.snake.j] = 0;

  if (game.snake.nextI === game.apple.i && game.snake.nextJ === game.apple.j)
    createApple(game);

  game.snake.i = game.snake.nextI;
  game.snake.j = game.snake.nextJ;
  game.gameMatrix[game.snake.i][game.snake.j] = 1;

  renderGame(game);
}

function renderGame(game) {
  for (let i = 0; i < game.rows; i++) {
    for (let j = 0; j < game.cellsPerRow; j++) {
      game.domMatrix[i][j].classList.remove("snake", "apple");
      switch (game.gameMatrix[i][j]) {
        case 1:
          game.domMatrix[i][j].classList.add("snake");
          break;
        case 2:
          game.domMatrix[i][j].classList.add("apple");
          break;
      }
    }
  }
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
  if (
    game.snake.nextJ > game.cellsPerRow - 1 ||
    game.snake.nextJ < 0 ||
    game.snake.nextI > game.rows - 1 ||
    game.snake.nextI < 0
  )
    game.collision = true;
}

function main() {
  let game = {
    rows: 30,
    cellsPerRow: 40,
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
    domMatrix: [],
    gameMatrix: [],
    collision: false,
  };

  createGameWindow(game);
  game.cells = document.querySelectorAll("td");

  game.gameMatrix = getGameMatrix(game);
  game.domMatrix = getDomMatrix(game);

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
