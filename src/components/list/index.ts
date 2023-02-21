import "./styles.scss";
import { Nav } from "../nav";
import { Note } from "../note";
import { DataArray } from "../../types";

export class List {
  container: HTMLDivElement;
  notesArr: Array<DataArray>;
  note: Note;

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("list");

    const date1 = new Date();
    date1.setMonth(0, 1);

    const date2 = new Date();
    date2.setMonth(0, 10);

    this.notesArr = [
      {
        note: "Create new tasks",
        status:"Active", 
        date: date2
      }, 

      {
        note: "Create to-do list app",
        status: "Done",
        date: date1
      }
    ];

    this.renderNotes();
  }

  private updateLocalStorage() {
    if(localStorage.notes === undefined) {
      const jsonArr = JSON.stringify(this.notesArr);
      localStorage.setItem("notes", jsonArr);
    } else 
    this.notesArr = JSON.parse(localStorage.getItem("notes")).map((obj: DataArray) => ({...obj, date: new Date(obj.date)}));
  }

  renderNotes() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.updateLocalStorage();
    this.notesArr.forEach(e => {
      const note = new Note(e.note, e.date, e.status);
      this.container.appendChild(note.container);
      console.log("note done")
    })
  }
}