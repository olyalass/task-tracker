export type Filter = "active" | "done" | "all";

export type TaskDataObj = {
  id: number;
  note: string;
  status: Status;
  date: Date;
};

export type Status = "active" | "done";

export type UpdatableFeature = "note" | "status";

export type SubmitHandler = (note: TaskDataObj) => void;

export type FilterChangeHandler = (
  statusFilter: string,
  isReversed: boolean
) => void;

export type StateObj = {
  filter: Filter;
  tasks: TaskDataObj[];
  loadingState: boolean;
  loadingTasks: number[];
  isReversed: boolean;
};

export type Action =
  | {
      type: "LOAD_INITIAL_TASKS";
      payload: TaskDataObj[];
    }
  | {
      type: "ADD_NOTE";
      payload: TaskDataObj;
    }
  | {
      type: "DELETE_NOTE";
      payload: number;
    }
  | {
      type: "CHANGE_NOTE_STATUS";
      payload: {
        id: number;
        status: Status;
      };
    }
  | {
      type: "CHANGE_IS_REVERSED";
      payload: boolean;
    }
  | {
      type: "CHANGE_FILTER";
      payload: Filter;
    }
  | {
      type: "LOADING_STATE";
      payload: boolean;
    }
  | {
      type: "NOTE_LOADING_STATE";
      payload: { id: number; state: boolean };
    };

export type Dispatch = (action: Action) => void;
