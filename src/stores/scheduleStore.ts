import { create } from "zustand";

interface schduleListType {
  id?: string;
  title: string;
  completed: boolean;
}
interface schduleListState {
  scheduleList: schduleListType[];
  setAddSchedule: (title: string) => void;
  removeSchedule: (id: string) => void;
}

const scheduleStore = create<schduleListState>((set) => ({
  scheduleList: [],
  setAddSchedule: (title) =>
    set((prevScheduelstate) => ({
      scheduleList: [
        ...prevScheduelstate.scheduleList,
        {
          title,
          completed: false,
        },
      ],
    })),
    removeSchedule: (id) => {
      set((state) => ({
        scheduleList: state.scheduleList.filter((scheduleList) => scheduleList.id !== id),
      }));
    },
}));


export default scheduleStore;
