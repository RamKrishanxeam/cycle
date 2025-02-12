import { Link } from "react-router-dom";
import mainLogo from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";
import { logout } from "../../lib/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [sticky, setSticky] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const PathLoction = window.location.pathname;
  const useraccessGoogle = localStorage.getItem("userGoogle");
  const GoogleName = JSON.parse(useraccessGoogle);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
        <nav className="navbar navbar-expand-lg w-100">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={mainLogo} alt="navbar-brand" className="img-fluid" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse align-items-center"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Bikes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Accessories
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Bestsellers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    cannondale
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Electric Bikes
                  </a>
                </li>
              </ul>
              <div className="material-search d-flex align-items-center gap-4 mt-2">
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
                <div className="person position-relative">
                  {GoogleName?.displayName ? (
                    <div className="logout-menu-container">
                      <Link
                        to="#"
                        className="profile-icon"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        <img
                          src={
                            GoogleName.photoURL ||
                            "https://via.placeholder.com/96"
                          }
                          alt="GoogleName"
                          className="img-fluid rounded-pill"
                          style={{ width: "30px" }}
                        />
                      </Link>
                    </div>
                  ) : user?.accessToken && user !== null ? (
                    <>
                      <span
                        onClick={() => setShowMenu(!showMenu)}
                        className="material-symbols-outlined text-reddish-orange fw-bolder"
                      >
                        logout
                      </span>
                    </>
                  ) : (
                    <Link to="/login">
                      <span className="material-symbols-outlined text-reddish-orange fw-bolder">
                        person
                      </span>
                    </Link>
                  )}
                  {user?.accessToken && user !== null && showMenu && (
                    <div className="logout-menu">
                      <button
                        className="logout-btn"
                        onClick={() => {
                          dispatch(logout());
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
