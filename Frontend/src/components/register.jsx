import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/reglogin.css';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    contact: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, })
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, city, contact } = values;

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactregex = /^\d{10}$/;
    if (!name || !email || !password || !city || !contact) {
      alert('All fields are required');
    }
    else if (!emailregex.test(email)) {
      alert('Enter a valid email');
    }
    else if (password.length < 8) {
      alert('Enter atleast eight characters');
    }
    else if (!contactregex.test(contact)) {
      alert('Enter a valid 10 digit contact number');
    }
    else {
      axios.post('http://localhost:8081/register', values)
        .then(() => {
          navigate('/login');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='box'>
      <Container maxWidth="xs">
        <Box className="container" mt={8}>
          <Typography variant="h4" gutterBottom>Register</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              InputProps={{ style: { height: '40px' } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
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
              value={values.password}
              onChange={handleChange}
              InputProps={{ style: { height: '40px' } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="City"
              name="city"
              value={values.city}
              onChange={handleChange}
              InputProps={{ style: { height: '40px' } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Contact No"
              name="contact"
              value={values.contact}
              onChange={handleChange}
              InputProps={{ style: { height: '40px' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#c62828' }, }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Register;