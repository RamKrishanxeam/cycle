import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

interface DocumentData {
  id: string;
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
const AddList = () => {
  const [addressData, setAddressData] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoader] = useState(true);
  const getPost = async () => {
    try {
      const usersData = collection(db, "add_addresses");
      const usersnapshot = await getDocs(usersData);
      const newdata: DocumentData[] = usersnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<DocumentData, "id">;
        return { id: doc.id, ...data };
      });
      setIsLoader(false);
      setAddressData(newdata);
    } catch (error) {
      console.log(error);
      setIsLoader(true);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleDel = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setAddressData(addressData.filter((item) => item.id !== id));
      console.log("Document Deleted:", id);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="p-5">
          <h2 className="sec-title mb-5">
            <span className="typ-1">Address</span>
            <span className="cm-line-break typ-2 ms-2">Book</span>
          </h2>
          <div className="cp-profile">
            {isLoading ? (
              <div className="loader"></div>
            ) : addressData.length > 0 ? (
              addressData.map((item, index) => (
                <div className="cp-dotted-box" key={index}>
                  <ul className="info-list typ-address">
                    <li className="no-margin">
                      <div className="radio-wrap">
                        <input
                          type="radio"
                          name="address"
                          defaultChecked={item.status}
                        />
                        <label>
                          <p className="name fw-bolder mb-0">
                            {`${item.firstName} ${item.lastName}`}
                            <small className="tag bg-body-secondary px-2 rounded-pill">
                              Work
                            </small>
                          </p>
                          <p className="address d-grid gap-1 mb-0">
                            {item.address1},
                            <span className="cm-line-break">
                              {item.address2},
                            </span>
                            <span className="cm-line-break">
                              {item.zipCode}
                            </span>
                          </p>
                          <p className="phone-no">
                            Mobile:
                            <span className="fw-bolder">{item.phone}</span>
                          </p>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex justify-between gap-4">
                        <div
                          onClick={() => handleDel(item.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
                              fill="#0D0D0D"
                            />
                          </svg>
                        </div>
                        <div style={{ cursor: "pointer" }}>
                          <Link
                            to={`/edit-address/${item.id}`}
                            state={{ item }}
                          >
                            <svg
                              fill="#000000"
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <div className="no-data-found">No Data Found</div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
export default AddList;
