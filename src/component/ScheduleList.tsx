import useInput from "@/hooks/useInput";
import SingleSchedule from "./SingleSchedule";

const ScheduleList = () => {
  const { schedules } = useInput();
  return (
    <>
      <div className="flex justify-around">
        {schedules.map((schedule) => (
          <div key={schedule.id}>
            <SingleSchedule schedule={schedule} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ScheduleList;
