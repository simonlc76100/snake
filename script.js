function createGameWindow() {
  const game = document.getElementById("game-window");
  for (let i = 0; i < 27; i++) {
    const row = game.insertRow(i);
    row.id = "row_" + i;
    for (let j = 0; j < 45; j++) {
      const cell = row.insertCell(j);
      cell.id = "cell_" + i + "_" + j;
    }
  }
}

function main() {
  createGameWindow();
}

document.addEventListener("DOMContentLoaded", main);
