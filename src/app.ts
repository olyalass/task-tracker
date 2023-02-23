import "./styles.scss";
import { Nav } from "./components/nav";
import { Note } from "./components/note";
import { Form } from "./components/form";
import { List } from "./components/list";
import { DataObj } from "./types";

export class App {
  appRoot: HTMLDivElement;
  list: List;

  constructor() {
    this.appRoot = document.createElement("div");
    this.appRoot.classList.add("app");

    const appTitle = document.createElement("h1");
    appTitle.classList.add("app__title");
    const container = document.createElement("div");
    container.classList.add("app__container");
    this.appRoot.append(appTitle, container);
    appTitle.textContent = "To-do List";

    const date1 = new Date();
    date1.setMonth(0, 1);

    const date2 = new Date();
    date2.setMonth(0, 10);

    const notesArr: Array<DataObj> = [
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

    if (localStorage.getItem("notes") === undefined) {
      const notesJson = JSON.stringify(notesArr);
      localStorage.setItem("notes", notesJson);
    }

    const navigation = new Nav();
    this.list = new List();
    const form = new Form();
    const bindedMethod = this.handleNoteSubmit.bind(this);
    form.onFormSubmit(bindedMethod)

    container.append(navigation.container, this.list.container, form.container);

  }

  handleNoteSubmit(noteData: DataObj) {
    const newNote = new Note(noteData.note, noteData.date, noteData.status);
    this.list.addNote(newNote);
  }
}

