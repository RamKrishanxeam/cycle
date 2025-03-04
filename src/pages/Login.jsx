import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { Formik } from "formik";
import { LoginSchema } from "../config/validation";
import { GoogleLogin } from "../components/GoogleLogin/GoogleLogin";
import { LoginandSignup } from "../components/Form/Form";
import { loginUser } from "../lib/thunk/userThunk";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../config/hooks";
import FacebookLogin from "../components/FacebookLogin/FacebookLogin";
import PhoneVerify from "../components/PhoneVerify/PhoneVerify";
import { Input } from "../components/ui/Input";
import { logout } from "../lib/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, errorMessage, successMessage } = useAppSelector(
    (state) => state.auth
  );
  const [InputPhone, setInputPhone] = useState("");

  const PhoneAndEmail = /^\d+$/.test(InputPhone);
  useEffect(() => {
    if (user) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(logout());
      }, 3000);
    }
  }, [dispatch, errorMessage]);

  return (
    <>
      <Layout>
        <LoginandSignup
          heading="Hello"
          subHeading="There!!"
          Desc="Login using your Username and"
          DescSub="Password"
          formSection={
            <>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  const { email, password } = values;
                  dispatch(loginUser({ email, password }));
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
                    {!PhoneAndEmail ? (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <Input
                            type="text"
                            placeholder="Enter Email Address"
                            name="email"
                            onChange={(e) => {
                              handleChange(e);
                              setInputPhone(e.target.value);
                            }}
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
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <Input
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
                        <div className="mb-3 text-end">
                          <Link
                            to=""
                            className="text-decoration-none text-reddish-orange fw-bolder"
                          >
                            Forget Password?
                          </Link>
                        </div>
                        <button
                          type="submit"
                          className="btn bg-reddish-orange w-100 rounded-0 text-uppercase fw-bolder mb-3"
                        >
                          Login
                        </button>
                      </>
                    ) : (
                      <PhoneVerify />
                    )}

                    <div className="text-center mb-3">
                      <span>New to Firefox?</span>
                      <Link
                        to="/sign-up"
                        className="text-decoration-none text-reddish-orange fw-bolder"
                      >
                        Create an Account
                      </Link>
                    </div>
                    <div className="login-via">
                      <label>
                        <span>Login via</span>
                      </label>
                      <ul className="social-list">
                        <li className="social-item">
                          <FacebookLogin />
                        </li>
                        <li className="social-item">
                          <GoogleLogin />
                        </li>
                      </ul>
                    </div>
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
export default Login;
