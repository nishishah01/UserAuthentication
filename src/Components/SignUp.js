import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //we are using useNavigate hook cause hame homepage pe jana hai
import { VisibilityContext } from '../Context/Context';
const SignUp = () => {
  const { setLoginVisib } = useContext(VisibilityContext); // Extract only what you need
  const navigate = useNavigate();
  const handleClick = () =>{
    setLoginVisib(true);
  }

  const [name , setName] = useState('');
  const [age , setAge] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPass] = useState('');
  const [mobileno , setMno] = useState('');
  
  const [errors, setErrors] = useState({});
  const [ErrorMessage,setErrorMessage]= useState('');
  const [successMessage,setSuccessMessage]= useState('');
  
  

  // Regex for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const mobileRegex = /^\d{10}$/;

  const validate = () => {
    const newErrors = {};
    if (!emailRegex.test(email)) {
      newErrors.email = 'Email must be in @gmail.com format';
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must contain 1 uppercase, 1 lowercase, and 1 number';
    }
    if (!mobileRegex.test(mobileno)) {
      newErrors.mobileno = 'Mobile number must be exactly 10 digits';
    }
    if (age <= 0 || age > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  }
  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://uc-fd-auth-backend.onrender.com/user/register', ({ name, email, password, mobileno,age }),
           { headers:{'Content-Type':'application/json'}}
      ); 
      console.log(response.data);
      console.log(response.id);
      setSuccessMessage('Signup successful!');
      navigate('/home');  //yeh to redirect to the homepage
  } catch (error) {
      console.error('Signup failed:', error.response);
      setErrorMessage('Signup failed! Try again.');
  }

};

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            required
            onChange={(e)=> {setName(e.target.value)}}
          />

          <TextField
            fullWidth
            label="Age"
            margin="normal"
            variant="outlined"
            required
            type="number"
            onChange={(e)=> {setAge(e.target.value)}}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            required
            type="email"
            onChange={(e)=> {setEmail(e.target.value)}}
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            variant="outlined"
            required
            type="password"
            onChange={(e)=> {setPass(e.target.value)}}
          />

          <TextField
            fullWidth
            label="Mobile Number"
            margin="normal"
            variant="outlined"
            required
            type="tel"
            onChange={(e)=> {setMno(e.target.value)}}
          />
          <Typography
            variant="body2" mt={3} ml={1}
          >Already have an account? {' '}
          <span style={{ cursor: 'pointer', color: 'purple' }} onClick={handleClick}>
               Login
            </span>
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ marginTop: 2, backgroundColor: 'primary.main' }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
