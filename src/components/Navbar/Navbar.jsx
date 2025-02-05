import { Link } from "react-router-dom";
import mainLogo from "../../assets/images/logo.svg";
import { auth } from "../../config/firebase";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const PathLoction = window.location.pathname;
  const useraccessToken = localStorage.getItem("user");
  const useraccessGoogle = localStorage.getItem("userGoogle");
  const GoogleName = JSON.parse(useraccessGoogle);

  console.log(showMenu, "showMenu");

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign-out successful");
        localStorage.clear();
        localStorage.getItem("userGoogle");
        window.location.reload();
      })
      .catch((error) => {
        console.log("An error happened", error);
      });
  };
  return (
    <>
      <div
        className={`${
          PathLoction == "/" ? "navbar-section" : "navbar-section-others"
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
                  {GoogleName?.photoURL ? (
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
                  ) : useraccessToken ? (
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
                  {showMenu && (
                    <div className="logout-menu">
                      <button className="logout-btn" onClick={handleLogout}>
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
