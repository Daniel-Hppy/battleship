import "./styles.css";
import { Game } from "./class/game.js";

const game = new Game();
window.game = game;
game.start();