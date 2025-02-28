import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const PaymentCencel = () => {
  return (
    <>
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full dark:bg-[#f8673b]">
                <svg
                  className="h-12 w-12 text-[#f8673b] dark:text-green-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  ></path>
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold text-[#f8673b] dark:text-[#f8673b]">
                Payment Canceled!
              </h1>
              <p className="mt-4 text-lg ">
                Your payment was not completed. You can try again or return to
                the homepage.
              </p>
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-decoration-none inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-[#f8673b]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default PaymentCencel;
