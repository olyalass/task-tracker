import "./styles.scss";
import { FilterChangeHandler, Filter } from "../../types";

export class Nav {
  container: HTMLDivElement;
  buttonsContainer: HTMLDivElement;
  buttonAll: HTMLButtonElement;
  buttonToDo: HTMLButtonElement;
  buttonDone: HTMLButtonElement;
  buttonReverse: HTMLButtonElement;
  filter: Filter = "All";
  isReversed: boolean = false;
  handler: FilterChangeHandler | null = null;
  selectedButton: HTMLButtonElement;

  constructor () {
    this.container = document.createElement('div');
    this.container.classList.add('nav');
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('nav__container');
    this.buttonReverse = document.createElement('button');
    this.buttonReverse.classList.add('nav__button');
    this.container.append(this.buttonsContainer, this.buttonReverse);

    const buttonImg = document.createElement('div');
    buttonImg.classList.add('nav__reverse');
    this.buttonReverse.appendChild(buttonImg);
    this.buttonReverse.addEventListener("click", () => {
      this.isReversed === false ? this.isReversed = true : this.isReversed = false;
      this.handler(this.filter, this.isReversed);
    })
    

    this.buttonAll = document.createElement('button');
    this.buttonAll.classList.add('nav__button', 'nav__button_selected');
    this.selectedButton = this.buttonAll;
    this.buttonAll.textContent = "All";
    this.setFilterOnClick(this.buttonAll, "All");

    this.buttonToDo = document.createElement('button');
    this.buttonToDo.classList.add('nav__button');
    this.buttonToDo.textContent = "Active";
    this.setFilterOnClick(this.buttonToDo, "Active");

    this.buttonDone = document.createElement('button');
    this.buttonDone.classList.add('nav__button');
    this.buttonDone.textContent = "Done";
    this.setFilterOnClick(this.buttonDone, "Done");

    this.buttonsContainer.append(this.buttonAll, this.buttonToDo, this.buttonDone);
  }

  onFilterChange(handler: FilterChangeHandler) {
    this.handler = handler;
  }

  setFilterOnClick(button: HTMLButtonElement, name: Filter) {
    button.addEventListener("click", () => {
      this.selectedButton.classList.remove("nav__button_selected")
      this.filter = name;
      this.selectedButton = button;
      button.classList.add("nav__button_selected");
      this.handler(this.filter, this.isReversed);
    });
  }
}
