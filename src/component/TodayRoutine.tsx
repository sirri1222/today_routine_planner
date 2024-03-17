"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import emailStore from "@/stores/emailStore";
const TodayRoutine = () => {
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
      <Button>{useremail}님 로그아웃</Button>
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
        <TextField id="standard-basic" label="Standard" variant="standard" />
      )}
    </>
  );
};

export default TodayRoutine;
