import React from "react";
import BG from "../../assets/img/hero/hero3/h19-1.jpg";
import { Link } from "react-router-dom";
import BG2 from "../../assets/img/breadcrumb/h13-bg.jpg";

export const HeroThree = () => {
  return (
    <div className="row" style={{marginBottom: '150px'}}>
      {/* Left Column */}
      <div className="col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <h1 className="td-section-title">
            Find the Perfect Team for you
          </h1>
          <p className="mt-3" style={{color: '#000', fontFamily: 'Poppins', lineHeight: "1.5"}}>Work with talented people at the most affordable price to get the most out of your time and cost</p> <br />
          <Link to="/subscription" className="mt-3" style={{borderColor: '#0b7ffe', border: 'solid 1px',padding: '20px', color: '#0b7ffe', backgroundColor: 'transparent', borderRadius: '20px'}}><b>Get Subscription Now</b></Link>
        </div>
      </div>
      {/* Right Column */}
      <div
        className="col-md-6 col-lg-6 col-xl-6 mt-30"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "700px",
          position: "relative",
          borderBottomLeftRadius: '50px'
        }}
      >
      </div>
    </div>
    
  );
};