import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Container, TextField, Button, Typography, Grid, Backdrop, CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AddCategoryValidationSchema from './AddCategoryValidation';

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    axios.post('http://localhost:3000/api/v1/categories', values, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then(response => {
        toast.success('Category added successfully!');
        navigate('/addProducts');
      })
      .catch(error => {
        console.error('Error adding category:', error);
        toast.error('An error occurred while adding the category.');
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-4.5rem', justifyContent: 'center', minHeight: '100vh' }}>
      <Container component="main" maxWidth="xs">
        <Typography variant="h5" gutterBottom>
          Add New Category
        </Typography>
        <Formik
          initialValues={{ name: '', description: '' }}
          validationSchema={AddCategoryValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="name" />}
                    error={Boolean(<ErrorMessage name="name" />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    color="secondary"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="description" />}
                    error={Boolean(<ErrorMessage name="description" />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Add Category
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default AddCategory;
