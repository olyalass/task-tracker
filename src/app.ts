import "./styles.scss";
import { Nav } from "./components/nav";
import { Note } from "./components/note";
import { AddBoard } from "./components/add-board";
import { Warning } from "./components/warning";
import { List } from "./components/list";

const appRoot = document.querySelector(".app");
const appTitle = document.createElement("h1");
appTitle.classList.add("app__title");
const container = document.createElement("div");
container.classList.add("app__container");
appRoot.append(appTitle, container);
appTitle.textContent = "To-do List";
const Navigation = new Nav();
const list = new List();
const Board = new AddBoard(list.notesArr);

container.append(Navigation.container, list.container, Board.container);
