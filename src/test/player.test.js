import { Player, Computer } from "../class/player.js";
import { Gameboard } from "../class/gameboard.js";
import { Ship } from "../class/ship.js";

test("Player can attack enemy board", () => {
  const player = new Player("player");
  const computer = new Computer("computer");
  const ship = new Ship(3);

  computer.board.placeShip(ship, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  player.attack(computer.board, 0, 0);

  expect(ship.hits).toBe(1);
});

test("attack gets recorded in attackedCoords", () => {
  const player = new Player("player");
  const computer = new Computer("computer");

  player.attack(computer.board, 0, 0);
  expect(player.attackedCoords).toContainEqual([0, 0]);
});

test("Computer never attacks the same coordinate twice", () => {
  const player = new Player("player");
  const computer = new Computer("computer");

  for (let i = 0; i < 20; i++) {
    computer.randomAttack(player.board);
  }

  const unique = new Set(computer.attackedCoords.map(([r, c]) => `${r},${c}`));
  expect(unique.size).toBe(computer.attackedCoords.length);
});

test("Each player has their own board", () => {
  const player = new Player("player");
  const computer = new Computer("computer");

  expect(player.board).not.toBe(computer.board);
});
