import "./styles.scss";

export class AddBoard {
  container: HTMLDivElement;
  buttonAdd: HTMLButtonElement;
  noteText: string;

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("board");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("board__input");
    this.buttonAdd = document.createElement("button");
    this.buttonAdd.classList.add("board__button");
    this.buttonAdd.setAttribute("type", "submit");
    this.buttonAdd.textContent = "Add";
    this.container.append(input, this.buttonAdd);
  }
}