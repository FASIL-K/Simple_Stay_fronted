import * as Yup from "yup";

// export const SignupValidationSchema = Yup.object().shape({
//   email: Yup.string()
//     .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Please enter a valid email")
//     .email("Please enter a valid email")
//     .required("This field is required")
//     .trim(),
//     password: Yup.string()
//     .required("This field is required")
//     .min(8, "Pasword must be 8 or more characters")
//     .matches(
//       /(?=.*[a-z])(?=.*[A-Z])\w+/,
//       "Password ahould contain at least one uppercase and lowercase character"
//     )
//     .matches(/\d/, "Password should contain at least one number")
//     .matches(
//       /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
//       "Password should contain at least one special character"
//     ),
//     confirmPassword: Yup.string().when("password", (password, field) => {
//     if (password) {
//       return field
//         .required("The passwords do not match")
//         .oneOf([Yup.ref("password")], "The passwords do not match");
//     }
//   }),
// });

export const SignupValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email field cannot be empty'),
    password: Yup.string().required('Password should not be empty'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Confirm Password field cannot be empty'),
  });

  