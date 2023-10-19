import "./styles.scss";
import { StateObj, Dispatch, Filter } from "types";
import { createHtmlElement } from "../../../utils";

export default class Nav {
  element: HTMLDivElement;
  private filterWrap: HTMLDivElement;
  private buttonAll: HTMLButtonElement;
  private buttonActive: HTMLButtonElement;
  private buttonDone: HTMLButtonElement;
  private buttonReserse: HTMLButtonElement;
  dispatch: Dispatch;
  private isReversed: boolean = false;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.element = createHtmlElement<HTMLDivElement>("div", ["nav"]);
    this.createDOMElement();
    this.buttonAll.classList.add("nav__button_selected");
  }

  getView() {
    return this.element;
  }

  onStateUpdate(state: StateObj) {
    [this.buttonAll, this.buttonActive, this.buttonDone].forEach((button) =>
      button.classList.remove("nav__button_selected")
    );
    switch (state.filter) {
      case "active":
        this.buttonActive.classList.add("nav__button_selected");
        break;
      case "done":
        this.buttonDone.classList.add("nav__button_selected");
        break;
      default:
        this.buttonAll.classList.add("nav__button_selected");
    }
    switch (state.isReversed) {
      case true:
        this.buttonReserse.classList.add("nav__button_selected");
        break;
      case false:
        this.buttonReserse.classList.remove("nav__button_selected");
    }
  }

  private createDOMElement() {
    this.element.childNodes.forEach((el) => el.remove);
    this.filterWrap = createHtmlElement<HTMLDivElement>("div", [
      "nav__container",
    ]);
    this.buttonAll = createHtmlElement<HTMLButtonElement, Filter>(
      "button",
      ["nav__button"],
      "All",
      "all"
    );
    this.buttonActive = createHtmlElement<HTMLButtonElement, Filter>(
      "button",
      ["nav__button"],
      "Active",
      "active"
    );
    this.buttonDone = createHtmlElement<HTMLButtonElement, Filter>(
      "button",
      ["nav__button"],
      "Done",
      "done"
    );
    this.buttonReserse = createHtmlElement<HTMLButtonElement>("button", [
      "nav__button",
      "nav__reverse",
    ]);
    this.element.append(this.filterWrap, this.buttonReserse);
    this.filterWrap.append(this.buttonAll, this.buttonActive, this.buttonDone);

    [this.buttonAll, this.buttonActive, this.buttonDone].forEach((button) =>
      button.addEventListener("click", () => {
        this.dispatch({
          type: "CHANGE_FILTER",
          payload: button.dataset.name as Filter,
        });
      })
    );
    this.buttonReserse.addEventListener("click", () => {
      switch (this.isReversed) {
        case true:
          this.isReversed = false;
          this.buttonReserse.classList.remove("nav__button_selected");
          break;
        case false:
          this.isReversed = true;
          this.buttonReserse.classList.add("nav__button_selected");
          break;
      }
      this.dispatch({
        type: "LOADING_STATE",
        payload: true
      })
      this.dispatch({ type: "CHANGE_IS_REVERSED", payload: this.isReversed });
      this.dispatch({
        type: "LOADING_STATE",
        payload: false
      })
    });
  }
}
