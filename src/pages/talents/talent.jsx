import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import BG from "../../assets/img/hero/hero3/h19-6.jpg"; // Replace with your image path
import "./Talent.css"; // Include any additional custom styles
import { Link } from "react-router-dom";

const Talent = () => {
  return (
    <div className="row g-5"
     style={{
      marginTop: "150px", marginBottom: "250px"
    }}>
      {/* Left Column */}
      <div
        className="col-md-6"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "700px",
          position: "relative",
          borderBottomLeftRadius: "50px",
        }}
      ></div>

      {/* Right Column */}
      <div className="col-md-6 d-flex justify-content-left align-items-center">
        <div style={{ textAlign: "left", maxWidth: '60%' }}>
          <h1
            style={{
              color: "#000",
              fontFamily: "Poppins",
              fontSize: "3.5rem",
              lineHeight: "1.2",
              fontWeight: "600",
            }}
          >
            Find Talent Your Way
          </h1>
          <p
            style={{
              color: "#333",
              fontFamily: "Poppins",
              fontSize: "1rem",
              lineHeight: "1.6",
              marginTop: "20px",
            }}
          >
            Work with the largest network of independent professionals and get
            things done—from quick turnarounds.
          </p>
          <Link to="/contact">
          <button
            style={{
              marginTop: "30px",
              padding: "20px 25px",
              color: "#fff",
              backgroundColor: "#222222",
              fontSize: "1rem",
              borderRadius: "15px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            >
            <b>Contact Us</b> <GoArrowUpRight /> {/* Add the icon */}
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Talent;
