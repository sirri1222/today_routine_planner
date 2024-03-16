import TodayRoutine from "@/component/TodayRoutine";
import TodaySchedule from "@/component/TodaySchedule";
import WithLoginComponent from "@/component/WithLoginComponent";

const page = () => {
  const EnhancedChildComponent = WithLoginComponent(TodayRoutine);
  return (
    <>
      <EnhancedChildComponent />
      <TodaySchedule />
    </>
  );
};

export default page;
