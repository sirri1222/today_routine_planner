import { supabase } from "@/lib/supabase";
import { Button, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import InputButton from "../InputButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
const ScheduleModal = ({
  setAddTodo,
  addTodo,
}: {
  setAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo: boolean;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage("");
    if (description.length <= 10) {
      setErrorMessage("Description must have more than 10 characters");
      return;
    }
    setIsLoading(true);
    const user = supabase.auth.getUser();
    const { error } = await supabase
      .from("todos")
      .insert([
        { title, description, isComplete, user_id: (await user).data.user?.id },
      ]);
    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      closeHandler();
    }
  };

  const closeHandler = () => {
    setTitle("");
    setDescription("");
    setIsComplete(false);
    setAddTodo(false);
  };
  const style = {
    position: "absolute" as "absolute",
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-modal-title"
        open={addTodo}
        onClose={closeHandler}
      >
        <Container component="main" maxWidth="xs">
          <Box
            className="relative"
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ ...style, width: 400 }}
          >
            <p>스케줄 추가하기</p>
            <Typography
              id="modal-modal-title"
              sx={{ mt: 6, mb: 6 }}
              variant="h6"
              component="h2"
            >
              <TextField
                placeholder="제목을 입력해주세요"
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                placeholder="설명을 적어주세요"
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setDescription(e.target.value)}
                value={description}
              />
            </Typography>
            <div className="flex justify-around">
              <InputButton buttonName="추가하기" />
              <Button onClick={closeHandler} variant="contained">
                취소
              </Button>
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default ScheduleModal;
