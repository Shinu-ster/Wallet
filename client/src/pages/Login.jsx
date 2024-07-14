import { Box, Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../components/Navbar";

const validationSchema = yup.object({
  email: yup.string("Enter your email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 4 characters")
    .required("Password is required"),
});

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      console.log(values);
      try {
        const response = await fetch("http://localhost:8000/users/login",{
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(values)
        })
        const data = await response.json();
        if (response.ok) {
          alert(JSON.stringify(data.status))
        }
      } catch (error) {
        console.log('Error',error)
      }
    },
  });

  return (
    <>
    
    
    <Navbar/>
    <Container maxWidth="sm">
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            fullWidth
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
    </>
  );
}
