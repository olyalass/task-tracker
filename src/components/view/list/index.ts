import "./styles.scss";
import { Dispatch, StateObj, TaskDataObj, Filter } from "../../../types";
import { createHtmlElement } from "../../../utils";
import Task from "../task";

export default class List {
  element: HTMLDivElement;
  private wrap: HTMLDivElement;
  dispatch: Dispatch;
  private currentLength: number;
  private isReversed: boolean;
  private filter: Filter;
  taskInstances: Task[];
  spinner: HTMLDivElement | null = null;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.element = createHtmlElement<HTMLDivElement>("div", ["list"]);
  }

  onStateUpdate(state: StateObj) {
    const loadingState = state.loadingState;
    if (
      this.currentLength !== state.tasks.length ||
      this.filter !== state.filter ||
      this.isReversed !== state.isReversed
    ) {
      this.updateList(state);
      this.spinner = null;
    } else {
      this.taskInstances.forEach((task) => task.onStateUpdate(state));
    }
    if (loadingState && !this.spinner) {
      this.addSpinner();
    }
    if (this.spinner && !state.loadingState) {
      this.removeSpinner();
    }
  }

  getView() {
    return this.element;
  }

  updateList(state: StateObj) {
    this.filter = state.filter;
    this.isReversed = state.isReversed;
    if (this.taskInstances)
      this.taskInstances.forEach((task) => {
        task.clearHandlers();
      });
    this.createTasksList(state.tasks);
  }

  addSpinner() {
    this.spinner = createHtmlElement<HTMLDivElement>("div", ["task__spinner"]);
    const text = createHtmlElement("h3", ["task__spinner__text"], "Loading...");
    const typed = createHtmlElement<HTMLDivElement>("div", [
      "task__spinner_wrap",
    ]);
    this.spinner.append(typed);
    typed.append(text);
    this.wrap.append(this.spinner);
  }

  removeSpinner() {
    this.spinner.remove();
    this.spinner = null;
  }

  private createTasksList(tasks: TaskDataObj[]) {
    this.element.innerHTML = "";
    this.currentLength = 0;
    this.wrap = createHtmlElement<HTMLDivElement>("div", ["list__wrap"]);
    if (tasks) {
      let taskElements = [];
      if (this.filter === "active") {
        taskElements = this.createTaskElements(tasks, "active");
      } else if (this.filter === "done") {
        taskElements = this.createTaskElements(tasks, "done");
      } else {
        taskElements = this.createTaskElements(tasks, "all");
      }
      taskElements.forEach((el) => this.wrap.append(el));
      this.element.appendChild(this.wrap);
    }
  }

  private createTaskElements(tasks: TaskDataObj[], filter: Filter) {
    const taskElementsArray: HTMLElement[] = [];
    this.sortElementsByDate(tasks);
    this.taskInstances = [];
    tasks.forEach((task) => {
      if (filter === "all" || task.status === filter) {
        const newTask = new Task(task, this.dispatch);
        taskElementsArray.push(newTask.getView());
        this.currentLength++;
        this.taskInstances.push(newTask);
      }
    });
    return taskElementsArray;
  }

  sortElementsByDate(tasksArr: TaskDataObj[]) {
    if (this.isReversed) {
      tasksArr.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      tasksArr.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }
}
