import image1 from "../assets/images/AU.png";
import image2 from "../assets/images/BajajFinance.png";
import image3 from "../assets/images/HDFC-logo.png";
import image4 from "../assets/images/idfc-icon2.png";

const ExclusiveOffer = () => {
  return (
    <>
      <div className="exclusive-offer pt-3 mb-5">
        <h2 className="fw-bold text-center mb-5">EXCLUSIVE OFFER</h2>
        <div className="exclusive-section-image text-center">
          <img src={image1} alt="" className="img-fluid" />
          <img src={image2} alt="" className="img-fluid" />
          <img src={image3} alt="" className="img-fluid" />
          <img src={image4} alt="" className="img-fluid" />
        </div>
      </div>
    </>
  );
};
export default ExclusiveOffer;
