import Layout from "../layout/Layout";
import "../index.css";
import { useState } from "react";

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
        <div className="container mx-auto p-5">
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-3 border-b-2 pb-3">
              <span className="text-gray-800">Shopping</span>
              <span className="block text-gray-600">Cart</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="md:w-3/4 border-b-2 pb-5 pt-3">
                <ul className="list-none p-0">
                  <li className="flex gap-4">
                    <div className="w-48 h-auto flex-shrink-0 border p-3">
                      <img
                        src="https://www.firefoxbikes.com/dw/image/v2/BGQH_PRD/on/demandware.static/-/Sites-firefox-master/default/dw8a5d0046/all_images/112794341_main/Black/2.png?sh=216&amp;sfrm=png"
                        alt="Whiplash"
                        title="Whiplash"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-2xl font-bold mb-2">Tremor X</h5>
                      <div className="d-flex justify-between">
                        <div className="w-2/4 d-flex gap-16 items-baseline">
                          <div className="mb-2">
                            <span className="text-[#3f4351] text-[12px] block">
                              Colors
                            </span>
                            <span className="font-semibold">Green</span>
                          </div>
                          <div>
                            <span className="text-[#3f4351] text-[12px] block">
                              Frame Size
                            </span>
                            <span className="font-semibold">36</span>
                          </div>
                        </div>
                        <div className="w-2/4 d-flex gap-16 items-baseline">
                          <div className="mb-2">
                            <span className="text-[#3f4351] text-[12px] block mb-1">
                              Quantity
                            </span>
                            <div className="flex items-center gap-2 border rounded-full">
                              <button
                                className="px-4 py-1"
                                onClick={() =>
                                  setAdd((prev) => Math.max(1, prev - 1))
                                }
                              >
                                -
                              </button>
                              <span className="font-semibold">{add}</span>
                              <button
                                className="px-4 py-1"
                                onClick={() => setAdd(add + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div>
                            <span className="text-[#3f4351] text-[12px] block">
                              Price
                            </span>
                            <span className="font-semibold">
                              ₹{calculatePrice(add)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/4">
                <div className="px-5 py-3">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₹{calculatePrice(add)}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">
                      ₹{calculatePrice(add)}
                    </span>
                  </div>
                  <button className="btn bg-reddish-orange">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Cart;
