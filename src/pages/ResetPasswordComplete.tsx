import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { Formik } from "formik";
import { resetPasswordSchema } from "../config/validation";
import { LoginandSignup } from "../components/Form/Form";
import { Input } from "../components/ui/Input";

const ResetPasswordComplete = () => {
  const [message, setMessage] = useState("");
  const handleResetComplete = async (newPassword: any) => {
    console.log("ssfsfsf");

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get("oobCode");
      if (!oobCode) throw new Error("Invalid reset link");
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (error) {
      console.error("Error resetting new Password:", error);
    }
  };

  return (
    <>
      <Layout>
        <LoginandSignup
          heading="New"
          subHeading="Password!!"
          Desc="Login using your Username"
          DescSub=""
          formSection={
            <>
              <Formik
                initialValues={{ newPassword: "" }}
                validationSchema={resetPasswordSchema}
                onSubmit={(values) => {
                  const { newPassword } = values;
                  handleResetComplete(newPassword);
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
                  <>
                    {message && (
                      <div className="alert alert-success py-2 d-inline-block">
                        {message}
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-5">
                        <label className="form-label">New Password</label>
                        <Input
                          type="password"
                          placeholder="Enter New Password"
                          name="newPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}
                        />
                        {errors.newPassword && touched.newPassword ? (
                          <div className="error-message">
                            <span className="material-symbols-outlined">
                              error
                            </span>
                            {errors.newPassword}
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
                  </>
                )}
              </Formik>
            </>
          }
        />
      </Layout>
      {/* <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button onClick={handleResetComplete}>Reset Password</button> */}
    </>
  );
};
export default ResetPasswordComplete;
