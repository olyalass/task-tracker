import { App } from "./app";
import "./styles.scss";
import "./normalize.scss";

const body = document.querySelector("body");
const app = new App();
body.appendChild(app.appRoot);
