import "./styles.scss";
import { DataObj, SubmitHandler } from "../../types";
import { Warning } from "../warning";

export class Form {
  container: HTMLDivElement;
  private buttonAdd: HTMLButtonElement;
  private noteText: string;
  private counterValue: number;
  handler: SubmitHandler | null = null;

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("board");

    const input = document.createElement("input");
    input.setAttribute("type", "textarea");
    input.setAttribute("required", "true");
    input.classList.add("board__input");

    this.buttonAdd = document.createElement("button");
    this.buttonAdd.classList.add("board__button");
    this.buttonAdd.setAttribute("type", "submit");
    this.buttonAdd.textContent = "Add";
    this.buttonAdd.setAttribute("disabled", "true");

    const counter = document.createElement("p");
    counter.classList.add("board__counter");
    this.counterValue = 0;
    counter.textContent = `${this.counterValue}/55`;
    const lengthWarning = document.createElement("p");
    lengthWarning.classList.add("board__counter_error", "board__warning");
    lengthWarning.textContent = "Note should contain from 5 to 55 symbols";
    const warningAlert = new Warning(this.buttonAdd);

    this.container.append(
      input,
      counter,
      lengthWarning,
      this.buttonAdd,
      warningAlert.container
    );

    input.addEventListener("input", () =>
      this.countAndUpgradeInput(input, counter, lengthWarning)
    );
    this.buttonAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const dataArray = JSON.parse(localStorage.getItem("notes"));
      if (this.checkNoteDuples(dataArray, warningAlert.container) === false) {
        const newNote = this.createAndSaveNewNote(dataArray);
        if (this.handler) {
          this.handler(newNote);
        }
        input.value = "";
        this.counterValue = 0;
        this.noteText = "";
      }
    });
  }

  private countAndUpgradeInput(
    inputElem: HTMLInputElement,
    warnElem1: HTMLParagraphElement,
    warmElem2: HTMLParagraphElement
  ): void {
    if (inputElem.value === "") {
      this.counterValue = 0;
      this.noteText = "";
    } else {
      this.counterValue = inputElem.value.length;
      if (this.counterValue >= 55) inputElem.value = this.noteText;
      this.noteText =
        inputElem.value[0].toUpperCase() + inputElem.value.slice(1);
      inputElem.value = this.noteText;
      if (this.counterValue < 5) {
        warnElem1.classList.add("board__counter_error");
        warmElem2.classList.add("board__warning_visible");
        this.buttonAdd.setAttribute("disabled", "true");
      } else {
        warnElem1.classList.remove("board__counter_error");
        warmElem2.classList.remove("board__warning_visible");
        this.buttonAdd.removeAttribute("disabled");
      }
    }
    warnElem1.textContent = `${this.counterValue}/55`;
  }

  private checkNoteDuples(
    dataArray: Array<DataObj>,
    warnAlertElem: HTMLDivElement
  ): boolean {
    let existingNote = dataArray.find(
      (dataArray) => dataArray.note === this.noteText
    );
    if (existingNote !== undefined) {
      if (existingNote.status === "Active") {
        warnAlertElem.classList.add("warning_visible");
        this.buttonAdd.setAttribute("disabled", "true");
        return true;
      } else return false;
    } else return false;
  }

  private createAndSaveNewNote(dataArray: Array<DataObj>) {
    const prevIndex = dataArray[dataArray.length - 1].id;
    const noteObj = {
      id: prevIndex + 1,
      note: this.noteText,
      status: "Active",
      date: new Date(),
    };
    dataArray.push(noteObj);
    localStorage.setItem("notes", JSON.stringify(dataArray));
    return noteObj;
  }

  onFormSubmit(handler: SubmitHandler) {
    this.handler = handler;
  }
}
