import "./styles.scss";
import { Dispatch, TaskDataObj, Status, StateObj } from "../../../types";
import { createHtmlElement, getPrettyDate } from "../../../utils";
import { api } from "../../../api";

export default class Task {
  element: HTMLDivElement;
  private wrap: HTMLDivElement;
  dispatch: Dispatch;
  private status: Status;
  private id: number;
  private buttonDone: HTMLButtonElement;
  private buttonDelete: HTMLButtonElement;
  bindedHandleDone: () => void;
  bindedHandleDelete: () => void;
  taskData: TaskDataObj;
  spinner: HTMLDivElement | null;

  constructor(taskData: TaskDataObj, dispatch: Dispatch) {
    this.status = taskData.status;
    this.dispatch = dispatch;
    this.id = taskData.id;
    this.element = createHtmlElement<HTMLDivElement>("div", ["task"]);
    this.createDOMElement(taskData);
  }

  getView() {
    return this.element;
  }

  onStateUpdate(state: StateObj) {
    const isLoading = state.loadingTasks.includes(this.id);
    const newStatus = state.tasks.find((task) => task.id === this.id).status;

    if (this.status !== newStatus) {
      this.updateTaskElement(state);
    }
    if (isLoading && !this.spinner) {
      this.addSpinner();
    } else if (!isLoading && this.spinner) {
      this.removeSpinner();
    }
  }

  private createDOMElement(taskData: TaskDataObj) {
    this.taskData = taskData;
    this.element.innerHTML = "";
    this.wrap = createHtmlElement<HTMLDivElement>("div", ["task__wrap"]);
    const leftContainer = createHtmlElement("div", ["task__container_inner"]);
    const rightContainer = createHtmlElement("div", ["task__container_inner"]);
    const taskText = createHtmlElement("h2", ["task__text"], taskData.note);
    const buttonsContainer = createHtmlElement("div", [
      "task__container_buttons",
    ]);
    this.buttonDone = createHtmlElement<HTMLButtonElement>(
      "button",
      ["task__button"],
      "Done"
    );
    this.buttonDelete = createHtmlElement<HTMLButtonElement>(
      "button",
      ["task__button"],
      "Delete"
    );
    let statusElem;
    switch (taskData.status) {
      case "active":
        this.buttonDone = createHtmlElement<HTMLButtonElement, Status>(
          "button",
          ["task__button"],
          "Done",
          "done"
        );
        this.buttonDelete = createHtmlElement<HTMLButtonElement>(
          "button",
          ["task__button"],
          "Delete"
        );
        statusElem = createHtmlElement(
          "p",
          ["task__status", "task__status_active"],
          "Active"
        );
        break;
      case "done":
        this.buttonDone = createHtmlElement<HTMLButtonElement, Status>(
          "button",
          ["task__button", "task__button_done"],
          "Undo",
          "active"
        );
        this.buttonDelete = createHtmlElement<HTMLButtonElement>(
          "button",
          ["task__button", "task__button_done"],
          "Delete"
        );
        statusElem = createHtmlElement(
          "p",
          ["task__status", "task__status_done"],
          "Done"
        );
        break;
    }
    const dateElem = createHtmlElement(
      "p",
      ["task__date"],
      getPrettyDate(taskData.date)
    );

    this.element.appendChild(this.wrap);
    this.wrap.append(leftContainer, rightContainer);
    leftContainer.append(taskText, buttonsContainer);
    buttonsContainer.append(this.buttonDone, this.buttonDelete);
    rightContainer.append(statusElem, dateElem);

    this.bindedHandleDelete = this.handleDelete.bind(this);
    this.bindedHandleDone = this.handleDone.bind(this);

    this.buttonDone.addEventListener("click", this.bindedHandleDone);
    this.buttonDelete.addEventListener("click", this.bindedHandleDelete);
  }

  handleDelete() {
    this.dispatch({
      type: "LOADING_STATE",
      payload: true,
    });
    api
      .remove(this.id)
      .then((id) => {
        return new Promise((res)=>{
          this.dispatch({
            type: "DELETE_NOTE",
            payload: id,
          })
        })
      })
  }

  handleDone() {
    this.taskData.status = this.buttonDone.dataset.name as Status;
    this.dispatch({
      type: "NOTE_LOADING_STATE",
      payload: { id: this.id, state: true },
    });
    api
      .update(this.taskData)
      .then((taskData) => {
        this.dispatch({
          type: "CHANGE_NOTE_STATUS",
          payload: {
            id: taskData.id,
            status: taskData.status,
          },
        });
      })
  }

  clearHandlers() {
    if (this.buttonDelete)
      this.buttonDelete.removeEventListener("click", this.bindedHandleDelete);
    if (this.buttonDone)
      this.buttonDone.removeEventListener("click", this.bindedHandleDone);
  }

  addSpinner() {
    this.spinner = createHtmlElement<HTMLDivElement>("div", ["task__spinner"]);
    const text = createHtmlElement("h3", ["task__spinner__text"], "Loading...");
    const typed = createHtmlElement<HTMLDivElement>("div", [
      "task__spinner_wrap",
    ]);
    this.spinner.append(typed);
    typed.append(text);
    this.element.append(this.spinner);
  }

  removeSpinner() {
    this.spinner.remove();
    this.spinner = null;
  }

  updateTaskElement(state: StateObj) {
    this.clearHandlers();
    this.status = state.tasks.find((task) => task.id === this.id).status;
    this.createDOMElement(state.tasks.find((task) => task.id === this.id));
  }
}
