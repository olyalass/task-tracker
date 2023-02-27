import { DataObj } from "types";

export function getDefaultArray(): Array<DataObj> {
  const date1 = new Date();
  date1.setMonth(0, 1);
  date1.setHours(11, 20);

  const date2 = new Date();
  date2.setMonth(0, 10);
  date2.setHours(15, 5);

  const notesArr: Array<DataObj> = [
    {
      id: 1,
      note: "Create new tasks",
      status: "Active",
      date: date2,
    },

    {
      id: 2,
      note: "Create to-do list app",
      status: "Done",
      date: date1,
    },
  ];

  return notesArr;
}
