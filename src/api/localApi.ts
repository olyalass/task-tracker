import { TaskDataObj } from "../types";
import ApiInterface from "./apiInterface";

export default class LocalApi implements ApiInterface {
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
    this.updateStoredData();
    return new Promise<TaskDataObj[]>((res) => {
      setTimeout(() => {
        res(this.tasksArr);
      }, 500);
    });
  }

  add(newTask: TaskDataObj) {
    return new Promise<TaskDataObj>((res) => {
      setTimeout(() => {
        if (this.tasksArr) {
          this.tasksArr.push(newTask);
        } else {
          this.tasksArr = [newTask];
        }
        res(newTask);
        this.updateStoredData();
      }, 1000);
    });
  }

  remove(id: number) {
    return new Promise<number>((res) => {
      this.tasksArr = this.tasksArr.filter((task) => task.id !== id);
      this.updateStoredData();
      setTimeout(() => {
        res(id);
      }, 1000);
    });
  }

  update(updatedTask: TaskDataObj) {
    this.findTask(updatedTask.id).status = updatedTask.status;
    return new Promise<TaskDataObj>((res) => {
      setTimeout(() => {
        res(updatedTask);

        this.updateStoredData();
      }, 1000);
    });
  }

  private updateStoredData() {
    localStorage.setItem("tasks", JSON.stringify(this.tasksArr));
  }

  private findTask(id: number) {
    return this.tasksArr.find((task) => task.id === id);
  }
}
