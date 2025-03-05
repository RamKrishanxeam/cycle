import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { Formik } from "formik";
import { LoginandSignup } from "../components/Form/Form";
import { useAppDispatch } from "../config/hooks";
import { Input } from "../components/ui/Input";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { resetEmailSchema } from "../config/validation";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePasswordReset = async (values: { email: string }) => {
    const { email } = values;
    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/reset-password",
        handleCodeInApp: true,
      };
      console.log(actionCodeSettings, "actionCodeSettings");

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      console.log("Password reset email sent successfully");
      return { success: true, message: "Password reset email sent" };
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error sending reset email:", errorMessage, errorCode);
      throw new Error("Failed to send password reset email. Please try again.");
    }
  };
  return (
    <>
      <Layout>
        <LoginandSignup
          heading="Forgot"
          subHeading="Password!!"
          Desc="Login using your Username"
          DescSub=""
          formSection={
            <>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={resetEmailSchema}
                onSubmit={(values) => {
                  const { email } = values;
                  handlePasswordReset({ email });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label className="form-label">Email</label>
                      <Input
                        type="text"
                        placeholder="Enter Email Address"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email ? (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="btn bg-reddish-orange w-100 rounded-0 text-uppercase fw-bolder mb-3"
                    >
                      Login
                    </button>
                  </form>
                )}
              </Formik>
            </>
          }
        />
      </Layout>
    </>
  );
};
export default ForgotPassword;
