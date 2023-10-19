import { TaskDataObj } from "../types";
import ApiInterface from "./apiInterface";

export default class ServerApi implements ApiInterface {
  tasksArr: TaskDataObj[];

  constructor() {
    const jsonTasks = localStorage.getItem("tasks");
    this.tasksArr = JSON.parse(jsonTasks);
    if (this.tasksArr) {
      this.tasksArr.map((obj: TaskDataObj) => ({
        ...obj,
        date: new Date(obj.date),
      }));
    }
  }

  getAll() {
    return Promise.resolve(this.tasksArr);
  }

  add(newTask: TaskDataObj) {
    return Promise.resolve(newTask);
  }

  remove(id: number) {
    return Promise.resolve(id);
  }

  update(updatedTask: TaskDataObj) {
    return Promise.resolve(updatedTask);
  }
}
