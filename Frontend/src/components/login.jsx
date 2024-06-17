import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './Autorization'; 

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

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
            navigate('/dashboard', { state: { token: response.data.token }, replace: true });
        } else {
            alert('Invalid email or password');
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            navigate('/login', { replace: true });
        } else {
            console.error(err);
            alert('An error occurred while logging in');
        }
    }
};

  return (
    <Container maxWidth="xs">
      <Box className="container" mt={8}>
        <Typography variant="h4" gutterBottom>Login</Typography>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white' }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
