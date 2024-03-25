import * as React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { DateTimeFormatOptions } from "intl";
import { scheduledatatype } from "@/types/scheduledata";
import { supabase } from "@/lib/supabase";
import ScheduleModal from "./ScheduleModal/ScheduleModal";
import { useState } from "react";

interface optionstype {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

const SingleSchedule = ({
  schedule,
  onDelete,
  onUpdate,
}: {
  schedule: scheduledatatype;
  onDelete: () => void;
  onUpdate: (id: number, newTitle: string, newDescription: string) => void;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(schedule.title);
  const [updatedDescription, setUpdateDescription] = useState(
    schedule.description
  );
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
  const updateHandler = () => {
    onUpdate(schedule.id, updatedTitle, updatedDescription);
    setOpenModal(false);
  };
  const modalOpenHandler = () => {
    setOpenModal(true);
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
          <button onClick={onDelete}>삭제</button>
          <button onClick={modalOpenHandler}>수정</button>
        </div>
        {openModal && (
          <ScheduleModal
            updateHandler={updateHandler}
            openModal={openModal}
            setOpenModal={setOpenModal}
            onChangeNewTitle={onChangeNewTitle}
            onChangeNewDescription={onChangeNewDescription}
            updatedTitle={updatedTitle}
            updatedDescription={updatedDescription}
          />
        )}
      </div>
    </div>
  );
};

export default SingleSchedule;
