import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { DateTimeFormatOptions } from "intl";
import { Database } from "@/lib/schema";
import { scheduledatatype } from "@/types/scheduledata";

interface optionstype {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

const SingleSchedule = ({ schedule }: { schedule: scheduledatatype }) => {
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
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {schedule.title}
          </Typography>
          <Typography gutterBottom variant="h2" component="div">
            {getDateInMonthDayYear(schedule.insertedat)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {schedule.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SingleSchedule;
