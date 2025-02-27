import { Link } from "react-router-dom";
import mainLogo from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";
import { logout } from "../../lib/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../../config/hooks";

const Navbar = () => {
  const [sticky, setSticky] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const PathLoction = window.location.pathname;
  const userGoogeleAndFacebook = localStorage.getItem("userGoogleAndFacebook");
  const GoogleAndfacebook = JSON.parse(userGoogeleAndFacebook);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  const isSticky = () => {
    const stickyClass = window.scrollY >= 250 ? "is-sticky" : "";
    setSticky(stickyClass);
  };

  return (
    <>
      <div
        className={`${
          PathLoction == "/"
            ? `${!sticky ? "navbar-section" : "is-sticky"}`
            : "navbar-section-others"
        }`}
      >
        <nav className="w-full">
          <div className="container mx-auto flex justify-between items-center p-3">
            <Link to="/" className="flex-shrink-0">
              <img src={mainLogo} alt="navbar-brand" className="h-10" />
            </Link>
            <button className="lg:hidden p-2 border rounded-md">☰</button>
            <div className="hidden lg:flex align-baseline space-x-6">
              <ul className="flex items-center space-x-4 text-gray-700">
                <li>
                  <Link
                    className="text-[#fff] hover:text-red-500 text-decoration-none text-uppercase text-[14px] font-semibold"
                    to="/Bikes"
                  >
                    Bikes
                  </Link>
                </li>
                <li>
                  <a
                    className="text-[#fff] hover:text-red-500 text-decoration-none text-uppercase text-[14px] font-semibold"
                    href="#"
                  >
                    Accessories
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#fff] hover:text-red-500 text-decoration-none text-uppercase text-[14px] font-semibold"
                    href="#"
                  >
                    Bestsellers
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#fff] hover:text-red-500 text-decoration-none text-uppercase text-[14px] font-semibold"
                    href="#"
                  >
                    Cannondale
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#fff] hover:text-red-500 text-decoration-none text-uppercase text-[14px] font-semibold"
                    href="#"
                  >
                    Electric Bikes
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex items-center space-x-4">
              <div className="search">
                <span className="material-symbols-outlined text-reddish-orange fw-bolder">
                  search
                </span>
              </div>
              <div className="location_on">
                <span className="material-symbols-outlined text-reddish-orange fw-bolder">
                  location_on
                </span>
              </div>
              <div className="shopping_cart">
                <span className="material-symbols-outlined text-reddish-orange fw-bolder">
                  shopping_cart
                </span>
              </div>
              <div className="relative">
                {GoogleAndfacebook?.displayName ? (
                  <div>
                    <Link to="#" onClick={() => setShowMenu(!showMenu)}>
                      <img
                        src={
                          GoogleAndfacebook.photoURL ||
                          "https://via.placeholder.com/96"
                        }
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                    </Link>
                  </div>
                ) : user !== null ? (
                  <span
                    onClick={() => setShowMenu(!showMenu)}
                    className="material-symbols-outlined text-reddish-orange fw-bolder"
                  >
                    logout
                  </span>
                ) : (
                  <Link to="/login">
                    <span className="material-symbols-outlined text-reddish-orange fw-bolder">
                      person
                    </span>
                  </Link>
                )}
                {user !== null && showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <Link
                      to="/account-show"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-decoration-none"
                    >
                      My Profile
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
