import "./styles.scss";
import { Note } from "../note";
import { DataObj } from "../../types";

export class List {
  container: HTMLDivElement;
  notesArr: Array<DataObj>;

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("list");

    this.renderNotes("All", false);
  }

  private getFromLocalStorage() {
    this.notesArr = JSON.parse(localStorage.getItem("notes")).map((obj: DataObj) => ({...obj, date: new Date(obj.date)}));
  }

  renderNotes(statusFilter: string, isReversed: boolean) {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.getFromLocalStorage();

    if (statusFilter === "Active") {
      this.notesArr = this.notesArr.filter( e => e.status === "Active");
    } else if (statusFilter === "Done") {
      this.notesArr = this.notesArr.filter( e => e.status === "Done");
    };

    if (isReversed) {
      this.notesArr.sort((note1, note2) => note1.date > note2.date ? 1 : -1);
    } else {
      this.notesArr.sort((note1, note2) => note1.date < note2.date ? 1 : -1);
    }

    this.notesArr.forEach(e => {
      const note: Note = new Note(e.note, e.date, e.status);
      this.container.appendChild(note.container);
    })
  }

  public addNote(note: Note) {
    this.container.appendChild(note.container);
  }

}