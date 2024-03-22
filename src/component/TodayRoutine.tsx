"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import emailStore from "@/stores/emailStore";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import ScheduleModal from "./ScheduleModal/ScheduleModal";
import SingleSchedule from "./SingleSchedule";
import Head from "next/head";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { scheduledatatype } from "@/types/scheduledata";

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
  const { useremail } = emailStore();
  const [addTodo, setAddTodo] = useState(false);

  const [schedules, setSchedules] = useState<scheduledatatype[]>([]);

  const user = supabase.auth.getUser.name;
  console.log(user, "________");
  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });

      if (error) console.log("error", error);
      else setSchedules(todos);
    };

    fetchTodos();
  }, [supabase]);
  console.log(schedules, "데이터");
  return (
    <div className="px-[11.5rem]">
      <Head>
        <Button onClick={sighOutHandler}>{useremail}님 로그아웃</Button>
      </Head>
      <p
        onClick={() => {
          setAddTodo(!addTodo);
        }}
      >
        할일 추가하기 +
      </p>
      {addTodo && <ScheduleModal setAddTodo={setAddTodo} addTodo={addTodo} />}
      {schedules.map((schedule) => (
        <div className="flex justify-between">
          <SingleSchedule schedule={schedule} key={schedule.id} />
        </div>
      ))}
      {/* <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={schedules}
      /> */}
    </div>
  );
};

export default TodayRoutine;
