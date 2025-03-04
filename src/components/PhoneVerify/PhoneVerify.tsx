import { useEffect, useRef, useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { phoneNumberUser } from "../../lib/thunk/userThunk";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const PhoneVerify: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, errorMessage, successMessage } = useAppSelector(
    (state) => state.auth
  );
  const [values, setValues] = useState({ PNumber: "" });
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [reCAPTCHAVerified, setReCAPTCHAVerified] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const appVerifier = recaptchaVerifierRef.current;

  useEffect(() => {
    const recaptchaContainer = document.getElementById("recaptcha-container");

    if (!recaptchaVerifierRef.current && recaptchaContainer) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal", // "normal" for checkbox, or "invisible" if preferred
          callback: () => {
            console.log("reCAPTCHA v2 verified");
            setReCAPTCHAVerified(true);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
            setReCAPTCHAVerified(false);
          },
          "error-callback": (error: any) => {
            console.error("reCAPTCHA error:", error);
            setReCAPTCHAVerified(false);
          },
        }
      );

      recaptchaVerifierRef.current.render().catch((error) => {
        console.error("Failed to render reCAPTCHA:", error);
      });
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, [auth, showOtpInput]);

  // Trigger OTP sending when reCAPTCHA is verified
  useEffect(() => {
    if (reCAPTCHAVerified && values.PNumber) {
      const phoneNumber = `+91${values.PNumber}`;
      if (!recaptchaVerifierRef.current) {
        console.error("reCAPTCHA verifier not initialized");
        return;
      }
      if (phoneNumber) {
        dispatch(
          phoneNumberUser({
            auth,
            appVerifier: recaptchaVerifierRef.current,
            phoneNumber,
          })
        );
      }
    }
  }, [reCAPTCHAVerified, values.PNumber, dispatch, auth]);

  const handleChangePhone = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (
    values: { PNumber?: string; otp?: string },
    actionType: string
  ) => {
    if (actionType === "sendOTP") {
      if (values.PNumber) {
        setShowOtpInput(true);
        if (!recaptchaVerifierRef.current) {
          console.error("reCAPTCHA not initialized");
          return;
        }
      }
    } else if (actionType === "verifyOTP") {
      const inputOtp = otp.join("");
      if (!values.otp || values.otp.length !== 6) {
        console.error("Invalid OTP!");
        return;
      }
      console.log(inputOtp);

      if (inputOtp.length === 6) {
        try {
          const confirmationResult = window.confirmationResult;
          const result = await confirmationResult.confirm(inputOtp);
          console.log(result, "result");
          if (result.user.accessToken) {
            navigate("/");
          }
        } catch (error: any) {
          console.log("Invalid OTP. Please try again.");
          if (error.code === "auth/invalid-verification-code") {
            alert("The OTP entered is incorrect. Please try again.");
          } else {
            alert("An unexpected error occurred. Please try again.");
          }
        }
      }
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
      <Formik
        initialValues={{ PNumber: "", otp: "" }}
        validationSchema={Yup.object({
          PNumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number is invalid")
            .required("Phone number is required"),
          otp: Yup.string()
            .length(6, "OTP must be 6 digits")
            .required("OTP is required"),
        })}
        onSubmit={() => {}}
      >
        {({ errors, touched, handleBlur }) => (
          <>
            {!showOtpInput ? (
              <>
                {errorMessage && (
                  <div className="alert alert-danger py-2 d-inline-block">
                    {errorMessage}
                  </div>
                )}
                {/* {successMessage && (
                  <div className="alert alert-success py-2 d-inline-block">
                    {successMessage}
                  </div>
                )} */}
                <div className="mb-3 mt-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0 text-white"
                    placeholder="Enter Phone Number"
                    name="PNumber"
                    maxLength={10}
                    onChange={handleChangePhone}
                    onBlur={handleBlur}
                    value={values.PNumber}
                  />
                  {/* {errors.PNumber && touched.PNumber && (
                    <div className="error-message">
                      <span className="material-symbols-outlined">error</span>
                      {errors.PNumber}
                    </div>
                  )} */}
                </div>
                <div className="mb-3 text-end">
                  <Link
                    to=""
                    className="text-decoration-none text-reddish-orange fw-bolder"
                  >
                    Forget Password?
                  </Link>
                </div>
                <button
                  type="button"
                  className="btn bg-reddish-orange w-100 rounded-0 text-uppercase fw-bolder mb-3"
                  onClick={() => {
                    handleFormSubmit({ PNumber: values.PNumber }, "sendOTP");
                  }}
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <div className="">
                  <label className="form-label">Verify OTP</label>
                  <div className="d-flex gap-2 mb-3">
                    {!reCAPTCHAVerified ? (
                      <>
                        <div
                          id="recaptcha-container"
                          data-sitekey="6LdH7-gqAAAAACYj6k_jxOpeW4y9rQ5oagLf4MLt"
                        ></div>
                      </>
                    ) : (
                      otp.map((_, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputs.current[index] = el;
                          }}
                          type="text"
                          className="form-control shadow-none text-dark bg-transparent border-0 border-bottom rounded-0 text-white"
                          maxLength={1}
                          name="otp"
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
                      ))
                    )}
                    {errors.otp && touched.otp && (
                      <div className="error-message">
                        <span className="material-symbols-outlined">error</span>
                        {errors.otp}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3 text-end">
                  <Link
                    to=""
                    className="text-decoration-none text-reddish-orange fw-bolder"
                  >
                    Forget Password?
                  </Link>
                </div>
                <button
                  type="button"
                  className="btn bg-reddish-orange w-100 rounded-0 text-uppercase fw-bolder mb-3"
                  onClick={() => {
                    handleFormSubmit({ otp: otp.join("") }, "verifyOTP");
                  }}
                >
                  Verify OTP
                </button>
              </>
            )}
          </>
        )}
      </Formik>
    </>
  );
};
export default PhoneVerify;
