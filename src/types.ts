export type Filter = "Active" | "Done" | "All";

export type DataObj = {
  id: number;
  note: string;
  status: string;
  date: Date;
};

export type SubmitHandler = (note: DataObj) => void;

export type FilterChangeHandler = (
  statusFilter: string,
  isReversed: boolean
) => void;
