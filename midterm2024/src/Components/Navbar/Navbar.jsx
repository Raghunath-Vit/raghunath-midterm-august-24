import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ isAuthenticated }) => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%', zIndex: 1300 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/registeruser">Register</Button>
        {isAuthenticated && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
