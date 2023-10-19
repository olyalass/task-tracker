import { TaskDataObj } from "../types";

export default interface ApiInnterface {
  getAll(): Promise<TaskDataObj[]>;
  add(newTask: TaskDataObj): Promise<TaskDataObj>;
  remove(id: number): Promise<number>;
  update(updatedTask: TaskDataObj): Promise<TaskDataObj>;
}

