import "./styles.scss";

export class Nav {
  navContainer: HTMLDivElement;
  buttonAll: HTMLButtonElement;
  buttonToDo: HTMLButtonElement;
  buttonDone: HTMLButtonElement;

  constructor () {
    this.navContainer = document.createElement('div');
    this.navContainer.classList.add('nav__container');
    this.buttonAll = document.createElement('button');
    this.buttonAll.classList.add('nav__button');
    this.buttonAll.textContent = "All";
    this.buttonToDo = document.createElement('button');
    this.buttonToDo.classList.add('nav__button');
    this.buttonToDo.textContent = "To-do";
    this.buttonDone = document.createElement('button');
    this.buttonDone.classList.add('nav__button');
    this.buttonDone.textContent = "Done";
    this.navContainer.append(this.buttonAll, this.buttonToDo, this.buttonDone);
  }
}