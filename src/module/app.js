import { Player, Computer } from "../class/player.js";
import { Ship } from "../class/ship.js";

const human = new Player('human');
const computer = new Computer('computer');

const ship = new Ship(3);
computer.board.placeShip(ship, [[0,0], [0,1], [0,2]]);

export function createBoard(boardElement) {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            boardElement.appendChild(cell);
        }
    }

    boardElement.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            console.log('Clicking:', row, col);
            console.log('Board at this position', computer.board.grid[row][col]);
            const result = human.attack(computer.board, row, col);
            console.log('Result:', result);
        });
    });
}



