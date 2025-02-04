import { Link } from "react-router-dom";
import mainLogo from "../../assets/images/logo.svg";
import { useState } from "react";

const Navbar = () => {
  const PathLoction = window.location.pathname;

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
                <div className="person">
                  <Link to="/login">
                    <span className="material-symbols-outlined text-reddish-orange fw-bolder">
                      person
                    </span>
                  </Link>
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
