import { useState } from "react";
import Layout from "../layout/Layout";

const AddAddress = () => {
  const [formData, setFormData] = useState({
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
  });

  const states = [
    { id: "DL", name: "Delhi" },
    { id: "MH", name: "Maharashtra" },
    { id: "KA", name: "Karnataka" },
    { id: "UP", name: "Uttar Pradesh" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Layout>
      <div className="container">
        <div className="lyt-profile-sec p-5">
          <h2 className="sec-title mb-5">
            <span className="typ-1">Add New</span>
            <span className="cm-line-break typ-2">Address</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block">Address Type</label>
              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                className="w-full form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
              >
                <option value="Work">Work</option>
                <option value="Home">Home</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
              />
              <label className="block">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
              />
            </div>
            <div className="mb-3">
              <label className="block">Address 1</label>
              <input
                type="text"
                name="address1"
                placeholder="Address 1"
                value={formData.address1}
                onChange={handleChange}
                className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
              />
              <label className="block">Address 2</label>
              <input
                type="text"
                name="address2"
                placeholder="Address 2"
                value={formData.address2}
                onChange={handleChange}
                className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
              />
            </div>
            <div className="mb-3">
              <label className="block">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
              <label className="block">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
              />
            </div>
            <div className="mb-3">
              <label className="block">Pincode</label>
              <input
                type="text"
                name="zipCode"
                placeholder="Pincode"
                value={formData.zipCode}
                onChange={handleChange}
                className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                maxLength={6}
              />
              <label className="block">Mobile</label>
              <input
                type="text"
                name="phone"
                placeholder="Mobile"
                value={formData.phone}
                onChange={handleChange}
                className="form-control border-0 border-bottom  shadow-none w-100 mb-4 px-0"
                maxLength={10}
              />
            </div>
            <button type="submit" className=" rounded mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddAddress;
