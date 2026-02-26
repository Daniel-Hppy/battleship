import { Gameboard } from "../class/gameboard.js";
import { Ship } from "../class/ship.js";

test('place a ship on the board', () => {
    const board = new Gameboard();
    const ship = new Ship(3);

    board.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);

    expect(board.grid[0][0]).toBe(ship);
    expect(board.grid[0][1]).toBe(ship);
    expect(board.grid[0][2]).toBe(ship);
});


test("record a hit when attack land on a ship", () => {
    const board = new Gameboard();
    const ship = new Ship();

    board.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    board.recieveAttack(0, 0);

    expect(ship.hits).toBe(1);
});

test("record missed attacks", () => {
    const board = new Gameboard();
    const ship = new Ship(3);

    board.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    board.recieveAttack(0, 3);

    expect(board.missedAttacks).toContainEqual([0, 3]);
});

test("does not record a miss when a ship is hit", () => {
    const board = new Gameboard();
    const ship = new Ship(3);

    board.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    board.recieveAttack(0, 3);

    expect(ship.hits).toBe(0);
});


test("Allsunk return false if ship is still alive", () => {
    const board = new Gameboard();
    const ship = new Ship(3);

    board.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    board.recieveAttack(0, 0);
    board.recieveAttack(0, 1);

    expect(board.allSunk()).toBe(false);
}); 

test("allSunk return true when all ships are sunk", () => {
    const board = new Gameboard();
    const ship = new Ship(3);

    board.placeShip(ship, [[0, 0], [0, 1], [0, 2]]);
    board.recieveAttack(0, 0);
    board.recieveAttack(0, 1);
    board.recieveAttack(0, 1);

    expect(board.allSunk()).toBe(true);
});



