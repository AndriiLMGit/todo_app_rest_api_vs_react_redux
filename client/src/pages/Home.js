import React from "react";

export const Home = () => {
  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-lg-between align-items-lg-center">
          <div className="col-lg text-center text-lg-start">
            <h1 className="display-3 mb-4">Boost your digital presence</h1>
            <p className="lead text-secondary">
              Build an awesome website with a clean and accessible Bootstrap
              theme. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mx-n2">
              <a className="btn btn-primary m-2 me-1" href="">
                <i className="bi bi-file-earmark-break-fill me-1"></i>
                View all pages
              </a>
              <a href="" className="btn btn-outline-primary m-2 me-1">
                <i className="bi bi-file-earmark-check-fill me-1"></i>
                Documentation
              </a>
            </div>
          </div>
          <div className="col-lg">
            <img
              src="https://boost-theme.netlify.app/assets/img/revenue.svg"
              className="img-fluid d-none d-lg-block"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
