import { Button } from "@mui/material";
const InputButton = ({ buttonName }: { buttonName: string }) => {
  return (
    <>
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
        {buttonName}
      </Button>
    </>
  );
};

export default InputButton;
