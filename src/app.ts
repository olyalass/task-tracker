import "./styles.scss";
import { Nav } from "./components/nav";

const appRoot = document.getElementById("application");
const appTitle = document.createElement("h1");
appTitle.textContent = "To-do List";
const Navigation = new Nav();
appRoot.append(appTitle, Navigation.navContainer);