import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const MembersPage = ({ user }) => {
  if (!user) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6" color="textSecondary">
            No user information available
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center">
          Member Details
        </Typography>
        <Box mb={2}>
          <Typography variant="body1" color="textSecondary">
            <strong>Username:</strong> {user.username}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" color="textSecondary">
            <strong>Email:</strong> {user.email}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" color="textSecondary">
            <strong>Display Name:</strong> {user.displayName}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" color="textSecondary">
            <strong>Role:</strong> {user.role}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default MembersPage;



