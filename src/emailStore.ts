import { create} from "zustand";

interface userDataInfo {
  useremail: string;
  setEmail: (email: string) => void;
}

const emailStore = create<userDataInfo>((set) => ({
  useremail: "",
  setEmail: (email) =>
    set((state) => ({
      useremail: email
    })); // setUser 함수를 통해 유저 정보 업데이트
}));

export default emailStore;
