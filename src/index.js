import "./styles.css";
import { Game } from "./class/game.js";
import { domController } from "./module/domController.js";

const game = new Game();
window.game = game;

const randomBtn = document.getElementById("random-btn");
const startBtn = document.getElementById("start-btn");

game.placeShipsRandomly(game.human);
domController.drawBoard("computer-board", game.computer, false, game);
domController.drawBoard("human-board", game.human, false, game);

randomBtn.addEventListener("click", () => {
  game.placeShipsRandomly(game.human);
  domController.drawBoard("human-board", game.human, false, game);
});

startBtn.addEventListener("click", () => {
  game.placeShipsRandomly(game.computer);
  game.start();
  randomBtn.disabled = true;
});
