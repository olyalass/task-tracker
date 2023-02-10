import "./styles.scss";

export class Nav {
  container: HTMLDivElement;
  buttonsContainer: HTMLDivElement;
  buttonAll: HTMLButtonElement;
  buttonToDo: HTMLButtonElement;
  buttonDone: HTMLButtonElement;
  buttonRevert: HTMLButtonElement;

  constructor () {
    this.container = document.createElement('div');
    this.container.classList.add('nav');
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.classList.add('nav__container');
    this.buttonRevert = document.createElement('button');
    this.buttonRevert.classList.add('nav__revert');
    this.container.append(this.buttonsContainer, this.buttonRevert);

    this.buttonAll = document.createElement('button');
    this.buttonAll.classList.add('nav__button');
    this.buttonAll.textContent = "All";
    this.buttonToDo = document.createElement('button');
    this.buttonToDo.classList.add('nav__button');
    this.buttonToDo.textContent = "To-do";
    this.buttonDone = document.createElement('button');
    this.buttonDone.classList.add('nav__button');
    this.buttonDone.textContent = "Done";
    this.buttonsContainer.append(this.buttonAll, this.buttonToDo, this.buttonDone);
  }
}