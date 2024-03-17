"use client";
import emailStore from "@/stores/emailStore";
import { ChildComponentProps, WrapperProps } from "@/types/props";
import LoginAndSignup from "../LoginAndSignup";

function WithLoginComponent(
  ChildComponent: React.ComponentType<ChildComponentProps>
) {
  return function Wrapper(props: WrapperProps) {
    const { useremail } = emailStore();
    if (useremail) {
      return <ChildComponent {...props} />;
    }
    return <LoginAndSignup type={"login"} />;
  };
}
export default WithLoginComponent;
