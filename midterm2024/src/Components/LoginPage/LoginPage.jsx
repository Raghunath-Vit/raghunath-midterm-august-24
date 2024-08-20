import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Backdrop, CircularProgress } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginvalidationSchema from './LoginPageVaildation';

const LoginPage = ({ setIsAuthenticated, setUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
        username: values.username,
        password: values.password,
      });

      if (response.data.ok) {
        const { user, token } = response.data;
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem('authToken', token);
        toast.success('Login successful!');
        navigate('/members');
      } else {
        toast.error('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5">Login</Typography>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginvalidationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="username"
                as={TextField}
                margin="normal"
                required
                fullWidth
                label="Username"
                helperText={<ErrorMessage name="username" />}
                error={Boolean(<ErrorMessage name="username" />)}
              />
              <Field
                name="password"
                as={TextField}
                margin="normal"
                required
                fullWidth
                type="password"
                label="Password"
                helperText={<ErrorMessage name="password" />}
                error={Boolean(<ErrorMessage name="password" />)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
