interface titletype {
  title: String;
  subtitle: string;
}
export const titledata: titletype[] = [
  { title: "오", subtitle: "늘의" },
  { title: "루", subtitle: "틴" },
  { title: "완", subtitle: "료" },
];
interface loginInputDatetype {
  id: string;
  label: string;
  name: string;
  autoComplete: string;
  autoFocus: string;
  type?: string;
  buttonTitle?: string;
}

export const loginInputDate: loginInputDatetype[] = [
  {
    id: "email",
    label: "이메일",
    name: "email",
    autoComplete: "email",
    autoFocus: "autoFocus",
  },
  {
    id: "password",
    label: "비밀번호",
    name: "password",
    autoComplete: "current-password",
    autoFocus: "autoFocus",
    type: "password",
  },
];
interface loginSignupInputtype {
  id: string;
  title: string;
  link: string;
  autoComplete: string;
  autoFocus: string;
  type?: string;
  buttonTitle?: string;
}
export const loginSignupInputDate: loginSignupInputtype[] = [
  {
    id: "login",
    title: "로그인",
    link: "/signup",
    autoComplete: "email",
    autoFocus: "autoFocus",
  },
  {
    id: "signup",
    title: "회원가입",
    link: "/",
    autoComplete: "current-password",
    autoFocus: "autoFocus",
    type: "password",
  },
];
