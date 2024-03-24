"use client";
import React, { useState, useEffect, useRef } from "react";
import { AppBar, Button, IconButton, List, Toolbar } from "@mui/material";
import emailStore from "@/stores/emailStore";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import ScheduleModal from "./ScheduleModal/ScheduleModal";
import SingleSchedule from "./SingleSchedule";
import dayGridPlugin from "@fullcalendar/daygrid";
import { scheduledatatype } from "@/types/scheduledata";
import { useSession } from "@supabase/auth-helpers-react";

const TodayRoutine = () => {
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
  const [addTodo, setAddTodo] = useState(false);

  const [schedules, setSchedules] = useState<scheduledatatype[]>([]);
  const session = useSession();
  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });

      if (error) console.log("error", error);
      else setSchedules([...todos, todos]);
    };

    fetchTodos();
  }, [supabase]);
  console.log(schedules, "데이터");

  const deleteSchedule = async (id: number) => {
    try {
      await supabase.from("todos").delete().eq("id", id).throwOnError();
      setSchedules(schedules.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };
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
          <ScheduleModal type="add" setAddTodo={setAddTodo} addTodo={addTodo} />
        )}
        <div className="flex justify-around">
          {schedules.map((schedule) => (
            <SingleSchedule
              schedule={schedule}
              onDelete={() => deleteSchedule(Number(schedule.id))}
              key={schedule.id}
            />
          ))}
        </div>
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
