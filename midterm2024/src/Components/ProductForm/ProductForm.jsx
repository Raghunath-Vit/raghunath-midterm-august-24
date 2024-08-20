import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress, Backdrop, Box, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ProductFormValidationSchema from './ProductFormValidation';

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/categories')
      .then(response => {
        if (response.data && response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    axios.post('http://localhost:3000/api/v1/products', values, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then(response => {
        toast.success('Product added successfully!');
        navigate('/'); 
      })
      .catch(error => {
        console.error('Error adding product:', error);
        toast.error('An error occurred while adding the product.');
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif', 
          fontWeight: 500, 
          fontSize: '1.4rem', 
          color: '#333', 
        }}
      >
        Add New Product
      </Typography>
      <Box
        component={Paper}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          border: '1px solid #ddd',
          maxWidth: '100%',
          mx: 'auto',
        }}
      >
        <Formik
          initialValues={{
            code: '',
            name: '',
            excerpt: '',
            description: '',
            category: '',
            price: '',
            stock: '',
          }}
          validationSchema={ProductFormValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="code"
                    as={TextField}
                    label="Code"
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    helperText={<ErrorMessage name="code" />}
                    error={Boolean(<ErrorMessage name="code" />)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    helperText={<ErrorMessage name="name" />}
                    error={Boolean(<ErrorMessage name="name" />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="excerpt"
                    as={TextField}
                    label="Excerpt"
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    helperText={<ErrorMessage name="excerpt" />}
                    error={Boolean(<ErrorMessage name="excerpt" />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mb: 1 }}
                    helperText={<ErrorMessage name="description" />}
                    error={Boolean(<ErrorMessage name="description" />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
                    <InputLabel>Category</InputLabel>
                    <Field
                      as={Select}
                      name="category"
                      label="Category"
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>Select a category</em>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" style={{ color: 'red' }} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="price"
                    as={TextField}
                    label="Price"
                    fullWidth
                    type="number"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    helperText={<ErrorMessage name="price" />}
                    error={Boolean(<ErrorMessage name="price" />)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="stock"
                    as={TextField}
                    label="Stock"
                    fullWidth
                    type="number"
                    variant="outlined"
                    sx={{ mb: 1 }}
                    helperText={<ErrorMessage name="stock" />}
                    error={Boolean(<ErrorMessage name="stock" />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    Add Product
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
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

export default ProductForm;


