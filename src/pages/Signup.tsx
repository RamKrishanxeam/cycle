import { LoginandSignup } from "../components/Form/Form";
import Layout from "../layout/Layout";
import { Formik } from "formik";
import { SignUpSchema } from "../config/validation";

import { Link } from "react-router-dom";
import { SignUpUser } from "../lib/thunk/userThunk";
import { useAppDispatch, useAppSelector } from "../config/hooks";

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, errorMessage, successMessage } = useAppSelector(
    (state) => state.auth
  );

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
                  console.log(values);
                  dispatch(SignUpUser(values));
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
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0"
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
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0"
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
                    <div className="mb-4">
                      <label className="form-label">Mobile*</label>
                      <input
                        type="text"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0"
                        placeholder="Enter Phone Number"
                        name="PNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.PNumber}
                        maxLength={10}
                      />
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
                    <div className="mb-4">
                      <label className="form-label">Password*</label>
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
                    <div className="mb-4">
                      <label className="form-label">Confirm Password*</label>
                      <input
                        type="password"
                        className="form-control shadow-none bg-transparent border-0 border-bottom rounded-0"
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
            </>
          }
        />
      </Layout>
    </>
  );
};
export default Signup;
