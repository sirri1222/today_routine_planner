"use client";
import { AppBar, Button, Toolbar } from "@mui/material";

import ScheduleModal from "./ScheduleModal/ScheduleModal";
import useInpute from "../hooks/useInput";
import ScheduleList from "./ScheduleList";

const TodayRoutine = () => {
  const { addTodo, setAddTodo, setSchedules, session,sighOutHandler } = useInpute();

  return (
    <div className="relative">
      <AppBar position="static">
        <Toolbar>
          <div className="flex justify-between">
            <Button className="buttontextcolor" onClick={sighOutHandler}>
              {session?.user.email}님 로그아웃
            </Button>
            <Button
              className="buttoncolor"
              variant="contained"
              onClick={() => {
                setAddTodo(!addTodo);
              }}
            >
              할일 추가하기 +
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="mainwidth relative mx-auto">
        {addTodo && (
          <ScheduleModal
            type="add"
          />
        )}
        <ScheduleList />
        {/* <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={schedules}
      /> */}
      </div>
    </div>
  );
};

export default TodayRoutine;
