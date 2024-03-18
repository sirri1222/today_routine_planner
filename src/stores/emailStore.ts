import { create } from "zustand";

interface userDataInfo {
  useremail: string;
  setEmail: (email: string) => void;
}

const emailStore = create<userDataInfo>((set) => ({
  useremail: "",
  setEmail: (email) =>
    set((state) => ({
      useremail: email,
    })), 
}));

export default emailStore;
