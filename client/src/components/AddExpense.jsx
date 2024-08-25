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
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  remark: yup.string().required("Remark is required"),
});


export default function AddExpense() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const formik = useFormik({
    initialValues: {
      amount: "",
      remark: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Submitted value:", values.amount);
      console.log("Submitted value:", values.remark); // Corrected to 'values.expense'
      try {
        const response = await fetch("http://localhost:8000/expense/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("at")}`,
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
          alert(JSON.stringify(data.status));
          console.log("Added Expense", JSON.stringify(data));
        }
      } catch (error) {
        console.log("Adding expenes error", error);
      }
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
              id="amount"
              name="amount" // Add the name attribute
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Add the onBlur event
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Remark"
              variant="standard"
              name="remark"
              id="remark"
              value={formik.values.remark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.remark && Boolean(formik.errors.remark)}
              helperText={formik.touched.remark && formik.errors.remark}
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
