import { create } from "zustand";
import  {StoreActions, StoreState } from "../types/inputState";

const useInputStore = create<StoreState & StoreActions>((set) => ({
  addTodo: false,
  schedules: [],
  title: "",
  description: "",
  isComplete: false,
  errorMessage: "",
  openModal: false,
  session: null,

  setAddTodo: (addTodo) => set({ addTodo }),
  setSchedules: (schedules) => set({ schedules }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setIsComplete: (isComplete) => set({ isComplete }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setOpenModal: (openModal) => set({ openModal }),
}));

export default function useInputState() {
  const {
    addTodo,
    schedules,
    title,
    description,
    isComplete,
    errorMessage,
    openModal,
    setAddTodo,
    setSchedules,
    setTitle,
    setDescription,
    setIsComplete,
    setErrorMessage,
    setOpenModal,
  } = useInputStore();

  return {
    addTodo,
    schedules,
    title,
    description,
    isComplete,
    errorMessage,
    openModal,
    setAddTodo,
    setSchedules,
    setTitle,
    setDescription,
    setIsComplete,
    setErrorMessage,
    setOpenModal,
  };
}
