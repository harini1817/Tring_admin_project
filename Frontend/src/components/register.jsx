import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography,Link,Snackbar, Alert} from '@mui/material';
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
  const [snackbar,setSnackbar] = useState({open:false});
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
      setSnackbar({ open: true,message: 'All fields are required', severity: 'error' });
    }
    else if (!emailregex.test(email)) {
      setSnackbar({ open: true, message: 'Enter a valid mail', severity: 'error' });
    }
    else if (password.length < 8) {
      setSnackbar({ open: true, message: 'Enter atleast 8 characters', severity: 'error' });
    }
    else if (!contactregex.test(contact)) {
      setSnackbar({ open: true, message: 'Enter 10 digit valid contact number', severity: 'error' });
    }
    else {
      axios.post('http://localhost:8081/register', values)
        .then(() => {
          navigate('/login');
        })
        .catch(err => {
          if(err.response && err.response.status === 401){
            setSnackbar({ open: true, message: 'Email already exists', severity: 'error' });
          }
          else{
            console.log(err);
          }
       });
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className='box'>
      <Container maxWidth="xs">
        <Box className="container" mt={8}>
        <Typography variant="h4" gutterBottom style={{color: '#6a1b9a',fontWeight:'bold'}}>Register</Typography>
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
              InputProps={{style:{height:'40px'}}}
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
              InputProps={{style:{height:'40px'}}}
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
              InputProps={{style:{height:'40px'}}}
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
              InputProps={{style:{height:'40px'}}}
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
              InputProps={{style:{height:'40px'}}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#6a1b9a' }, }}
            >
              Register
            </Button>
            <Typography variant="body2">
                Existing User ? <Link href="/login">Login here</Link>
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

export default Register;