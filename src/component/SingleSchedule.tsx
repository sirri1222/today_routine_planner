import React, { useState } from "react";
import { DateTimeFormatOptions } from "intl";
import { scheduledatatype } from "@/types/scheduledata";
import ScheduleModal from "./ScheduleModal/ScheduleModal";
import useInput from "@/hooks/useInput";

interface optionstype {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

const SingleSchedule = ({ schedule }: { schedule: scheduledatatype }) => {
  const { deleteSchedule, updateSchedule, setOpenModal, openModal } =
    useInput();
  const [updatedTitle, setUpdatedTitle] = React.useState(schedule.title);
  const [updatedDescription, setUpdateDescription] = useState(
    schedule.description
  );
  const onUpdate = () => {
    updateSchedule(Number(schedule.id), schedule.title, schedule.description);
  };
  const updateHandler = () => {
    onUpdate();
    setOpenModal(false);
  };
  const onChangeNewTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedTitle(e.target.value);
  };
  const onChangeNewDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateDescription(e.target.value);
  };
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
    <div className="flex justify-around items-center text-center">
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
        <div>
          <button onClick={() => deleteSchedule(Number(schedule.id))}>
            삭제
          </button>
          <button onClick={updateHandler}>수정</button>
        </div>
        {openModal && (
          <ScheduleModal
            onChangeNewTitle={onChangeNewTitle}
            updatedTitle={updatedTitle}
            onChangeNewDescription={onChangeNewDescription}
            updatedDescription={updatedDescription}
          />
        )}
      </div>
    </div>
  );
};

export default SingleSchedule;
