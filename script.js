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
  game.gameMatrix[game.snake.body[0].i][game.snake.body[0].j] = 1;

  renderGame(game);
}

function isAppleValid(game) {
  for (let i = 0; i < game.snake.body.length; i++) {
    if (
      game.snake.body[i].i === game.apple.i &&
      game.snake.body[i].j === game.apple.j
    )
      return false;
  }

  return true;
}

function createApple(game) {
  do {
    game.apple.i = Math.floor(Math.random() * game.rows);
    game.apple.j = Math.floor(Math.random() * game.cellsPerRow);
  } while (isAppleValid(game) === false);

  game.gameMatrix[game.apple.i][game.apple.j] = 2;

  renderGame(game);
}

function moveSnake(game, direction) {
  game.snake.moving = false;
  game.snake.previous = { i: game.snake.body[0].i, j: game.snake.body[0].j };
  game.snake.next = { i: game.snake.body[0].i, j: game.snake.body[0].j };

  switch (direction) {
    case "right":
      game.snake.next.j += 1;
      break;
    case "left":
      game.snake.next.j -= 1;
      break;
    case "up":
      game.snake.next.i -= 1;
      break;
    case "down":
      game.snake.next.i += 1;
      break;
  }

  isSnakeValid(game);
  if (game.collision) return;

  if (
    game.snake.next.i === game.apple.i &&
    game.snake.next.j === game.apple.j
  ) {
    game.snake.body.push({
      i: game.snake.previous.i,
      j: game.snake.previous.j,
    });
    createApple(game);
  }

  for (let i = 0; i < game.snake.body.length; i++) {
    game.gameMatrix[game.snake.body[i].i][game.snake.body[i].j] = 0;
  }

  let previousHeadPos = { i: game.snake.body[0].i, j: game.snake.body[0].j };

  game.snake.body[0] = { i: game.snake.next.i, j: game.snake.next.j };

  for (let i = 1; i < game.snake.body.length; i++) {
    let previousSegmentPos = {
      i: game.snake.body[i].i,
      j: game.snake.body[i].j,
    };

    game.snake.body[i] = previousHeadPos;
    previousHeadPos = previousSegmentPos;
  }

  for (let i = 0; i < game.snake.body.length; i++) {
    game.gameMatrix[game.snake.body[i].i][game.snake.body[i].j] = 1;
  }

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
    if (game.snake.moving) return;

    switch (event.key) {
      case "ArrowRight":
        if (game.snake.direction === "left") return;
        game.snake.direction = "right";
        break;
      case "ArrowLeft":
        if (game.snake.direction === "right") return;
        game.snake.direction = "left";
        break;
      case "ArrowUp":
        if (game.snake.direction === "down") return;
        game.snake.direction = "up";
        break;
      case "ArrowDown":
        if (game.snake.direction === "up") return;
        game.snake.direction = "down";
        break;
    }
    game.snake.moving = true;
  });
}

function isSnakeValid(game) {
  if (
    game.snake.next.j > game.cellsPerRow - 1 ||
    game.snake.next.j < 0 ||
    game.snake.next.i > game.rows - 1 ||
    game.snake.next.i < 0
  )
    game.collision = true;

  for (let i = 1; i < game.snake.body.length; i++) {
    if (
      game.snake.next.i === game.snake.body[i].i &&
      game.snake.next.j === game.snake.body[i].j
    )
      game.collision = true;
  }
}

function main() {
  let game = {
    rows: 31,
    cellsPerRow: 41,
    snake: {
      body: [{ i: 15, j: 20 }],
      previous: {
        i: null,
        j: null,
      },

      next: {
        i: null,
        j: null,
      },
      direction: null,
    },
    apple: {
      i: null,
      j: null,
    },
    cells: [],
    domMatrix: [],
    gameMatrix: [],
    moving: false,
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
