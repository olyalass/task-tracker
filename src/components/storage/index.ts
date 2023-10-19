import { StateObj } from "types";

export default class Storage {
  state: StateObj;
  subscribers: Function[] = [];

  constructor(state: StateObj) {
    this.state = state;
  }

  forcedConstructor(state: StateObj) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  updateState(state: StateObj) {
    this.state = state;
    this.subscribers.forEach((fn) => {
      fn(this.state);
    });
  }

  subscribe(fn: Function) {
    this.subscribers.push(fn);
  }

  forceUpdate() {
    this.subscribers.forEach((fn) => {
      fn(this.state);
    });
  }
}
