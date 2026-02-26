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
        this.ship.push({ship, coordinates});
    }

    recieveAttack(row, col) {
        const target = this.grid[row][col];

        if (target) {
            target.hit();
        } else {
            this.missedAttacks.push([row, col]);
        }
    }

    allSunk() {
        return this.ship.every(({ship}) => ship.isSunk());
    }
}    