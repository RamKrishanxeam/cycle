export const LoginandSignup = ({
  heading,
  subHeading,
  Desc,
  DescSub,
  formSection,
}) => {
  return (
    <>
      <div className="login-section mb-5">
        <div className="login-infograpy"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="cont-wrap">
                <h2 className="banner-title">
                  <div className="typ-1">{heading}</div>
                  <div className="cm-line-break typ-2">{subHeading}</div>
                </h2>
                <p className="desc">
                  {Desc} <br /> {DescSub}.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="bs-box sign-up-box">{formSection}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
