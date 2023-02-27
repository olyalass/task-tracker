import "./styles.scss";
import { Nav } from "./components/nav";
import { Note } from "./components/note";
import { Form } from "./components/form";
import { List } from "./components/list";
import { DataObj, Filter } from "./types";
import { getDefaultArray } from "./components/defaultNotes";

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

    const notesArr = getDefaultArray();

    if (localStorage.getItem("notes") == undefined) {
      const notesJson = JSON.stringify(notesArr);
      localStorage.setItem("notes", notesJson);
    }

    const navigation = new Nav();
    this.list = new List();
    const form = new Form();
    const bindedMethod = this.handleNoteSubmit.bind(this);
    form.onFormSubmit(bindedMethod);
    navigation.onFilterChange(this.handleFilterChange.bind(this));

    container.append(navigation.container, this.list.container, form.container);
  }

  handleNoteSubmit(noteData: DataObj) {
    const newNote = new Note(
      noteData.note,
      noteData.date,
      noteData.status,
      noteData.id
    );
    this.list.addNote(newNote);
  }

  handleFilterChange(statusFilter: Filter, isReversed: boolean) {
    this.list.renderNotes(statusFilter, isReversed);
    this.list.isReversed = isReversed;
  }
}
