import emailStore from "@/emailStore";
import { ChildComponentProps, WrapperProps } from "@/typedefinition/props";
import Login from "./LoginAndSignup";
import TodayRoutine from "./TodayRoutine";

function WithLoginComponent(
  TodayRoutine: React.ComponentType<ChildComponentProps>
) {
  return function Wrapper(props: WrapperProps) {
    const { useremail } = emailStore();
    if (useremail) {
      return <TodayRoutine user={useremail} {...props} />;
    }
    return (
      <>
        <Login type="login" />
      </>
    );
  };
}
export default WithLoginComponent;
