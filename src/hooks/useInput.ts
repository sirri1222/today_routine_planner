import React, { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import useInputState from "@/stores/inputStore";

export default function useInput() {
  const {
    addTodo,
    schedules,
    title,
    description,
    isComplete,
    errorMessage,
    openModal,
    setAddTodo,
    setSchedules,
    setTitle,
    setDescription,
    setIsComplete,
    setErrorMessage,
    setOpenModal,
  } = useInputState();

  const router = useRouter();
  const session = useSession();

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
  const openAddModalHandler = () => {
    setAddTodo(!addTodo);
  };

  const deleteSchedule = async (id: number) => {
    try {
      await supabase.from("todos").delete().eq("id", id).throwOnError();
      setSchedules(schedules.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateSchedule = (
    id: number,
    newTitle: string,
    newDescription: string
  ) => {
    setSchedules(
      schedules.map((schedule) => {
        if (schedule.id === id) {
          return { ...schedule, title: newTitle, description: newDescription };
        }
        return schedule;
      })
    );
  };

  const submitAddHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage("");
    if (description.length <= 10) {
      setErrorMessage("10글자 이상 적어주세요");
      return;
    }
    try {
      const { data, error } = (await supabase.from("todos").insert([
        {
          title,
          description,
          isComplete,
          user_id: session?.user.email,
        },
      ])) as { data: any; error: any };

      if (error) {
      } else {
        const newSchedule = {
          id: data?.length + 1,
          title: title,
          description: description,
        };
        setSchedules?.([...data, newSchedule]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalOpenHandler = () => {
    setOpenModal(true);
  };

  const submitUpdateHandler = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({
          title,
          description,
          isComplete,
          user_id: session?.user.email,
        })
        .eq("some_column", "someValue")
        .select();
    } catch (err) {
      console.log(err);
      closeUpdateModalHandler();
    }
  };
  const closeAddModalHandler = () => {
    setTitle("");
    setDescription("");
    setIsComplete(false);
    setAddTodo(false);
  };
  const closeUpdateModalHandler = () => {
    setTitle("");
    setDescription("");
    setIsComplete(false);
    setOpenModal(false);
  };

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

  return {
    addTodo,
    schedules,
    setSchedules,
    session,
    updateSchedule,
    deleteSchedule,
    sighOutHandler,
    closeAddModalHandler,
    closeUpdateModalHandler,
    submitAddHandler,
    submitUpdateHandler,
    title,
    setTitle,
    modalOpenHandler,
    openModal,
    setOpenModal,
    setDescription,
    description,
    openAddModalHandler,
  };
}
