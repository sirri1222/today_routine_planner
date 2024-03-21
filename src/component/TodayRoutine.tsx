"use client";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import emailStore from "@/stores/emailStore";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import scheduleStore from "@/stores/scheduleStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const TodayRoutine = () => {
  const events = [{ title: "Meeting", start: new Date() }];

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    scheduleText.length && setAddSchedule(scheduleText);
  };
  const [scheduleText, setScheduleText]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  const { scheduleList, setAddSchedule } = scheduleStore();
  const router = useRouter();
  const sighOutHandler = async () => {
    try {
      await supabase.auth.signOut();
      alert("로그아웃 되었습니다.");
      router.push("/");
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패:");
    }
  };
  const { useremail } = emailStore();
  const [checked, setChecked] = React.useState([true, false]);
  const [addTodo, setAddTodo] = useState(false);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="아침운동하기"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="카공하기"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <>
      <Button onClick={sighOutHandler}>{useremail}님 로그아웃</Button>
      <br />
      <FormControlLabel
        label="오늘의 루틴"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
      <p
        onClick={() => {
          setAddTodo(!addTodo);
        }}
      >
        할일 추가하기 +
      </p>
      {addTodo && (
        <>
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            value={scheduleText}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setScheduleText(e.target.value);
            }}
          />
          <Button onClick={handleClick}>추가하기</Button>
        </>
      )}
      {scheduleList.map((item) => (
        <p key={item.title}>{item.title}</p>
      ))}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={scheduleList}
      />
    </>
  );
};

export default TodayRoutine;
