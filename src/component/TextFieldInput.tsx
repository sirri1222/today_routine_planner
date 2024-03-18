import React from "react";
import TextField from "@mui/material/TextField";
import { loginInputDatetype } from "@/types/props";

const TextFieldInput = ({ inputdata }: { inputdata: loginInputDatetype }) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id={inputdata.id}
        type={inputdata.type}
        label={inputdata.label}
        name={inputdata.name}
        autoComplete={inputdata.autoComplete}
      />
    </>
  );
};

export default TextFieldInput;
