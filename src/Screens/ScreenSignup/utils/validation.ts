import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string()
    .required('Name is required')
    .matches(
      /^[A-Za-z\s]+$/,
      'Name can only contain alphabetic characters and spaces',
    ),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
});
