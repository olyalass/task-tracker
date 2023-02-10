import "./styles.scss";

export class Note {
  container: HTMLDivElement;
  buttonDelete: HTMLButtonElement;
  buttonDone: HTMLButtonElement;

  constructor(text: string, date: Date, status: string) {
    this.container = document.createElement("div");
    this.container.classList.add("note");
    const leftContainer = document.createElement("div");
    leftContainer.classList.add("note__container_inner");
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("note__container_inner");
    this.container.append(leftContainer, rightContainer);

    const note = document.createElement("p");
    note.textContent = text;
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("note__container_buttons");
    leftContainer.append(note, buttonsContainer);

    this.buttonDelete = document.createElement("button");
    this.buttonDelete.classList.add("note__button");
    this.buttonDelete.textContent = "Delete";
    this.buttonDone = document.createElement("button");
    this.buttonDone.classList.add("note__button");
    this.buttonDone.textContent = "Done";
    buttonsContainer.append(this.buttonDone, this.buttonDelete);

    const statusElem = document.createElement("p");
    statusElem.classList.add("note__status");
    statusElem.textContent = status;
    status === "Active" ? statusElem.classList.add("note__status_active") : statusElem.classList.add("note__status_done");

    const dateElem = document.createElement("p");
    dateElem.classList.add("note__date");
    dateElem.textContent = getPrettyDate(date);

    rightContainer.append(statusElem, dateElem);
  }
}

function getPrettyDate (date: Date) {
  const daysArr = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day: string = daysArr[date.getDay()];
  const dateNum: number = date.getDate();
  const month: string = monthsArr[date.getMonth()];
  const year: number = date.getFullYear();
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${day}   ${dateNum} ${month} ${year}   ${hours}:${mins}`;

}