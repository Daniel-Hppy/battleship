export class Gameboard {
  constructor() {
    this.grid = new Array(10).fill(null).map(() => Array(10).fill(null));
    this.ship = [];
    this.missedAttacks = [];
  }

  placeShip(ship, coordinates) {
    coordinates.forEach(([row, col]) => {
      this.grid[row][col] = ship;
    });
    this.ship.push({ ship, coordinates });
  }

  recieveAttack(row, col) {
    const target = this.grid[row][col];

    if (target) {
      target.hit();
      this.grid[row][col] = "hit";
      return "hit";
    } else {
      this.missedAttacks.push([row, col]);
      this.grid[row][col] = "miss";
      return "miss";
    }
  }

  allSunk() {
    return this.ship.every(({ ship }) => ship.isSunk());
  }

  randomPlacement(ship) {
    const isHorizontal = Math.random() < 0.5;
    let placed = false;
    let attemps = 0;

    while (!placed && attemps < 100) {
      const startRow = Math.floor(Math.random() * 10);
      const startCol = Math.floor(Math.random() * 10);

      const coordinates = [];
      let valid = true;

      for (let i = 0; i < ship.length; i++) {
        const row = isHorizontal ? startRow : startRow + i;
        const col = isHorizontal ? startCol + i : startCol;

        if (row >= 10 || col >= 10) {
          valid = false;
          break;
        }

        if (this.grid[row][col] !== null) {
          valid = false;
          break;
        }

        coordinates.push([row, col]);
      }

      if (valid) {
        this.placeShip(ship, coordinates);
        placed = true;
      }

      attemps++;
    }
    return placed;
  }
}
