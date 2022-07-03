import React from "react";
import { Link } from "react-router-dom";
import image_404 from "../assets/images/5203299.jpg";

export const NotFound = () => {
  return (
    <div className="text-center">
      <div className="col-sm-10 col-md-9 col-lg-6 mx-auto">
        <img src={image_404} alt="Image 404" className="img-fluid" />
      </div>
      <Link to="/" className="btn btn-sm btn-warning">
        Go home
      </Link>
    </div>
  );
};
