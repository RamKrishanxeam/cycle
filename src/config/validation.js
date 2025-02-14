import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("This field is required")
    .required("email is required"),

  password: Yup.string()
    .required("This field is required.")
    .min(6, "Password must be at least 6 characters"),
});

const phoneRegex = /^\(?([6-9]{1})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/;

export const SignUpSchema = Yup.object().shape({
  FName: Yup.string().required("This field is required."),
  LName: Yup.string().required("This field is required."),
  PNumber: Yup.string()
    .matches(phoneRegex, "Invalid Phone Number")
    .required("This field is required."),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
      "Invalid username format"
    )
    .required("This field is required"),
  password: Yup.string()
    .required("This field is required.")
    .min(6, "Password must be at least 6 characters"),
  CPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("This field is required."),
  CheckBox: Yup.boolean().oneOf([true], "This field is required."),
});
