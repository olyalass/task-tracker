import "./styles.scss";
import { Nav } from "./components/nav";
import { Note } from "./components/note";
import { AddBoard } from "./components/add-board";

const appRoot = document.querySelector(".app");
const appTitle = document.createElement("h1");
appTitle.classList.add("app__title");
const container = document.createElement("div");
container.classList.add("app__container");
appRoot.append(appTitle, container);
appTitle.textContent = "To-do List";
const Navigation = new Nav();
const Board = new AddBoard();

const now = new Date;
const note = new Note("relax", now, "Active");

container.append(Navigation.container, note.container, Board.container);
