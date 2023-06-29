function createGame() {
  const game = document.getElementById("game-window");
  for (let i = 0; i < 18; i++) {
    const row = game.insertRow(i);
    row.id = "row_" + i;
    for (let j = 0; j < 18; j++) {
      const cell = row.insertCell(j);
      cell.id = "cell_" + i + "_" + j;
    }
  }
}

function main() {
  createGame();
}

document.addEventListener("DOMContentLoaded", main);
