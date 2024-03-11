import { createStore } from "zustand";

interface userDataInfo {
  user: string | null;
  setUser: (newUser: string) => void;
}

export const useStore = createStore<userDataInfo>((set) => ({
  user: null,
  setUser: (newUser: string) => set({ user: newUser }), // setUser 함수를 통해 유저 정보 업데이트
}));
