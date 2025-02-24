import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { stateData } from "../utils/data";
import { Formik } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const EditAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.item;

  return (
    <Layout>
      <div className="container">
        <div className="lyt-profile-sec p-5">
          <h2 className="sec-title mb-5">
            <span className="typ-1">Edit New</span>
            <span className="cm-line-break typ-2 ms-2">Address</span>
          </h2>
          <div className="w-75">
            <Formik
              initialValues={{
                addressType: editData.addressType,
                firstName: editData.firstName,
                lastName: editData.lastName,
                address1: editData.address1,
                address2: editData.address2,
                country: editData.country,
                state: editData.state,
                city: editData.city,
                zipCode: editData.zipCode,
                phone: editData.phone,
                status: editData.status,
              }}
              onSubmit={async (values) => {
                try {
                  const docRef = doc(db, "add_addresses", editData.id);
                  await updateDoc(docRef, values);
                  console.log("Document updated successfully!");
                  navigate("/address-list");
                } catch (error) {
                  console.error("Error updating document:", error);
                }
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
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
                        required
                      />
                    </div>
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
                        required
                      />
                    </div>
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
                        required
                      />
                    </div>
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
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block">Country</label>
                    <select
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                      className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="IN">India</option>
                    </select>
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
                          required
                        />
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
                      required
                      maxLength={6}
                    />

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
                        required
                        maxLength={10}
                      />
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

export default EditAddress;
