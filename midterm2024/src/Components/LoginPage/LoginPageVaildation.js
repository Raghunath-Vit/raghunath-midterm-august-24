import * as Yup from 'yup';
const LoginvalidationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  export default LoginvalidationSchema;