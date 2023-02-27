import "./styles.scss";

export class Warning {
  container: HTMLDivElement;
  button: HTMLButtonElement;

  constructor(addButton: HTMLButtonElement) {
    this.container = document.createElement("div");
    this.container.classList.add("warning");

    this.button = document.createElement("button");
    this.button.classList.add("warning__button");
    this.button.addEventListener("click", () => {
      this.container.classList.remove("warning_visible");
      addButton.removeAttribute("disabled");
    });

    const warningText1 = document.createElement("p");
    warningText1.classList.add("warning__text");
    warningText1.textContent = "Sorry, you already have this task!";
    const warningText2 = document.createElement("p");
    warningText2.classList.add("warning__text");
    warningText2.textContent =
      "You can't create it agian until it isn't done/deleted :(";

    this.container.append(this.button, warningText1, warningText2);
  }
}
