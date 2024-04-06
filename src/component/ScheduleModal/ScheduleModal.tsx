import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import BasicDatePicker from "../BasicDatePicker";
import useInput from "@/hooks/useInput";

const ScheduleModal = ({
  type,
  onChangeNewTitle,
  updatedTitle,
  onChangeNewDescription,
  updatedDescription,
}: {
  type?: string;
  onChangeNewTitle?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  updatedTitle?: string;
  onChangeNewDescription?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  updatedDescription?: string;
}) => {
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
  const {
    addTodo,
    closeUpdateModalHandler,
    closeAddModalHandler,
    submitAddHandler,
    submitUpdateHandler,
    title,
    setTitle,
    openModal,
    setDescription,
    description,
  } = useInput();
  console.log(addTodo, "____________");
  return (
    <>
      <Modal
        aria-labelledby="modal-modal-title"
        open={type === "add" ? addTodo : openModal}
        onClose={
          type === "add" ? closeAddModalHandler : closeUpdateModalHandler
        }
      >
        <Container component="main" maxWidth="xs">
          <Box
            className="relative"
            component="form"
            onSubmit={type === "add" ? submitAddHandler : submitUpdateHandler}
            noValidate
            sx={{ ...style, width: 400 }}
          >
            <p>스케줄 추가하기</p>
            {/* <BasicDatePicker /> */}
            <Typography
              id="modal-modal-title"
              sx={{ mt: 6, mb: 6 }}
              variant="h6"
              component="h2"
            >
              <TextField
                placeholder="제목을 입력해주세요"
                onChange={
                  type === "add"
                    ? (
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        setTitle(e.target.value);
                      }
                    : onChangeNewTitle
                }
                value={type === "add" ? title : updatedTitle}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                placeholder="설명을 적어주세요"
                onChange={
                  type === "add"
                    ? (
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => setDescription(e.target.value)
                    : onChangeNewDescription
                }
                value={type === "add" ? description : updatedDescription}
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
                onClick={
                  type === "add"
                    ? closeAddModalHandler
                    : closeUpdateModalHandler
                }
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
