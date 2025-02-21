import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

interface DocumentData {
  mobile: number;
  fName: string;
  lName: string;
  address_1: string;
  address_2: string;
  pincode: string;
  country: string;
  status: boolean;
  address_type: string;
}
const MyAccount = () => {
  const [addressData, setAddressData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getPost = async () => {
      const usersData = collection(db, "Address");
      const usersshot = await getDocs(usersData);
      const newdata: DocumentData[] = usersshot.docs.map(
        (doc) => doc.data() as DocumentData
      );
      setAddressData(newdata);
    };
    getPost();
  }, []);

  return (
    <>
      <Layout>
        <div className="container">
          <div className="my-account-sec p-5">
            <h2 className="sec-title mb-3">
              <span className="typ-1">My</span>
              <span className="cm-line-break typ-2">Account</span>
            </h2>
            <div className="cp-profile col-md-9">
              <h6 className="title fw-semibold mb-3">My Profile</h6>
              <div className="cp-dotted-box">
                <ul className="info-list">
                  <li className="info-item mb-3">
                    <p className="info-label">First Name</p>
                    <span className="info-value">Ram </span>
                  </li>
                  <li className="info-item mb-3">
                    <p className="info-label">Last Name</p>
                    <span className="info-value">Kishan</span>
                  </li>
                  <li className="info-item no-margin">
                    <p className="info-label">Email</p>
                    <span className="info-value">xeam.designer7@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dashboardCards col-md-9">
              <div className="title-wrap">
                <h5 className="fw-semibold">Order History</h5>
                <a
                  className="check-orinage text-decoration-none  fw-semibold"
                  href=""
                >
                  View All
                </a>
              </div>
              <div className="cp-cart">
                <ul className="prodcut-list p-0">
                  <li className="item typ-order">
                    <div className="img-wrap">
                      <img
                        src="https://www.firefoxbikes.com/dw/image/v2/BGQH_PRD/on/demandware.static/-/Sites-firefox-master/default/dw8a5d0046/all_images/112794341_main/Black/2.png?sh=216&amp;sfrm=png"
                        alt="Whiplash"
                        title="Whiplash"
                      />
                    </div>
                    <div className="prodcut-detail w-100">
                      <h5 className="prod-title fw-semibold mb-3">
                        Order No. : 100191224
                        <span className="cm-line-break tag"> </span>
                      </h5>

                      <div className="purches-detail">
                        <div className="p-list">
                          <div className="p-item d-grid">
                            <span className="label">Quantity</span>
                            <span className="fw-semibold">02</span>
                          </div>

                          <div className="p-item d-grid">
                            <span className="label">Price</span>
                            <span className="fw-semibold">₹22,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dashboardCards col-md-9">
              <div className="title-wrap mb-3">
                <h5 className="fw-semibold">Address Book</h5>
                <a
                  className="check-orinage text-decoration-none  fw-semibold"
                  href=""
                >
                  View All
                </a>
              </div>
              <div className="cp-profile">
                <div className="cp-dotted-box">
                  <ul className="info-list typ-address">
                    <li className="no-margin">
                      <div className="bs-radio">
                        <div className="cp-radio-box typ-address">
                          <div className="radio-wrap">
                            {addressData.length > 0 ? (
                              addressData.map((item, index) => {
                                return (
                                  <>
                                    <input
                                      type="radio"
                                      name="address"
                                      checked={item.status}
                                    />
                                    <label key={index}>
                                      <p className="name fw-bolder mb-0">
                                        {`${item.fName + " " + item.lName}`}
                                        <small className="tag bg-body-secondary px-2 rounded-pill">
                                          Work
                                        </small>
                                      </p>

                                      <p className="address d-grid gap-1 mb-0">
                                        {item.address_1},
                                        <span className="cm-line-break">
                                          {item.address_2},
                                        </span>
                                        <span className="cm-line-break">
                                          {item.pincode}
                                        </span>
                                      </p>
                                      <p className="phone-no">
                                        Mobile:
                                        <span className="fw-bolder">
                                          {item.mobile}
                                        </span>
                                      </p>
                                    </label>
                                  </>
                                );
                              })
                            ) : (
                              <div className="loader"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <Link to="/add-address" className="btn bg-reddish-orange">
                        Add New Address
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default MyAccount;
