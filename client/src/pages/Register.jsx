import {Box, Button, Container, TextField} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    name:yup.string("Enter your name").required("Name is required"),
    email: yup.string("Enter your email").required("Email is required"),
    password: yup
    .string("Enter your password")
    .min(4,"Password should be minimum 4 characters")
    .required("Password is required"),
    address: yup.string("Enter your address")
});


export default function Register(){
  const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            address:""
        },
        validationSchema:validationSchema,
        onSubmit:async(values)=>{
            console.log(values)
            try {
                const response = await fetch("http://localhost:8000/users/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(values)
                })
                const data = await response.json();
                if (response.ok) {
                    alert(JSON.stringify(data.status))
                    navigate('/login');
                }
            } catch (error) {
                console.log('Error',error)
            }
            
        }
    })
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
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                label="Name"
                variant="outlined"
                fullWidth
                type="text"
              />
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
              <TextField
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                label="Address (optional)"
                variant="outlined"
                fullWidth
                type="text"
              />
              <Button color="primary" variant="contained" fullWidth type="submit" sx={{ml:1}}>
                Submit
              </Button>
            </form>
          </Box>
        </Container>
        </>
      );
}