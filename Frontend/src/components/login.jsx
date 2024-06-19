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
    try {
      const response = await axiosInstance.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        navigate('/dashboard', { state: { token: response.data.token }, replace: true });
      } else {
        setSnackbar({ open: true,message: 'Invalid Email or Password', severity: 'error' });
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login', { replace: true });
        setSnackbar({ open: true,message: 'Invalid Email or Password', severity: 'error' });
      } else {
        console.error(err);
        setSnackbar({ open: true,message: 'Error while login', severity: 'error' });
      }
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
      <div className='box'>
        <Container maxWidth="xs">
          <Box className="container" mt={8}>
            <Typography variant="h4" gutterBottom style={{color: '#6a1b9a',fontWeight:'bold'}}>Login</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                InputProps={{ style: { height: '40px' } }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                InputProps={{ style: { height: '40px' } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#6a1b9a  ' }, }}
              >
                Sign In
              </Button>
              <Typography variant="body2">
                New user ? <Link href="/register">Register here</Link>
              </Typography>
            </form>
          </Box>
        </Container>
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical:'top',horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
        </Snackbar>
      </div>
  );
};

export default Login;
