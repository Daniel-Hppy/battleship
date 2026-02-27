export const domController = (() => {
  const createBoard = (container) => {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        container.appendChild(cell);
      }
    }
  };
  return { createBoard };
})();
