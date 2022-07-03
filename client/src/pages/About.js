import React from "react";

export const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-lg-between align-items-lg-center">
        <div className="col-lg text-center text-lg-start">
          <h1 className="display-3 mb-4">Showcase your amazing app</h1>
          <p className="lead text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-secondary mb-2">Download the app now:</p>
          <div className="d-grid d-sm-block mx-n2">
            <a className="btn btn-primary m-2" href="#">
              <i className="bi bi-apple me-1"></i>
              <span>App Store</span>
            </a>
            <a className="btn btn-primary m-2" href="#">
              <i className="bi bi-google me-1"></i>
              <span>Google Play</span>
            </a>
          </div>
        </div>
        <div className="col-lg">
          <img
            src="https://boost-theme.netlify.app/assets/img/holding-phone.svg"
            className="img-fluid d-none d-lg-block"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
