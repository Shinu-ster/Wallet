import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import {  useState } from "react";
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
  income:yup.number().typeError("Amount must be a number").required("Amount is required"),
  remark:yup.string().required("Remarks is reqiured"),
})
export default function AddIncome() {
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);


  const formik = useFormik({
    initialValues:{
      income:"",
      remark:"",
    },validationSchema:validationSchema,
    onSubmit:(values)=>{
      console.log("Submitted income",values.income);
      console.log("submited remark",values.remark)
      handleClose();
    }
  })

  return (
    <>
      <Button onClick={handleOpen}>Add Income</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            Add Income
          </Typography>
          <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Amount"
            variant="standard"
            name="income"
            id="income"
            value={formik.values.income}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.income && Boolean(formik.errors.income)}
            helperText={formik.touched.income && formik.errors.income}
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
