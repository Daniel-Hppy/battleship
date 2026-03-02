import { Player, Computer } from "./player.js"
import { Ship } from "./ship.js";
import { domController } from "../module/domController.js";

export class Game {
    constructor() {
        this.human = new Player();
        this.computer = new Computer();
        this.currentTurn = this.human;
        this.gameOver = false;
    }

    switchTurn() {
        if (this.currentTurn === this.human) {
            this.currentTurn = this.computer;
        } else {
            this.currentTurn = this.human;
        }
    }

    checkWinner() {
        if (this.human.board.allSunk()) {
            this.gameOver = true;
            return 'computer';
        } else if (this.computer.board.allSunk()) {
            this.gameOver = true;
            return 'human';
        } else {
            return null;
        }
    }

    handleHumanAttack(row, col) {
        if (this.currentTurn === this.human) {
            const result = this.human.attack(this.computer.board, row, col);

            if (this.checkWinner() === null) {
                this.switchTurn();
            }
            return result;
        }
    }

    handleComputerAttack() {
        if (this.currentTurn === this.computer) {
            const result = this.computer.randomAttack(this.human.board);

            if (this.checkWinner() === null) {
                this.switchTurn();
            }
            return result;
        }
    }

    placeShips() {

        const humanShip1 = new Ship(4);
        this.human.board.placeShip(humanShip1, [[4, 4], [4, 5], [4, 6], [4, 7]]);

        const humanShip2 = new Ship(3);
        this.human.board.placeShip(humanShip2, [[2, 7], [2, 8], [2, 9]]);

        const humanShip3 = new Ship(3);
        this.human.board.placeShip(humanShip3, [[7, 3], [8, 3], [9, 3]]);

        const humanShip4 = new Ship(2);
        this.human.board.placeShip(humanShip4, [[1, 2], [1, 3]]);

        const humanShip5 = new Ship(2);
        this.human.board.placeShip(humanShip5, [[1, 0], [1, 1]]);

        const humanShip6 = new Ship(2);
        this.human.board.placeShip(humanShip6, [[4, 9], [5, 9]]);

        const humanShip7 = new Ship(1);
        this.human.board.placeShip(humanShip7, [[0, 7]]);

        const computerShip1 = new Ship(4);
        this.computer.board.placeShip(computerShip1, [[4, 4], [4, 5], [4, 6], [4, 7]]);

        const computerShip2 = new Ship(3);
        this.computer.board.placeShip(computerShip2, [[2, 7], [2, 8], [2, 9]]);

        const computerShip3 = new Ship(3);
        this.computer.board.placeShip(computerShip3, [[7, 3], [8, 3], [9, 3]]);

        const computerShip4 = new Ship(2);
        this.computer.board.placeShip(computerShip4, [[1, 2], [1, 3]]);

        const computerShip5 = new Ship(2);
        this.computer.board.placeShip(computerShip5, [[1, 0], [1, 1]]);

        const computerShip6 = new Ship(2);
        this.computer.board.placeShip(computerShip6, [[4, 9], [5, 9]]);

        const computerShip7 = new Ship(1);
        this.computer.board.placeShip(computerShip7, [[0, 7]]);
    }

    handleComputerTurn() {
        const result = this.handleComputerAttack();
        
        const lastAttack = this.computer.attackedCoords[this.computer.attackedCoords.length - 1];
        const [row, col] = lastAttack;
        
        domController.updateCell(row, col, 'human-board', result);
    }

    start() {
        this.placeShips();
        
        domController.drawBoard('human-board', this.human, false, this);
        domController.drawBoard('computer-board', this.computer, true, this);
    }
}
