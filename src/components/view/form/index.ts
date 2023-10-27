import "./styles.scss";
import { Dispatch, StateObj, TaskDataObj } from "../../../types";
import { createHtmlElement } from "../../../utils";
import { api } from "../../../api";

export default class Form {
  element: HTMLDivElement;
  wrap: HTMLDivElement;
  dispatch: Dispatch;
  buttonAdd: HTMLButtonElement;
  counterValue: number;
  taskText: string;
  input: HTMLInputElement;
  counter: HTMLParagraphElement;
  lengthWarning: HTMLParagraphElement;
  tasksArray: TaskDataObj[];
  bindedHandleInputValidation: () => void | undefined;
  bindedHandleCreateNote: () => void | undefined;

  constructor(dispatch: Dispatch) {
    this.element = createHtmlElement<HTMLDivElement>("div", ["form"]);
    this.dispatch = dispatch;
  }

  createDOMElement() {
    this.element.innerHTML = "";
    this.wrap = createHtmlElement<HTMLDivElement>("div", ["form__wrap"]);
    this.input = createHtmlElement<HTMLInputElement>("input", ["form__input"]);
    this.input.setAttribute("type", "textarea");
    this.input.setAttribute("required", "true");
    this.buttonAdd = createHtmlElement<HTMLButtonElement>(
      "button",
      ["form__button"],
      "Add"
    );
    this.buttonAdd.setAttribute("type", "submit");
    this.buttonAdd.setAttribute("disabled", "true");
    this.counter = document.createElement("p");
    this.counter.classList.add("board__counter");
    this.counterValue = 0;
    this.counter.textContent = `${this.counterValue}/55`;
    this.lengthWarning = createHtmlElement<HTMLParagraphElement>(
      "p",
      ["form__counter_error", "form__warning"],
      "Note should contain from 5 to 55 symbols"
    );

    this.bindedHandleInputValidation = this.handleInputValidation.bind(this);
    this.bindedHandleCreateNote = this.handleCreateNote.bind(this);

    this.input.addEventListener("input", this.bindedHandleInputValidation);
    this.buttonAdd.addEventListener("click", this.bindedHandleCreateNote);

    this.wrap.append(
      this.input,
      this.counter,
      this.lengthWarning,
      this.buttonAdd
    );
    this.element.appendChild(this.wrap);
  }

  onStateUpdate(state: StateObj) {
    this.clearHandlers();
    if (state.tasks) {
      this.tasksArray = state.tasks.slice(0);
      this.createDOMElement();
    } else {
      this.tasksArray = [];
    }
  }

  getView() {
    return this.element;
  }

  private inputValidation(
    inputElem: HTMLInputElement,
    warnElem1: HTMLParagraphElement,
    warmElem2: HTMLParagraphElement
  ): void {
    if (inputElem.value === "") {
      this.counterValue = 0;
      this.taskText = "";
    } else {
      this.counterValue = inputElem.value.length;
      if (this.counterValue >= 55) inputElem.value = this.taskText;
      this.taskText =
        inputElem.value[0].toUpperCase() + inputElem.value.slice(1);
      inputElem.value = this.taskText;
      if (this.counterValue < 5) {
        warnElem1.classList.add("form__counter_error");
        warmElem2.classList.add("form__warning_visible");
        this.buttonAdd.setAttribute("disabled", "true");
      } else {
        warnElem1.classList.remove("form__counter_error");
        warmElem2.classList.remove("form__warning_visible");
        this.buttonAdd.removeAttribute("disabled");
      }
    }
    warnElem1.textContent = `${this.counterValue}/55`;
  }

  handleInputValidation() {
    this.inputValidation(this.input, this.counter, this.lengthWarning);
  }

  handleCreateNote() {
    this.createNewNote(this.tasksArray);
  }

  clearHandlers() {
    if (this.input)
      this.input.removeEventListener("input", this.bindedHandleInputValidation);
    if (this.buttonAdd)
      this.buttonAdd.removeEventListener("click", this.bindedHandleCreateNote);
  }

  private createNewNote(tasksArray: TaskDataObj[]) {
    tasksArray.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const taskObj: TaskDataObj = {
      id: tasksArray.length ? tasksArray[tasksArray.length - 1].id + 1 : 1,
      note: this.taskText,
      status: "active",
      date: new Date(),
    };
    this.dispatch({
      type: "LOADING_STATE",
      payload: true,
    });
    api.add(taskObj).then((taskObj) => {
      this.dispatch({
        type: "ADD_NOTE",
        payload: taskObj,
      });
    });
  }
}
