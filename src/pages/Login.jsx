import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import facebook from "../assets/images/facebook.svg";
import { Formik } from "formik";
import { LoginSchema } from "../config/validation";
import { GoogleLogin } from "../components/GoogleLogin/GoogleLogin";
import { LoginandSignup } from "../components/Form/Form";
import { loginUser } from "../lib/thunk/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  // const { errorMessage , } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [user, navigate]);
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
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0"
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
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0"
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
                    <div className="text-center mb-3">
                      <span>New to Firefox?</span>
                      <a className="text-decoration-none text-reddish-orange fw-bolder">
                        Create an Account
                      </a>
                    </div>
                    <div className="login-via">
                      <label>
                        <span>Login via</span>
                      </label>
                      <ul className="social-list">
                        <li className="social-item">
                          <Link to="">
                            <img
                              src={facebook}
                              alt="facebook"
                              className="img-fluid"
                            />
                          </Link>
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
