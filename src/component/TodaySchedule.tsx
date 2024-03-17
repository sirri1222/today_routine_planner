"use client";

import FullCalendar from "@fullcalendar/react";
import TodayRoutine from "./TodayRoutine";
import WithLoginComponent from "./hoc/WithLoginComponent";
import dayGridPlugin from "@fullcalendar/daygrid";

const TodaySchedule = () => {
  const events = [{ title: "Meeting", start: new Date() }];

  return (
    <>
      <TodayRoutine />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
      />
    </>
  );
};

export default WithLoginComponent(TodaySchedule);
