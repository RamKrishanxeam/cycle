import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import facebook from "../assets/images/facebook.svg";
import google from "../assets/images/google.svg";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter a valid email ID"),
  password: Yup.string()
    .required("This field is required.")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  return (
    <>
      <Layout>
        <div className="login-section mb-5">
          <div class="login-infograpy"></div>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <div class="cont-wrap">
                  <h2 class="banner-title">
                    <div class="typ-1">Hello</div>
                    <div class="cm-line-break typ-2">There!!</div>
                  </h2>
                  <p class="desc">
                    Login using your Username and <br /> Password.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="bs-box">
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                      console.log(values);
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
                        <div class="mb-3">
                          <label class="form-label">Email</label>
                          <input
                            type="text"
                            class="form-control shadow-none bg-transparent border-0 border-bottom rounded-0"
                            placeholder="Enter Email Address"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          {errors.email && touched.email && (
                            <div className="error-message">
                              <span class="material-symbols-outlined">
                                error
                              </span>
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Password</label>
                          <input
                            type="password"
                            class="form-control shadow-none bg-transparent border-0 border-bottom rounded-0"
                            placeholder="Enter Password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {errors.password && touched.password && (
                            <div className="error-message">
                              <span class="material-symbols-outlined">
                                error
                              </span>
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div class="mb-3 text-end">
                          <Link
                            to=""
                            className="text-decoration-none text-reddish-orange fw-bolder"
                          >
                            Forget Password?
                          </Link>
                        </div>
                        <button
                          type="submit"
                          class="btn bg-reddish-orange w-100 rounded-0 text-uppercase fw-bolder mb-3"
                        >
                          Login
                        </button>
                        <div class="text-center mb-3">
                          <span>New to Firefox?</span>
                          <a className="text-decoration-none text-reddish-orange fw-bolder">
                            Create an Account
                          </a>
                        </div>
                        <div class="login-via">
                          <label>
                            <span>Login via</span>
                          </label>
                          <ul class="social-list">
                            <li class="social-item">
                              <a href="">
                                <img
                                  src={facebook}
                                  alt="facebook"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li class="social-item">
                              <a href="">
                                <img
                                  src={google}
                                  alt="google"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Login;
