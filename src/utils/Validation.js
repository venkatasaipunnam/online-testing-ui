import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  emailId: yup.string().email('Invalid email format').required('Email is required'),
  userName: yup.string().required('Username is required'),
  userType: yup.string().required('User Type is required'),
  createPassword: yup.string().required('Create Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$&*])[A-Za-z0-9!.@#$&*]{8,20}$/,
    'Password must contains atleast one capital, small letters, numeric and special character'
  ),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('createPassword'), null], 'Passwords must match'),
});

export const forgotPasswordValidationSchema = yup.object().shape({
  emailId: yup.string().email('Invalid email format').required('Email is required'),
});

export const loginValidationSchema = yup.object().shape({
  isLoginByEmail: yup.boolean().required(),
  emailId: yup.string()
    .when('isLoginByEmail', {
      is: true,
      then: () => yup.string()
        .email('Invalid email')
        .required('Please enter your registered Email'),
      otherwise: () => yup.string().notRequired()
    }),
  username: yup.string()
    .when('isLoginByEmail', {
      is: false,
      then: () => yup.string()
        .required('Please enter your Username'),
      otherwise: () => yup.string().notRequired()
    }),
  password: yup.string()
    .required('Please enter your Password'),
});

export const resetPasswordRequestValidationSchema = yup.object().shape({
  emailId: yup.string().email('Invalid email format').required('Please enter registered Email address')
});

export const changePasswordValidationSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  createPassword: yup.string().required('Create Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$&*])[A-Za-z0-9!.@#$&*]{8,20}$/,
    'Password must contains atleast one capital, small letters, numeric and special character'
  ),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('createPassword'), null], 'Passwords must match'),
});

