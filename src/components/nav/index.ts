import "./styles.scss";

export class Nav {
  container: HTMLDivElement;
  buttonsContainer: HTMLDivElement;
  buttonAll: HTMLButtonElement;
  buttonToDo: HTMLButtonElement;
  buttonDone: HTMLButtonElement;
  buttonReverse: HTMLButtonElement;
  isReversed: boolean = false;

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
    })
    

    this.buttonAll = document.createElement('button');
    this.buttonAll.classList.add('nav__button');
    this.buttonAll.textContent = "All";
    this.buttonToDo = document.createElement('button');
    this.buttonToDo.classList.add('nav__button');
    this.buttonToDo.textContent = "Active";
    this.buttonDone = document.createElement('button');
    this.buttonDone.classList.add('nav__button');
    this.buttonDone.textContent = "Done";
    this.buttonsContainer.append(this.buttonAll, this.buttonToDo, this.buttonDone);
  }
}