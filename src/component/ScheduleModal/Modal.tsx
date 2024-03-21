import { TextField } from '@mui/material'

const Modal = () => {
  return (
    <div>
         <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
    </div>
  )
}

export default Modal