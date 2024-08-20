import React from 'react';
import { Container, Typography } from '@mui/material';
import AddCategory from './AddCategory';  

const AdminArea = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <AddCategory />
    </Container>
  );
};

export default AdminArea;
