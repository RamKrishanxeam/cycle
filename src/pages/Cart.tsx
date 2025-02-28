import Layout from "../layout/Layout";
import "../index.css";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

const Cart = () => {
  const [add, setAdd] = useState<number>(1);
  const calculatePrice = (quantity: number) => {
    const basePrice = 10000;
    let discount = 0;

    if (!quantity) {
      discount = 5;
    } else {
      if (quantity > 2) {
        discount = 7; // 7% off
      } else if (quantity > 1) {
        discount = 5; // 5% off
      }
    }
    const discountedPrice = basePrice - (basePrice * discount) / 100;
    return discountedPrice * quantity;
  };
  return (
    <>
      <Layout>
        <div className="container mx-auto mt-10">
          <div className="sm:flex shadow-md my-10">
            <div className="w-full  sm:w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h2 className="text-2xl font-bold">
                  <span className="text-gray-800">Shopping</span>
                  <span className="block text-gray-600">Cart</span>
                </h2>
              </div>
              <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50 gap-4">
                <div className="w-80 h-auto flex-shrink-0 border p-3">
                  <img
                    src="https://www.firefoxbikes.com/dw/image/v2/BGQH_PRD/on/demandware.static/-/Sites-firefox-master/default/dw8a5d0046/all_images/112794341_main/Black/2.png?sh=216&amp;sfrm=png"
                    alt="Black Leather Purse"
                    className="h-full object-center object-cover md:block hidden"
                  />
                  <img
                    src="https://i.ibb.co/TTnzMTf/Rectangle-21.png"
                    alt="Black Leather Purse"
                    className="md:hidden w-full h-full object-center object-cover"
                  />
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                    RF293
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-black leading-none text-gray-800">
                      Luxe card holder
                    </p>
                    <div className="mb-2">
                      <span className="text-[#3f4351] text-[12px] block mb-1">
                        Quantity
                      </span>
                      <div className="flex items-center gap-2 border rounded-full">
                        <button
                          className="px-3 py-1"
                          onClick={() =>
                            setAdd((prev) => Math.max(1, prev - 1))
                          }
                        >
                          -
                        </button>
                        <span className="font-semibold">{add}</span>
                        <button
                          className="px-3 py-1"
                          onClick={() => setAdd(add + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-3 text-gray-600 pt-2">
                    Height: 10 inches
                  </p>
                  <p className="text-xs leading-3 text-gray-600 py-4">
                    Color: Black
                  </p>
                  <p className="w-96 text-xs leading-3 text-gray-600">
                    Composition: 100% calf leather
                  </p>
                  <div className="flex items-center justify-between pt-5">
                    <div className="flex itemms-center">
                      <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                        Add to favorites
                      </p>
                      <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                        Remove
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/account-show"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>
            </div>
            <div id="summary" className="w-full sm:w-1/4  md:w-1/2  px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Items {add}
                </span>
                <span className="font-semibold">₹{calculatePrice(add)}</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping -₹{calculatePrice(add)}</option>
                </select>
              </div>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>₹{calculatePrice(add)}</span>
                </div>
                <Button variant="default">Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Cart;
