import * as React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { DateTimeFormatOptions } from "intl";
import { scheduledatatype } from "@/types/scheduledata";

interface optionstype {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

const SingleSchedule = ({ schedule }: { schedule: scheduledatatype }) => {
  const getDateInMonthDayYear = (date: string | number | Date) => {
    const d = new Date(date);
    const options: DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const n = d.toLocaleDateString("en-US", options);
    const replase = n.replace(new RegExp(",", "g"), " ");
    return replase;
  };

  return (
    <div className="mx-auto border-slate-200 border-solid rounded-xl bg-red-300 py-5 w-[19rem] h-[11rem]">
      <p className="text-gray-400">
        {getDateInMonthDayYear(schedule.insertedat)}
      </p>
      <p className="text-xl">
        {schedule.title ? schedule.title : "할일을 입력해주세요."}
      </p>
      <p className="text-sm">
        {schedule.description ? schedule.description : "할일을 입력해주세요."}
      </p>
    </div>
  );
};

export default SingleSchedule;
