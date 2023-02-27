import "./styles.scss";
import { DataObj, Filter } from "../../types";

export class Note {
  container: HTMLDivElement;
  buttonDelete: HTMLButtonElement;
  buttonDone: HTMLButtonElement;
  noteText: string;
  statusElem: HTMLParagraphElement;
  filter: Filter = "All";
  id: number;

  constructor(text: string, date: Date, status: string, id: number) {
    this.id = id;

    this.container = document.createElement("div");
    this.container.classList.add("note");
    const leftContainer = document.createElement("div");
    leftContainer.classList.add("note__container_inner");
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("note__container_inner");
    this.container.append(leftContainer, rightContainer);

    const note = document.createElement("h2");
    note.classList.add("note__text");
    note.textContent = text;
    this.noteText = text;
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("note__container_buttons");
    leftContainer.append(note, buttonsContainer);

    this.buttonDelete = document.createElement("button");
    this.buttonDelete.classList.add("note__button");
    this.buttonDelete.textContent = "Delete";
    this.buttonDelete.addEventListener("click", () => this.deleteNote());

    this.buttonDone = document.createElement("button");
    this.buttonDone.classList.add("note__button");
    this.buttonDone.textContent = "Done";
    this.buttonDone.addEventListener("click", () => this.markNoteAsDone());

    buttonsContainer.append(this.buttonDone, this.buttonDelete);

    this.statusElem = document.createElement("p");
    this.statusElem.classList.add("note__status");
    this.statusElem.textContent = status;
    if (status === "Active") {
      this.statusElem.classList.add("note__status_active");
    } else {
      this.statusElem.classList.add("note__status_done");
      this.buttonDone.setAttribute("disabled", "true");
      this.buttonDelete.setAttribute("disabled", "true");
    }

    const dateElem = document.createElement("p");
    dateElem.classList.add("note__date");
    dateElem.textContent = getPrettyDate(date);

    rightContainer.append(this.statusElem, dateElem);
  }

  private deleteNote() {
    const notesArr: Array<DataObj> = JSON.parse(localStorage.getItem("notes"));
    const noteIndex = notesArr.findIndex((e) => e.id === this.id);
    notesArr.splice(noteIndex, 1);
    const JsonArr = JSON.stringify(notesArr);
    localStorage.setItem("notes", JsonArr);
    this.container.remove();
  }

  private markNoteAsDone() {
    const notesArr: Array<DataObj> = JSON.parse(localStorage.getItem("notes"));
    notesArr.find((e) => e.id === this.id).status = "Done";
    this.statusElem.classList.remove("note__status_active");
    this.statusElem.classList.add("note__status_done");
    this.buttonDone.setAttribute("disabled", "true");
    this.buttonDelete.setAttribute("disabled", "true");
    this.statusElem.textContent = "Done";
    const JsonArr = JSON.stringify(notesArr);
    localStorage.setItem("notes", JsonArr);
  }
}

function getPrettyDate(date: Date) {
  const daysArr = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day: string = daysArr[date.getDay()];
  const dateNum: number = date.getDate();
  const month: string = monthsArr[date.getMonth()];
  const year: number = date.getFullYear();
  const hours = date.getHours();
  let mins = date.getMinutes().toString();
  if (mins.length < 2) mins = "0" + mins;
  return `${day}   ${dateNum} ${month} ${year}   ${hours}:${mins}`;
}
