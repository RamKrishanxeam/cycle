import { Link } from "react-router-dom";
import AddTocart from "../assets/images/addtocart.svg";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

interface DocumentData {
  colors: string;
  cycleName: string;
  price: string;
  quantity: string;
  size: string;
  price_discount: string;
  offers: string;
}
const Sellers = () => {
  const [addCartList, setAddCartList] = useState<DocumentData[]>([]);
  const getPost = async () => {
    try {
      const cart_List = collection(db, "cart_list");
      const usersnapshot = await getDocs(cart_List);
      const cartData: DocumentData[] = usersnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<DocumentData, "id">;
        return { id: doc.id, ...data };
      });
      setAddCartList(cartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className="Sellers-offer pt-3 mb-5">
        <h2 className="fw-bold text-center mb-5">Best Sellers</h2>
        <div className="container mx-auto Sellers-section-image">
          <div className="grid grid-cols-4 gap-4">
            {addCartList.length > 0 &&
              addCartList.map((cartValue, index) => {
                return (
                  <div
                    key={index}
                    className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                  >
                    <a
                      className="relative mx-3 mt-3 flex overflow-hidden rounded-xl bg-[#f8673b3d]"
                      href="#"
                    >
                      <img
                        className="object-cover"
                        src="https://www.firefoxbikes.com/dw/image/v2/BGQH_PRD/on/demandware.static/-/Sites-firefox-master/default/dw2221430d/all_images/112794341_main/1.png?sh=298&cx=10&cy=125&cw=1004&ch=774&sfrm=png"
                        alt="product image"
                      />
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        {cartValue.offers}% OFF
                      </span>
                    </a>
                    <div className="px-4 pb-4 mt-3">
                      <h5 className="text-xl tracking-tight text-slate-900">
                        {cartValue.cycleName}
                      </h5>
                      <div className="flex items-center justify-between">
                        <p className="m-0">
                          <span className="text-3xl font-bold text-slate-900">
                            ₹{cartValue.price}
                          </span>
                          <span className="text-sm text-slate-900 line-through">
                            ₹{cartValue.price_discount}
                          </span>
                        </p>
                      </div>
                      <div className="mb-4">
                        <span className="text-lg font-medium text-slate-900 text-uppercase">
                          {cartValue.colors}
                        </span>
                      </div>
                      <Link
                        to="#"
                        className="flex items-center justify-center text-decoration-none text-sm font-medium bg-reddish-orange py-2 rounded-sm"
                      >
                        <img
                          src={AddTocart}
                          alt="Add to cart"
                          className="w-5 h-auto mr-2"
                        />
                        Add to cart
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sellers;
