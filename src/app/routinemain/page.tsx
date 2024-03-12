import TodayRoutine from "@/component/TodayRoutine";
import TodaySchedule from "@/component/TodaySchedule";
import emailStore from "@/emailStore";
import { Button } from "@mui/material";

const page = () => {
  const { useremail } = emailStore();
  return (
    <>
    <Button>{useremail}님 로그아웃</Button>
      <TodayRoutine />
      <TodaySchedule />
    </>
  );
};

export default page;
