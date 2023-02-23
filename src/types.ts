type Status = "Active" | "Done"

export type DataObj =
  {
    note: string,
    status: string,
    date: Date
  }

export type SubmitHandler = (note: DataObj) => void;

export type FilterChangeHandler = (statusFilter: string, isReversed: boolean) => void;