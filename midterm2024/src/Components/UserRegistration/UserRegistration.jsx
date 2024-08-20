import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "./UserRegistrationValidationSchema";
import { TextField, Select, MenuItem, Button, CircularProgress, Backdrop, Container, Grid, Typography, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserRegistration() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchRoles() {
      axios
        .get("http://localhost:3000/api/v1/roles")
        .then((response) => {
          if (response.data && Array.isArray(response.data.roles)) {
            setRoles(response.data.roles);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching roles:", error);
        });
    }
    fetchRoles();
  }, []);

  function handleSubmit(values, { setSubmitting }) {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/v1/users", values)
      .then((response) => {
        toast.success('Registration successful!');
      })
      .catch((err) => {
        console.error("Error during form submission:", err);
        toast.error('An error occurred while submitting the form. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: '80px' }}> {/* Adjust marginTop as needed */}
      <Typography variant="h5" gutterBottom>
        User Registration
      </Typography>
      <Formik
        initialValues={{
          displayName: "",
          email: "",
          username: "",
          password: "",
          role: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="displayName"
                  as={TextField}
                  label="Display Name"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="displayName" />}
                  error={Boolean(<ErrorMessage name="displayName" />)}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="email" />}
                  error={Boolean(<ErrorMessage name="email" />)}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="username"
                  as={TextField}
                  label="Username"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="username" />}
                  error={Boolean(<ErrorMessage name="username" />)}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="password" />}
                  error={Boolean(<ErrorMessage name="password" />)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" error={Boolean(<ErrorMessage name="role" />)}>
                  <InputLabel>Role</InputLabel>
                  <Field
                    as={Select}
                    name="role"
                    label="Role"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Select a role</em>
                    </MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <FormHelperText>
                    <ErrorMessage name="role" />
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
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
  );
}

export default UserRegistration;
