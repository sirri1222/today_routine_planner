import { supabase } from "@/lib/supabase";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import { useState } from "react";
import emailStore from "@/stores/emailStore";
import { useSession } from "@supabase/auth-helpers-react";

const ScheduleModal = ({
  type,
  openModal,
  setOpenModal,
  setAddTodo,
  addTodo,
}: {
  type?: string;
  openModal?: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddTodo?: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo?: boolean;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const session = useSession();
  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage("");
    if (description.length <= 10) {
      setErrorMessage("10글자 이상 적어주세요");
      return;
    }
    try {
      const { data, error } =
        type === "add"
          ? await supabase.from("todos").insert([
              {
                title,
                description,
                isComplete,
                user_id: session?.user.email,
              },
            ])
          : await supabase
              .from("todos")
              .update({
                title,
                description,
                isComplete,
                user_id: session?.user.email,
              })
              .eq("some_column", "someValue")
              .select();
      console.log(data, "모달컴포넌트데이터");
      if (error) {
      } else {
        closeHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeHandler = () => {
    setTitle("");
    setDescription("");
    setIsComplete(false);
    if (type === "add") {
      setAddTodo?.(false);
    } else {
      setOpenModal?.(false);
    }
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
        open={type === "add" ? !!addTodo : !!openModal}
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
            <div className="flex justify-evenly">
              <Button
                className="buttoncolor mx-5"
                variant="contained"
                type="submit"
              >
                추가하기
              </Button>
              <Button
                onClick={closeHandler}
                className="buttoncolor mx-5"
                variant="contained"
              >
                취소하기
              </Button>
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default ScheduleModal;
