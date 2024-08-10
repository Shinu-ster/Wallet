import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
  expense: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
});

export default function AddExpense() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const formik = useFormik({
    initialValues: {
      expense: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitted value:", values.expense); // Corrected to 'values.expense'
      handleClose(); 
    },
  });

  return (
    <>
      <Button onClick={handleOpen}>Add Expense</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            Add Expense
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Amount"
              variant="standard"
              id="expense"
              name="expense"  // Add the name attribute
              value={formik.values.expense}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  // Add the onBlur event
              error={formik.touched.expense && Boolean(formik.errors.expense)}
              helperText={formik.touched.expense && formik.errors.expense}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button type="submit" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
