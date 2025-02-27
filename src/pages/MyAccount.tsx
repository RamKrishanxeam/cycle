import * as React from "react";
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../config/hooks";
import { onAuthStateChanged, User } from "firebase/auth";

interface DocumentData {
  isDefault: boolean;
  addressType: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  phone: string;
  status: boolean;
}

const MyAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoader] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const [addressData, setAddressData] = useState<DocumentData[]>([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchAddresses(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAddresses = async (userId: any) => {
    const usersData = query(
      collection(db, "add_addresses"),
      where("userId", "==", userId)
    );
    const usersnapshot = await getDocs(usersData);
    const newdata: DocumentData[] = usersnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as DocumentData),
      };
    });
    const AddreessNew = newdata.filter((item) => item.status);
    setAddressData(AddreessNew);
    setIsLoader(false);
  };

  useEffect(() => {
    if (!user) {
      setTimeout(() => navigate("/login"), 1000);
    }
  }, [user, navigate]);

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
                    <span className="info-value">
                      {(user as any)?.FName || "undefined"}
                    </span>
                  </li>
                  <li className="info-item mb-3">
                    <p className="info-label">Last Name</p>
                    <span className="info-value">
                      {(user as any)?.LName || "undefined"}
                    </span>
                  </li>
                  <li className="info-item no-margin">
                    <p className="info-label">Email</p>
                    <span className="info-value">
                      {(user as any)?.email || "undefined"}
                    </span>
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
                <Link
                  className="check-orinage text-decoration-none  fw-semibold"
                  to="/address-list"
                >
                  View All
                </Link>
              </div>
              <div className="cp-profile">
                <div className="cp-dotted-box">
                  <ul className="info-list typ-address">
                    <li className="no-margin">
                      <div className="bs-radio">
                        <div className="cp-radio-box typ-address">
                          <div className="radio-wrap">
                            {isLoading ? (
                              <div className="loader"></div>
                            ) : addressData.length > 0 ? (
                              addressData.map((value, index) => (
                                <React.Fragment key={index}>
                                  <input
                                    type="radio"
                                    name="address"
                                    defaultChecked={value.status}
                                  />
                                  <label>
                                    <p className="name fw-bolder mb-0">
                                      {`${value.firstName} ${value.lastName}`}
                                      <small className="tag bg-body-secondary px-2 rounded-pill">
                                        {value.addressType || "Work"}
                                      </small>
                                    </p>

                                    <p className="address d-grid gap-1 mb-0">
                                      {value.address1},
                                      <span className="cm-line-break">
                                        {value.address2},
                                      </span>
                                      <span className="cm-line-break">
                                        {value.zipCode}
                                      </span>
                                    </p>

                                    <p className="phone-no">
                                      Mobile:
                                      <span className="fw-bolder">
                                        {value.phone}
                                      </span>
                                    </p>
                                  </label>
                                </React.Fragment>
                              ))
                            ) : (
                              <div className="no-data-found">No Data Found</div>
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
