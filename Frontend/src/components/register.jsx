import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import axiosInstance from './Autorization'; 

import './styles/boxmodel.css';
=======
import axios from 'axios';
import './styles/reglogin.css';
>>>>>>> Stashed changes

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    contact: '',
  });
  const navigate = useNavigate();
<<<<<<< Updated upstream
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

=======
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, })
  };
>>>>>>> Stashed changes
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, city, contact } = values;

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactregex = /^\d{10}$/;
<<<<<<< Updated upstream
    
=======
>>>>>>> Stashed changes
    if (!name || !email || !password || !city || !contact) {
      alert('All fields are required');
    } else if (!emailregex.test(email)) {
      alert('Enter a valid email');
    } else if (password.length < 8) {
      alert('Enter at least eight characters');
    } else if (!contactregex.test(contact)) {
      alert('Enter a valid 10-digit contact number');
    } else {
      try {
        await axiosInstance.post('/register', { name, email, password, city, contact });
        navigate('/login');
    } catch (err) {
        console.error(err);
    }
<<<<<<< Updated upstream
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
            id="name"
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            value={values.city}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contact"
            label="Contact No"
            name="contact"
            value={values.contact}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white','&:hover': {bgcolor: '#c62828'},}}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
=======
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
>>>>>>> Stashed changes
    </div>
  );
};

export default Register;
