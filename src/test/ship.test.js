import { Ship } from "../class/ship.js";

test("Ship is not sunk before 3 hits", () => {
  const destroyer = new Ship(3);
  destroyer.hit();
  expect(destroyer.isSunk()).toBe(false);
});

test("Ship is sunk after 3 hits", () => {
  const destroyer = new Ship(3);
  destroyer.hit();
  destroyer.hit();
  destroyer.hit();
  expect(destroyer.isSunk()).toBe(true);
});
