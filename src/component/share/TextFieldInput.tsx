import React from "react";
import TextField from "@mui/material/TextField";
interface loginInputDate {
  id: string;
  label: string;
  name: string;
  autoComplete: string;
  type?:string
  autoFocus: string;
}

const TextFieldInput = ({ inputdata }: {inputdata: loginInputDate}) => {
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
