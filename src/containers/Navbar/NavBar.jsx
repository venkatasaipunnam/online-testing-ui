// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const NavBar = () => (
  <AppBar position="static" color="transparent" elevation={0}>
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="logo">
        <MenuBookIcon />
      </IconButton>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Academic Testing
      </Typography>
      <Button color="inherit">Home</Button>
      <Button color="inherit">Exams</Button>
      <Button color="inherit">Grades</Button>
      <Button color="inherit">Analytics</Button>
      <Button color="inherit">Question Bank</Button>
      <Button variant="contained" color="primary" style={{ marginLeft: 10 }}>Help</Button>
      <Avatar style={{ marginLeft: 10 }}>J</Avatar>
    </Toolbar>
  </AppBar>
);

export default NavBar;
