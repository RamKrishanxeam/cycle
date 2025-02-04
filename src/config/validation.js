import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter a valid email ID"),
  password: Yup.string()
    .required("This field is required.")
    .min(6, "Password must be at least 6 characters"),
});
