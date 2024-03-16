"use client";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
const TodaySchedule = () => {
  return (
    <>
      <LocalizationProvider>
        <DateCalendar />
      </LocalizationProvider>
    </>
  );
};

export default TodaySchedule;
