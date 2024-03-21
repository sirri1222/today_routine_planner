import { supabase } from "@/lib/supabase";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import InputButton from "../InputButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
    position: "flex",
    justifyContents:"center",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.papaer",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <Modal
        aria-labelledby="modal-modal-title"
        open={addTodo}
        onClose={closeHandler}
      >
        <Box
          className="relative"
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ ...style, width: 400 }}
        >
          <div className="flex flex-col justify-center items-center">
            <p>스케줄 추가하기</p>
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
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
            </div>
            <div>
              <TextField
                placeholder="설명을 적어주세요"
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>
          <InputButton buttonName={"추가하기"} />
        </Box>
      </Modal>
    </>
  );
};

export default ScheduleModal;
