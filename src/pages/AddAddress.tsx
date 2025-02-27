import Layout from "../layout/Layout";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { stateData } from "../utils/data";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { addressSchema } from "../config/validation";
import { useState } from "react";

const AddAddress = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>("");
  return (
    <Layout>
      <div className="container">
        <div className="lyt-profile-sec p-5">
          <h2 className="sec-title mb-5">
            <span className="typ-1">Add New</span>
            <span className="cm-line-break typ-2 ms-2">Address</span>
          </h2>
          {successMessage && (
            <div className="alert alert-success py-2 d-inline-block">
              {successMessage}
            </div>
          )}
          <div className="w-75">
            <Formik
              initialValues={{
                addressType: "Work",
                firstName: "",
                lastName: "",
                address1: "",
                address2: "",
                country: "IN",
                state: "",
                city: "",
                zipCode: "",
                phone: "",
                status: true,
              }}
              validationSchema={addressSchema}
              onSubmit={async (values) => {
                try {
                  if (!auth.currentUser) return;

                  const docRef = await addDoc(collection(db, "add_addresses"), {
                    ...values,
                    userId: auth.currentUser.uid,
                  });
                  if (docRef.id) {
                    setSuccessMessage("Add New Address saved successfully!");
                    setTimeout(() => navigate("/account-show"), 1000);
                  }
                } catch (error) {
                  console.error("Error adding document: ", error);
                }
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
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="block">Address Type</label>
                        <select
                          name="addressType"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.addressType}
                          className="w-full form-select border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                        >
                          <option value="Work">Work</option>
                          <option value="Home">Home</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.addressType && touched.addressType && (
                          <div className="error-message">
                            <span className="material-symbols-outlined">
                              error
                            </span>
                            {errors.addressType}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div>
                      <label className="block">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        placeholder="First Name"
                        className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <div className="error-message">
                        <span className="material-symbols-outlined">error</span>
                        {errors.firstName}
                      </div>
                    )}
                    <div>
                      <label className="block">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <div className="error-message">
                        <span className="material-symbols-outlined">error</span>
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <div>
                      <label className="block">Address 1</label>
                      <input
                        type="text"
                        name="address1"
                        placeholder="Address 1"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address1}
                        className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                      />
                    </div>
                    {errors.address1 && touched.address1 && (
                      <div className="error-message">
                        <span className="material-symbols-outlined">error</span>
                        {errors.address1}
                      </div>
                    )}
                    <div>
                      <label className="block">Address 2</label>
                      <input
                        type="text"
                        name="address2"
                        placeholder="Address 2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address2}
                        className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                      />
                    </div>
                    {errors.address2 && touched.address2 && (
                      <div className="error-message">
                        <span className="material-symbols-outlined">error</span>
                        {errors.address2}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block">Country</label>
                    <select
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                      className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                    >
                      <option value="">Select Country</option>
                      <option value="IN">India</option>
                    </select>
                    {errors.country && touched.country && (
                      <div className="error-message">
                        <span className="material-symbols-outlined">error</span>
                        {errors.country}
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label className="block">State</label>
                        <select
                          name="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                          className="form-select border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                        >
                          <option value="">Select State</option>
                          {stateData.map((state, index) => (
                            <option
                              key={index}
                              value={state.id}
                              className="mx-2"
                            >
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.state && touched.state && (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.state}
                        </div>
                      )}
                    </div>
                    <div className="col">
                      <div className="mb-3">
                        <label className="block">City</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                        />
                        {errors.city && touched.city && (
                          <div className="error-message">
                            <span className="material-symbols-outlined">
                              error
                            </span>
                            {errors.city}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block">Pincode</label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Pincode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zipCode}
                      className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                      maxLength={6}
                    />
                    {errors.zipCode && touched.zipCode && (
                      <div className="error-message">
                        <span className="material-symbols-outlined">error</span>
                        {errors.zipCode}
                      </div>
                    )}
                    <div>
                      <label className="block">Mobile</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Mobile"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                        maxLength={10}
                      />
                      {errors.phone && touched.phone && (
                        <div className="error-message">
                          <span className="material-symbols-outlined">
                            error
                          </span>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn bg-reddish-orange rounded-0 text-uppercase fw-bolder mb-3"
                  >
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddAddress;
