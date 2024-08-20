import * as Yup from 'yup';
const validationSchema = Yup.object({
    displayName: Yup.string().required("Display Name is required").min(3,"Minimum of three characters required").max(15,"not more than 15 characters are allowed"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string().required("Username is required").min(3,"Minimum of three characters required").max(15,"not more than 15 characters are allowed"),
    password: Yup.string().required("Password is required").min(6,"Minimum of six characters required").max(20,"not more than 20 characters are allowed"),
    role: Yup.string().required("Role is required"),
  });

  export default validationSchema;