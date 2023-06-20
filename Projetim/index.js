let playerName;
let playerCard;

function generateCard() {
  playerName = document.getElementById("player-name").value;
  
  if (playerName !== "") {
    document.getElementById("player-info").style.display = "none";
    document.getElementById("bingo-card").style.display = "block";
    
    playerCard = generateRandomCard();
    renderCard(playerCard);
  }
}

function generateRandomCard() {
  const card = [];
  const numbers = [];

  while (numbers.length < 25) {
    const randomNum = Math.floor(Math.random() * 75) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  for (let i = 0; i < 5; i++) {
    card.push(numbers.splice(0, 5));
  }

  return card;
}

function renderCard(card) {
  const tableBody = document.getElementById("card-body");
  tableBody.innerHTML = "";

  for (let i = 0; i < card.length; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < card[i].length; j++) {
      const cell = document.createElement("td");
      cell.textContent = card[i][j];
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
}

function startGame() {
  const drawnNumbers = document.getElementById("drawn-numbers");
  drawnNumbers.innerHTML = "";

  const drawn = new Set();

  let intervalId = setInterval(() => {
    const drawnNum = drawNumber();
    drawn.add(drawnNum);

    drawnNumbers.textContent = Array.from(drawn).join(", ");

    if (checkWin(drawnNum)) {
      clearInterval(intervalId);
      alert(`Bingo! ${playerName} venceu!`);
    }
  }, 1000);
}

function drawNumber() {
  return Math.floor(Math.random() * 75) + 1;
}

function checkWin(number) {
  const table = document.getElementById("card-table");

  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      const cell = table.rows[i].cells[j];

      if (parseInt(cell.textContent) === number) {
        cell.classList.add("highlighted");

        if (isWinningCard(table)) {
          return true;
        }
      }
    }
  }

  return false;
}

function isWinningCard(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let rowWin = true;
    let colWin = true;

    for (let j = 0; j < table.rows[i].cells.length; j++) {
      const cell = table.rows[i].cells[j];
      if (!cell.classList.contains("highlighted")) {
        rowWin = false;
      }

      const colCell = table.rows[j].cells[i];
      if (!colCell.classList.contains("highlighted")) {
        colWin = false;
      }
    }

    if (rowWin || colWin) {
      return true;
    }
  }

  const diagonalWin1 = checkDiagonal(table, 1);
  const diagonalWin2 = checkDiagonal(table, -1);

  if (diagonalWin1 || diagonalWin2) {
    return true;
  }

  return false;
}

function checkDiagonal(table, direction) {
  let diagonalWin = true;

  for (let i = 0; i < table.rows.length; i++) {
    const cell = table.rows[i].cells[i * direction];
    if (!cell.classList.contains("highlighted")) {
      diagonalWin = false;
    }
  }

  return diagonalWin;
}
