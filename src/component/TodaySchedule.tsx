"use client";

import TodayRoutine from "./TodayRoutine";
import WithLoginComponent from "./hoc/WithLoginComponent";

const TodaySchedule = () => {
  return (
    <>
      <TodayRoutine />
    </>
  );
};

export default WithLoginComponent(TodaySchedule);
