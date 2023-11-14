let game = document.querySelector("#root"),
   table = document.createElement("table"),
   rowsQuantity,
   columnsQuantity,
   gameTable = [],
   row = [];

const elements = ["♣", "♥", "♦", "♠"];

const getRandomElem = (max) => {
   return elements[Math.floor(Math.random() * Math.floor(max))];
};

document.addEventListener("DOMContentLoaded", () => {
   let randomRowsAndColumns = Math.floor(Math.random() * 8) + 3;

   rowsQuantity = randomRowsAndColumns;
   columnsQuantity = randomRowsAndColumns;
   gameTable = [];

   for (let i = 0; i < rowsQuantity; i++) {
      row = [];

      for (let j = 0; j < columnsQuantity; j++) {
         row[j] = getRandomElem(elements.length);
      }
      gameTable[i] = row;
   }

   loadGame();
});

function loadGame() {
   table.innerHTML = "";

   for (let i in gameTable) {
      let tr = document.createElement("tr");

      for (let j in gameTable[i]) {
         let td = document.createElement("td");
         td.innerHTML = gameTable[i][j];
         td.classList.add(`row-${i}`);
         td.classList.add(`col-${j}`);

         td.addEventListener("click", (e) => {
            handleClick(e, i, j);
         });
         tr.appendChild(td);
      }
      table.appendChild(tr);
   }
}

function handleClick(e) {
   let target = e.target,
      trNum = target.parentNode.rowIndex,
      tdNum = target.cellIndex,
      val = target.textContent;

   removeElem(val, trNum, tdNum);
}

function removeElem(val, i, j) {
   if (gameTable[i] && gameTable[i][j] === val) {
      gameTable[i][j] = "";

      removeElem(val, i + 1, j);
      removeElem(val, i - 1, j);
      removeElem(val, i, j + 1);
      removeElem(val, i, j - 1);

      for (let i in gameTable) {
         for (let j in gameTable[i]) {
            if (gameTable[i][j] === "") {
               document.querySelector(`.row-${i}.col-${j}`).innerHTML = "";

               setTimeout(() => {
                  let rand = getRandomElem(elements.length);
                  document.querySelector(`.row-${i}.col-${j}`).innerHTML = rand;
                  gameTable[i][j] = rand;
               }, 1000);
            }
         }
      }
   }
}

game.appendChild(table);
