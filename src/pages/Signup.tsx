import { LoginandSignup } from "../components/Form/Form";
import Layout from "../layout/Layout";
import { Formik } from "formik";
import { SignUpSchema } from "../config/validation";

import { Link } from "react-router-dom";
import { SignUpUser } from "../lib/thunk/userThunk";
import { useAppDispatch, useAppSelector } from "../config/hooks";
import { useEffect, useRef, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../config/firebase";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showOtpInput, setShowOtpInput] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const { user, errorMessage, successMessage } = useAppSelector(
    (state) => state.auth
  );

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  useEffect(() => {
    const recaptchaElement = document.getElementById("recaptcha");

    if (recaptchaElement && !recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, "recaptcha", {
        size: "normal",
        callback: () => console.log("ReCAPTCHA Verified"),
      });

      recaptchaVerifierRef.current.render().catch((error) => {
        console.error("Error rendering reCAPTCHA:", error);
      });
    }
  }, []);

  const handleFormSubmit = async (
    values: { PNumber: string },
    actionType: string
  ) => {
    const phoneNumber = `+919999999999`;
    console.log("Sending OTP to:", phoneNumber);
    if (actionType === "sendOTP") {
      if (values.PNumber !== "") {
        setShowOtpInput(true);
        try {
          const appVerifier = recaptchaVerifierRef.current;
          if (!appVerifier) {
            console.error("reCAPTCHA not initialized");
            return;
          }
          const confirmationResult = await signInWithPhoneNumber(
            auth,
            phoneNumber,
            appVerifier
          );
          window.confirmationResult = confirmationResult;
          setShowOtpInput(true);
          console.log("OTP sent!");
        } catch (error) {
          console.error("Error sending OTP:", error);
        }
      }
    } else if (actionType === "verifyOTP") {
      console.log("Verifying OTP:", otp.join(""));
    }
  };
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };
  return (
    <>
      <Layout>
        <LoginandSignup
          heading="Create"
          subHeading="an Account"
          Desc="Login using your Username and"
          DescSub="Password"
          formSection={
            <>
              <Formik
                initialValues={{
                  FName: "",
                  LName: "",
                  PNumber: "",
                  email: "",
                  password: "",
                  CPassword: "",
                  CheckBox: false,
                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values) => {
                  // dispatch(SignUpUser(values));
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
                    {errorMessage && (
                      <div className="alert alert-danger py-2 d-inline-block">
                        {errorMessage}
                      </div>
                    )}
                    {user !== null && successMessage && (
                      <div className="alert alert-success py-2 d-inline-block">
                        {successMessage}
                      </div>
                    )}
                    <div className="mb-4">
                      <label className="form-label">First Name*</label>
                      <input
                        type="text"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0 text-white"
                        placeholder="Enter First Name"
                        name="FName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.FName}
                      />
                      {errors.FName && touched.FName && (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.FName}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Last Name*</label>
                      <input
                        type="text"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0 text-white"
                        placeholder="Enter Last Name"
                        name="LName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.LName}
                      />
                      {errors.LName && touched.LName && (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.LName}
                        </div>
                      )}
                    </div>
                    <div className="mb-4 position-relative">
                      <label className="form-label">Mobile*</label>
                      {!showOtpInput ? (
                        <>
                          <input
                            type="text"
                            className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0 text-white"
                            placeholder="Enter Phone Number"
                            name="PNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.PNumber}
                            maxLength={10}
                          />
                          <button
                            type="submit"
                            style={{
                              border: "none",
                              borderRadius: "4px",
                              backgroundColor: "#007bff",
                              color: "#fff",
                              cursor: "pointer",
                              top: "20px",
                            }}
                            onClick={() => {
                              handleFormSubmit(
                                { PNumber: values.PNumber },
                                "sendOTP"
                              );
                            }}
                            className="my-2 mx-1 position-absolute end-0"
                          >
                            Send OTP
                          </button>
                        </>
                      ) : (
                        <div className="d-flex gap-2 mt-2">
                          {otp.map((_, index) => (
                            <input
                              key={index}
                              ref={(el) => {
                                inputs.current[index] = el;
                              }}
                              type="text"
                              className="form-control shadow-none text-dark bg-transparent border-0 border-bottom rounded-0 text-white"
                              maxLength={1}
                              name="PNumber"
                              value={otp[index]}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (
                                  e.key === "Backspace" &&
                                  !otp[index] &&
                                  index > 0
                                ) {
                                  inputs.current[index - 1]?.focus();
                                }
                              }}
                              style={{
                                width: "40px",
                                height: "40px",
                                textAlign: "center",
                                fontSize: "18px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                          ))}
                          <button
                            type="submit"
                            style={{
                              border: "none",
                              borderRadius: "4px",
                              backgroundColor: "#007bff",
                              color: "#fff",
                              cursor: "pointer",
                              top: "30px",
                            }}
                            className="my-2 mx-1 position-absolute end-0"
                          >
                            Verify OTP
                          </button>
                        </div>
                      )}

                      {errors.PNumber && touched.PNumber && (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.PNumber}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Email*</label>
                      <input
                        type="text"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0 text-white"
                        placeholder="Enter Email Address"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Password*</label>
                      <input
                        type="password"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0 text-white"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {errors.password && touched.password && (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Confirm Password*</label>
                      <input
                        type="password"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0 text-white"
                        placeholder="Enter Confirm Password"
                        name="CPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.CPassword}
                      />
                      {errors.CPassword && touched.CPassword && (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.CPassword}
                        </div>
                      )}
                    </div>
                    <div className="mb-5 form-check">
                      <div>
                        <input
                          type="checkbox"
                          className="form-check-input shadow-none"
                          name="CheckBox"
                          checked={values.CheckBox}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label className="form-check-label">
                          I have read and accept the
                          <strong className="check-orinage ms-1">
                            Terms & conditions
                          </strong>
                        </label>
                      </div>
                      {errors.CheckBox && touched.CheckBox && (
                        <div
                          className="error-message"
                          style={{ marginLeft: "-24px" }}
                        >
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.CheckBox}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn bg-reddish-orange w-100 rounded-0 text-uppercase fw-bolder mb-3"
                    >
                      Create Account
                    </button>
                    <div className="text-center mb-3">
                      <span>New to Firefox?</span>
                      <Link
                        to="/login"
                        className="text-decoration-none text-reddish-orange fw-bolder"
                      >
                        Login
                      </Link>
                    </div>
                  </form>
                )}
              </Formik>
              <div
                id="recaptcha"
                className="position-relative"
                style={{ zIndex: "111" }}
              ></div>
            </>
          }
        />
      </Layout>
    </>
  );
};
export default Signup;
