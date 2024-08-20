import * as Yup from 'yup';
const ProductFormValidationSchema = Yup.object().shape({
    code: Yup.string().required('Product code is required'),
    name: Yup.string().required('Product name is required'),
    excerpt: Yup.string().required('Product excerpt is required'),
    description: Yup.string().notRequired(),
    category: Yup.string().required('Category is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    stock: Yup.number().required('Stock is required').min(0, 'Stock cannot be negative'),
  });

  export default ProductFormValidationSchema;