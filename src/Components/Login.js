import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { VisibilityContext } from '../Context/Context';
import { AuthContext } from '../Context/Authcontext'
import axios from 'axios'; // To make the API call

const Login = () => {
  
  const { setLoginVisib, storeToken } = useContext(VisibilityContext); // Extract storeToken from context
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    setLoginVisib(false); // This will trigger the SignUp view
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    try {
      // Make the API call to authenticate the user
      const response = await axios.post('https://uc-fd-auth-backend.onrender.com/user/login', {
        email,
        password,
      });

      // Assuming the token is returned in the response
      const { token } = response.data;

      // Store the token in context
      storeToken(token);

      // Redirect or show the authenticated page
      setLoginVisib(false);
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper
        elevation={3}
        sx={{
          width: 400,
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          align="center"
          sx={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '1.5rem' }}
        >
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              id="email"
              label="Email address"
              variant="outlined"
              helperText="We'll never share your email with anyone else."
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Capture email input
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPass(e.target.value)} // Capture password input
            />
          </Box>

          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          <Typography variant="body2" mt={3} ml={1}>
            Want to create a new Account?{' '}
            <span
              style={{ cursor: 'pointer', color: 'purple' }}
              onClick={handleClick}
            >
              Sign Up
            </span>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
