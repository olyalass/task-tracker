import "./styles.scss";
import "./normalize.scss";
import { createHtmlElement } from "./utils";
import dispatcherFunction from "./components/dispatcher";
import Form from "./components/view/form";
import List from "./components/view/list";
import Nav from "./components/view/nav";
import Storage from "./components/storage";
import { api } from "./api";
import { StateObj } from "types";

const initialState: StateObj = {
  filter: "all",
  tasks: [],
  loadingState: false,
  loadingTasks: [],
  isReversed: false,
};

const body = document.querySelector("body");
const appRoot = createHtmlElement("div", ["app"]);
body.append(appRoot);

const appTitle = createHtmlElement("h1", ["app__title"], "TaskTracker 1.0");
const container = createHtmlElement("div", ["app__container"]);

appRoot.append(appTitle, container);

const storage = new Storage(initialState);
const dispatch = dispatcherFunction(storage);
const nav = new Nav(dispatch);
const list = new List(dispatch);
const form = new Form(dispatch);

const views = [nav, list, form];
views.forEach((view) => {
  storage.subscribe(view.onStateUpdate.bind(view));
  container.append(view.getView());
});

dispatch({
  type: "LOADING_STATE",
  payload: true,
});

api.getAll().then((tasks) => {
  dispatch({ type: "LOAD_INITIAL_TASKS", payload: tasks });
});
