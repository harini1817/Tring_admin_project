import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography , Link,Snackbar, Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './authorization';
// import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [snackbar,setSnackbar] = useState({open:false});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      setSnackbar({ open: true,message: 'All fields are required', severity: 'error' });
    }
    try {
      const response = await axiosInstance.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        navigate('/dashboard', { state: { token: response.data.token }, replace: true });
        setSnackbar({ open: true,message: 'Invalid Email or Password', severity: 'success' });
      } else {
        setSnackbar({ open: true,message: 'Invalid Email or Password', severity: 'error' });
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login', { replace: true });
        setSnackbar({ open: true,message: 'Invalid Email or Password', severity: 'error' });
      } else {
        console.error(err);
        console.log(err);
      }
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
      <div className='alignment'>
        <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical:'top',horizontal: 'center' }} sx={{ width: '100%', maxWidth: '50vw' }} >
        <Alert onClose={handleCloseSnackbar}  variant="filled" severity={snackbar.severity} sx={{ width: '100%',textAlign: 'center'}} >
          {snackbar.message}
        </Alert>
      </Snackbar>
        <Container maxWidth="xs">
          <Box className="container">
            <Typography variant="h4" style={{color: '#6a1b9a',fontWeight:'bold', textAlign:"center"}}>Login</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address *"
                name="email"
                value={values.email}
                onChange={handleChange}
                InputProps={{className:'input-root'}}
                InputLabelProps={{className:'input-label'}}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password *"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                InputProps={{className:'input-root'}}
                InputLabelProps={{className:'input-label'}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#6a1b9a  ' }, }}
              >
              Login 
              </Button>
              <Typography variant="body2" textAlign="center">
                New user ? <Link href="/register">Register here</Link>
              </Typography>
            </form>
          </Box>
        </Container>
      </div>
  );
};

export default Login;
