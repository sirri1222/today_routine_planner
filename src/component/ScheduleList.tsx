import useInput from "@/hooks/useInput";
import SingleSchedule from "./SingleSchedule";

const ScheduleList = () => {
  const { schedules, } = useInput();
  return (
    <>
      <div className="flex justify-around">
        {schedules.map((schedule) => (
          <SingleSchedule schedule={schedule} key={schedule.id} />
        ))}
      </div>
    </>
  );
};

export default ScheduleList;
