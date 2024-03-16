"use client";

import TodayRoutine from "./TodayRoutine";
import WithLoginComponent from "./WithLoginComponent";

const TodaySchedule = () => {
  return (
    <>
      <TodayRoutine />
    </>
  );
};

export default WithLoginComponent(TodaySchedule);
