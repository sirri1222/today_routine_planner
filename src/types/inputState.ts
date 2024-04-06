export interface Schedule {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  insertedat: string;
}

export interface StoreState {
  addTodo: boolean;
  schedules: Schedule[];
  title: string;
  description: string;
  isComplete: boolean;
  errorMessage: string;
  openModal: boolean;
}

export interface StoreActions {
  setAddTodo: (addTodo: boolean) => void;
  setSchedules: (schedules: Schedule[]) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setIsComplete: (isComplete: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
  setOpenModal: (openModal: boolean) => void;
}
