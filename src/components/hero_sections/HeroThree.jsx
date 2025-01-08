import React from "react";
import BG from "../../assets/img/hero/hero3/h19-1.jpg";

export const HeroThree = () => {
  return (
    <div className="row">
      {/* Left Column */}
      <div className="col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <h1 style={{ color: '#000', fontFamily: "Poppins", fontSize: "4rem", lineHeight: "1.5", fontWeight: '400' }}>
            Find the Perfect Freelancer for you
          </h1>
          <p className="mt-3" style={{color: '#000', fontFamily: 'Poppins', lineHeight: "1.5"}}>Work with talented people at the most affordable price to get the most out of your time and cost</p>
          <button className="mt-3" style={{borderColor: '#0b7ffe', border: 'solid 1px',padding: '20px', color: '#0b7ffe', backgroundColor: 'transparent'}}><b>Get Subscription Now</b></button>
        </div>
      </div>
      {/* Right Column */}
      <div
        className="col-md-6 col-lg-6 col-xl-6"
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