"use client";
import emailStore from "@/stores/emailStore";
import { ChildComponentProps, WrapperProps } from "@/types/props";
import LoginAndSignupContainer from "../LoginSignup/LoginAndSignupContainer";
function WithLoginComponent(
  ChildComponent: React.ComponentType<ChildComponentProps>
) {
  return function Wrapper(props: WrapperProps) {
    const { useremail } = emailStore();
    if (useremail) {
      return <ChildComponent {...props} />;
    }
    return <LoginAndSignupContainer type={"login"} />;
  };
}
export default WithLoginComponent;
