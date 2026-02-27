import { Gameboard } from "./gameboard.js";

export class Player {
  constructor() {
    this.board = new Gameboard();
    this.attackedCoords = [];
  }

  attack(enemyBoard, row, col) {
    const result = enemyBoard.recieveAttack(row, col);
    this.attackedCoords.push([row, col]);
    return result;
  }
}

export class Computer {
  constructor() {
    this.board = new Gameboard();
    this.attackedCoords = [];
  }

  attack(enemyBoard, row, col) {
    const result = enemyBoard.recieveAttack(row, col);
    this.attackedCoords.push([row, col]);
    return result;
  }

  randomAttack(enemyBoard) {
    let row, col;

    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (this.attackedCoords.some(([r, c]) => r === row && c === col));

    return this.attack(enemyBoard, row, col);
  }
}
