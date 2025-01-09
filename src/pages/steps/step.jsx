import React from "react";
import img1 from "../../assets/img/steps/h19-2.jpg";
import img2 from "../../assets/img/steps/h19-3.jpg";
import img3 from "../../assets/img/steps/h19-4.jpg";
import img4 from "../../assets/img/steps/h19-5.jpg";
import "./Step.css"; // Import the CSS file

export const Step = () => {
  return (
    <div className="container-fluid custom-container my-5 ">
      <div className="text-wrapper">
        <h2 className="fw-bold">Need something done?</h2>
        <p className="text-muted mt-4 mb-3">Most viewed and all-time top-selling services</p>
      </div>
      <div className="row text-center">
        <div className="col-md-3">
          <div className="card custom-card">
            <img src={img1} className="card-img-top mb-3" alt="Post a job" />
            <h5 className="card-title fw-bold">Post a job</h5>
            <p className="card-text text-muted">
              It’s free and easy to post a job. Simply fill in a title,
              description.
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card custom-card">
            <img
              src={img2}
              className="card-img-top mb-3"
              alt="Choose freelancers"
            />
            <h5 className="card-title fw-bold">Choose freelancers</h5>
            <p className="card-text text-muted">
              It’s free and easy to post a job. Simply fill in a title,
              description.
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card custom-card">
            <img src={img3} className="card-img-top mb-3" alt="Pay safely" />
            <h5 className="card-title fw-bold">Pay safely</h5>
            <p className="card-text text-muted">
              It’s free and easy to post a job. Simply fill in a title,
              description.
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card custom-card">
            <img
              src={img4}
              className="card-img-top mb-3"
              alt="We’re here to help"
            />
            <h5 className="card-title fw-bold">We’re here to help</h5>
            <p className="card-text text-muted">
              It’s free and easy to post a job. Simply fill in a title,
              description.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
