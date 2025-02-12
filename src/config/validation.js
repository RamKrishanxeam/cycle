import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+$/, "Invalid username format")
    .required("Please enter an email username"),
  password: Yup.string()
    .required("This field is required.")
    .min(6, "Password must be at least 6 characters"),
});
