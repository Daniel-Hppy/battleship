import { Player, Computer } from "./player.js";
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
      domController.displayMessage(
        "Computer Wins! All your ships have been sunk!",
      );
      return "computer";
    } else if (this.computer.board.allSunk()) {
      this.gameOver = true;
      domController.displayMessage("You Win! All enemy ships destroyed!");
      return "human";
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

  placeShipsRandomly(player) {
    player.board.grid = new Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    player.board.ship = [];

    const shipLengths = [4, 3, 3, 2, 2, 2, 1];

    shipLengths.forEach((length) => {
      const ship = new Ship(length);
      player.board.randomPlacement(ship);
    });
  }

  placeShip() {
    this.placeShipsRandomly(this.human);
    this.placeShipsRandomly(this.computer);
  }

  handleComputerTurn() {
    const result = this.handleComputerAttack();

    const lastAttack =
      this.computer.attackedCoords[this.computer.attackedCoords.length - 1];
    const [row, col] = lastAttack;

    domController.updateCell(row, col, "human-board", result);
  }

  start() {
    domController.drawBoard("human-board", this.human, false, this);
    domController.drawBoard("computer-board", this.computer, true, this);
    domController.displayMessage("Your Turn - Click on enemy board to attack!");
  }
}
