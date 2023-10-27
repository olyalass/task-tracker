import { TaskDataObj } from "../types";
import ApiInterface from "./apiInterface";

export default class ServerApi implements ApiInterface {
  tasksArr: TaskDataObj[];

  constructor() {
    this.getAll().then((res) =>
      res.map((obj: TaskDataObj) => ({
        ...obj,
        date: new Date(obj.date),
      }))
    );
  }

  getAll() {
    async function getTasks() {
      const response = await fetch("http://localhost:3000/tasks");
      let tasksArr: TaskDataObj[] = [];
      if (response.ok) {
        let json = await response.text();
        return (tasksArr = JSON.parse(json));
      }
    }
    return getTasks();
  }

  add(newTask: TaskDataObj) {
    async function addTask(newTask: TaskDataObj) {
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(newTask);
      return newTask;
    }
    return addTask(newTask);
  }

  remove(id: number) {
    async function deleteTask(id: number) {
      await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });
      return id;
    }
    return deleteTask(id);
  }

  update(updatedTask: TaskDataObj) {
    async function updateTask(updatedTask: TaskDataObj) {
      await fetch("http://localhost:3000/tasks/" + updatedTask.id, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return updatedTask;
    }
    return updateTask(updatedTask);
  }
}
