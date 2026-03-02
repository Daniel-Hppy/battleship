export const domController = (() => {
  const drawBoard = (containerId, player, isClickable, game) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return;
    }

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    player.board.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");

        if (
          cell &&
          cell !== "hit" &&
          cell !== "miss" &&
          !player.isComputer
        ) {
          cellDiv.classList.add("ship");
        }

        if (cell === "hit") {
          cellDiv.classList.add("hit");
          cellDiv.textContent = "💥";
        } else if (cell === "miss") {
          cellDiv.classList.add("miss");
          cellDiv.textContent = "miss";
        }

        if (isClickable && cell !== "hit" && cell !== "miss") {
          cellDiv.addEventListener("click", () => {
            const result = game.handleHumanAttack(rowIndex, colIndex);

            drawBoard("computer-board", game.computer, true, game);

            if (!game.gameOver) {
              displayMessage("Computer's Turn...");
              setTimeout(() => {
                game.handleComputerAttack();
                drawBoard("human-board", game.human, false, game);

                if (!game.gameOver) {
                  displayMessage("Your Turn - Click on enemy board to attack!");
                }
              }, 1000);
            }
          });
        }

        fragment.appendChild(cellDiv);
      });
    });

    container.appendChild(fragment);
  };
  const displayMessage = (message) => {
    const messageDiv = document.getElementById("game-message");
    messageDiv.textContent = message;
  };

  return {
    drawBoard,
    displayMessage,
  };
})();
