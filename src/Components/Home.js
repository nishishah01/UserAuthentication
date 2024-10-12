import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/Authcontext';
import axios from 'axios';
import { Box, Button, Typography, List, ListItem, Paper } from '@mui/material'; // Material UI imports

const Home = () => {
  const { token, logout } = useContext(AuthContext); // Extract the token from context
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    if (token) {
      // Fetch user order history with the token
      const fetchOrderHistory = async () => {
        const response = await axios.get('https://uc-fd-auth-backend.onrender.com/user/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderHistory(response.data);
      };
      fetchOrderHistory();
    }
  }, [token]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" p={3}>
      <Paper elevation={3} sx={{ width: 500, padding: '20px', textAlign: 'center' }}>
        {token ? (
          <>
            <Typography variant="h4" gutterBottom>
              Welcome back, User!
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout} sx={{ marginBottom: '20px' }}>
              Logout
            </Button>
            <Typography variant="h5" gutterBottom>
              Order History:
            </Typography>
            <List>
              {orderHistory.map((order) => (
                <ListItem key={order.id}>
                  <Typography variant="body1">{order.name}</Typography>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Button variant="contained" color="primary" href="/login">
            Login
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default Home;