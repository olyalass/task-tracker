import Storage from "../storage";
import { Action, Dispatch, StateObj } from "../../types";

function reducer(currentState: StateObj, action: Action): StateObj {
  switch (action.type) {
    case "LOAD_INITIAL_TASKS":
      return {
        ...currentState,
        loadingState: false,
        tasks: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...currentState,
        loadingState: false,
        tasks: [...currentState.tasks, action.payload],
      };

    case "DELETE_NOTE":
      return {
        ...currentState,
        loadingState: false,
        tasks: currentState.tasks.filter((task) => task.id !== action.payload),
      };

    case "CHANGE_NOTE_STATUS":
      return {
        ...currentState,
        loadingTasks: currentState.loadingTasks.filter((id)=> id!==action.payload.id),
        tasks: currentState.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };

    case "CHANGE_FILTER":
      return {
        ...currentState,
        filter: action.payload,
      };

    case "CHANGE_IS_REVERSED":
      return {
        ...currentState,
        isReversed: action.payload,
      };

    case "LOADING_STATE":
      return {
        ...currentState,
        loadingState: action.payload,
      };

    case "NOTE_LOADING_STATE":
      let loadingArr = currentState.loadingTasks.slice(0);
      if (action.payload.state) {
        loadingArr.push(action.payload.id);
      } else {
        loadingArr = loadingArr.filter((task) => task !== action.payload.id);
      }
      return { ...currentState, loadingTasks: loadingArr };

    default:
      return currentState;
  }
}

export default function dispatcherFunction(storageInstance: Storage): Dispatch {
  return function dispatch(action: Action) {
    const currentState = storageInstance.getState();
    storageInstance.updateState(reducer(JSON.parse(JSON.stringify(currentState)), action));
  };
}
