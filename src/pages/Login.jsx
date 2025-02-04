import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import facebook from "../assets/images/facebook.svg";
import google from "../assets/images/google.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGooglePopup } from "../config/firebase";
import { Formik } from "formik";
import { LoginSchema } from "../config/validation";

const Login = () => {
  const navigate = useNavigate();
  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.accessToken) {
          localStorage.setItem("user", user.accessToken);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error, "errorMessage");
      });
  };

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    if (response.user.emailVerified) {
      localStorage.setItem("userGoogle", JSON.stringify(response.user));
      navigate("/");
    }
  };

  return (
    <>
      <Layout>
        <div className="login-section mb-5">
          <div className="login-infograpy"></div>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <div className="cont-wrap">
                  <h2 className="banner-title">
                    <div className="typ-1">Hello</div>
                    <div className="cm-line-break typ-2">There!!</div>
                  </h2>
                  <p className="desc">
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
                      const { email, password } = values;
                      signIn(email, password);
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
                              <a href="">
                                <img
                                  src={facebook}
                                  alt="facebook"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="social-item">
                              <Link to="" onClick={logGoogleUser}>
                                <img
                                  src={google}
                                  alt="google"
                                  className="img-fluid"
                                />
                              </Link>
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
