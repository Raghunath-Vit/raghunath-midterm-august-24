import * as Yup from 'yup';
const AddCategoryValidationSchema = Yup.object().shape({
    name: Yup.string().required('Category name is required').min(3,"Minimum of three characrters requires").max(30,"characters cannot exceed 30 characters"),
    description: Yup.string().min(50,"minimum of 50 characters needed").max(500,"not more than 500 characters are allowed"),
  });

export default AddCategoryValidationSchema;