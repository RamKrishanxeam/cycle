import React from "react";
import Slider from "react-slick";
import image1 from "../assets/images/MOF1_Desktop.jpg";
import image2 from "../assets/images/MOF2_Desktop.jpg";
import image3 from "../assets/images/FF-Hdfc-W.jpg";
import image4 from "../assets/images/MOF4_Desktop.jpg";

function Banner() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 3000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };
  return (
    <div className="slider-section mb-5">
      <Slider {...settings}>
        <div>
          <img src={image1} alt="MOF1_Desktop" className="w-100 h-auto" />
        </div>
        <div>
          <img src={image2} alt="MOF2_Desktop" className="w-100 h-auto" />
        </div>
        <div>
          <img src={image3} alt="MOF3_Desktop" className="w-100 h-auto" />
        </div>
        <div>
          <img src={image4} alt="MOF4_Desktop" className="w-100 h-auto" />
        </div>
      </Slider>
      <div className="silder-name-icons">
        <ul>
          <li className="d-flex align-items-center justify-content-center">
            Find My Bike
            <span className="material-symbols-outlined fw-semibold">
              arrow_forward_ios
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-center">
            Upgrade My Bike
            <span className="material-symbols-outlined fw-semibold">
              arrow_forward_ios
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-center">
            Bike Servicing
            <span className="material-symbols-outlined fw-semibold">
              arrow_forward_ios
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-center">
            Bike Accessories
            <span className="material-symbols-outlined fw-semibold">
              arrow_forward_ios
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-center">
            Bulk Order
            <span className="material-symbols-outlined fw-semibold">
              arrow_forward_ios
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Banner;
