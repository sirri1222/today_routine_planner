import { create } from "zustand";

interface schduleListType {
  id: string;
  title: string;
  completed: boolean;
}
interface schduleListState {
  scheduleList: string[];
  setAddSchedule: (title: string) => void;
}

const scheduleStore = create<schduleListState>((set) => ({
  scheduleList: [],
  setAddSchedule: (title) =>
    set((prevScheduelstate) => ({
      scheduleList: [...prevScheduelstate.scheduleList],
    })),
}));

export default scheduleStore;
