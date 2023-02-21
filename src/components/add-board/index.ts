import "./styles.scss";
import { DataArray } from "../../types";
import { Warning } from "../warning";

export class AddBoard {
  container: HTMLDivElement;
  buttonAdd: HTMLButtonElement;
  noteText: string;
  counterValue: number;

  constructor(dataArray: Array<DataArray>) {
    this.container = document.createElement("div");
    this.container.classList.add("board");
    const input = document.createElement("input");
    input.setAttribute("type", "textarea");
    input.classList.add("board__input");
    this.buttonAdd = document.createElement("button");
    this.buttonAdd.classList.add("board__button");
    this.buttonAdd.setAttribute("type", "submit");
    this.buttonAdd.textContent = "Add";
    const counter = document.createElement("p");
    counter.classList.add("board__counter");
    this.counterValue = 0;
    counter.textContent = `${this.counterValue}/55`;
    const lengthWarning = document.createElement("p");
    lengthWarning.classList.add("board__counter_error", "board__warning");
    lengthWarning.textContent = "Note should contain from 6 to 55 symbols";
    const warningAlert = new Warning(this.buttonAdd);
    
    this.container.append(input, counter, lengthWarning, this.buttonAdd, warningAlert.container);

    input.addEventListener("input", () => this.countAndUpgradeInput(input, counter, lengthWarning));
    this.buttonAdd.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.checkNoteDuples(dataArray, warningAlert.container)===false) {

      }
    })
  }

  private countAndUpgradeInput(inputElem:HTMLInputElement, warnElem1: HTMLParagraphElement, warmElem2:HTMLParagraphElement): void {
    if (inputElem.value==="") {
      this.counterValue = 0;
      this.noteText = "";
    } else {
      this.counterValue = inputElem.value.length;
      if (this.counterValue >= 55) inputElem.value = this.noteText;
      this.noteText = inputElem.value[0].toUpperCase() + inputElem.value.slice(1);
      inputElem.value = this.noteText;
      if (this.counterValue < 6) {
        warnElem1.classList.add("board__counter_error");
        warmElem2.classList.add("board__warning_visible");
      } else {
        warnElem1.classList.remove("board__counter_error");
        warmElem2.classList.remove("board__warning_visible");
      };
    };
    warnElem1.textContent = `${this.counterValue}/55`;
  }

  private checkNoteDuples(dataArray: Array<DataArray>, warnAlertElem: HTMLDivElement): boolean {
    let noteStatus = dataArray.find(dataArray => dataArray.note === this.noteText).status;
    if (noteStatus === "Active") {
      warnAlertElem.classList.add("warning_visible");
      this.buttonAdd.setAttribute("disabled", "true");
      return true;
    } else return false;
  }

//   private addNewNote(dataArray: Array<DataArray>, )
}