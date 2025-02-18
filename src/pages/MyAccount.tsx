import Layout from "../layout/Layout";

const MyAccount = () => {
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
          </div>
        </div>
      </Layout>
    </>
  );
};
export default MyAccount;
