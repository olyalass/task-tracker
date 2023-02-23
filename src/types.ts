type Status = "Active" | "Done"

export type DataObj =
  {
    note: string,
    status: string,
    date: Date
  }

export type SubmitHandler = (note: DataObj) => void