let goldRow, goldCol, clickCount = 0;

function startGame() {
  clickCount = 0;
  document.getElementById("message").textContent = "Click on a cell to find the hidden gold!";
  const gridContainer = document.getElementById("grid-container");
  gridContainer.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
      cell.addEventListener("click", () => handleClick(i, j, cell));
      gridContainer.appendChild(cell);
    }
  }
  goldRow = Math.floor(Math.random() * 20);
  goldCol = Math.floor(Math.random() * 20);
}

function handleClick(row, col, cell) {
  clickCount++;

  if (cell.classList.contains("clicked") || cell.textContent === "💰") {
    return;
  }

  if (row === goldRow && col === goldCol) {
    cell.textContent = "💰";
    cell.style.backgroundColor = "#ffd700";
    document.getElementById("message").textContent =
      `🎉 Congratulations! You found the gold in ${clickCount} attempts!`;
    return;
  }

  cell.classList.add("clicked");

  let hint = '';
  if (row < goldRow && col < goldCol) hint = "Move Down & Right ↘️";
  else if (row < goldRow && col > goldCol) hint = "Move Down & Left ↙️";
  else if (row > goldRow && col < goldCol) hint = "Move Up & Right ↗️";
  else if (row > goldRow && col > goldCol) hint = "Move Up & Left ↖️";
  else if (row < goldRow && col === goldCol) hint = "Move Down ⬇️";
  else if (row > goldRow && col === goldCol) hint = "Move Up ⬆️";
  else if (row === goldRow && col < goldCol) hint = "Move Right ➡️";
  else if (row === goldRow && col > goldCol) hint = "Move Left ⬅️";

  document.getElementById("message").textContent = `Hint: ${hint}`;

  markWrongCells(row, col);
}

function markWrongCells(row, col) {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach(cell => {
    const r = parseInt(cell.getAttribute("data-row"));
    const c = parseInt(cell.getAttribute("data-col"));

    if ((r === row || c === col) &&
        !cell.classList.contains("clicked-wrong") &&
        !cell.classList.contains("clicked") &&
        cell.textContent !== "💰") {
      cell.classList.add("clicked-wrong");
    }
  });
}
window.onload = startGame;
