import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import I1 from "../../assets/img/contact/h13-2.png";
import I2 from "../../assets/img/contact/h13-3.png";
import I3 from "../../assets/img/contact/h13-4.png";
import I4 from "../../assets/img/contact/h13-5.png";
import "./Talent.css"; // Include any additional custom styles
import { Link } from "react-router-dom";
import { SlBadge } from "react-icons/sl";
import { AiOutlineDollar } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


const Talent = () => {
  return (
    // <div className="row g-5"
    //  style={{
    //   marginTop: "150px", marginBottom: "250px"
    // }}>
    //   <div
    //     className="col-md-6"
    //     style={{
    //       backgroundImage: `url(${BG})`,
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //       height: "700px",
    //       position: "relative",
    //       borderBottomLeftRadius: "50px",
    //     }}
    //   ></div>

    //   <div className="col-md-6 d-flex justify-content-left align-items-center">
    //     <div style={{ textAlign: "left", maxWidth: '60%' }}>
    //       <h1
    //         style={{
    //           color: "#000",
    //           fontFamily: "Poppins",
    //           fontSize: "3.5rem",
    //           lineHeight: "1.2",
    //           fontWeight: "600",
    //         }}
    //       >
    //         Find Talent Your Way
    //       </h1>
    //       <p
    //         style={{
    //           color: "#333",
    //           fontFamily: "Poppins",
    //           fontSize: "1rem",
    //           lineHeight: "1.6",
    //           marginTop: "20px",
    //         }}
    //       >
    //         Work with the largest network of independent professionals and get
    //         things done—from quick turnarounds.
    //       </p>
    //       <Link to="/contact">
    //       <button
    //         style={{
    //           marginTop: "30px",
    //           padding: "20px 25px",
    //           color: "#fff",
    //           backgroundColor: "#222222",
    //           fontSize: "1rem",
    //           borderRadius: "15px",
    //           cursor: "pointer",
    //           display: "flex",
    //           alignItems: "center",
    //           gap: "10px",
    //         }}
    //         >
    //         <b>Contact Us</b> <GoArrowUpRight /> {/* Add the icon */}
    //       </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  <>
      <section className="bgTalent">
        <div className="content-container">
          <div className="content-left">
            <div className="section-populated">
              <div className="title-section">
                  <h2 className="td-section-title">A whole world of freelance talent at your fingertips</h2>
              </div>
              <div className="benefit">
                <div className="icon">
                <SlBadge style={{fontSize: '30px', color: '#086bd6'}}/>
                </div>
                <div className="box-content">
                  <h3>Proof of qualityy</h3>
                  <p className="description">Check any pro’s work samples, client reviews, and identity verification.</p>

                </div>
              </div>
              <div className="benefit">
                <div className="icon">
                <AiOutlineDollar style={{fontSize: '30px', color: '#086bd6'}}/>
                </div>
                <div className="box-content">
                  <h3>No cost until you hire</h3>
                  <p className="description">Check any pro’s work samples, client reviews, and identity verification.</p>

                </div>
              </div>
              <div className="benefit">
                <div className="icon">
                <SlBadge style={{fontSize: '30px', color: '#086bd6'}}/>
                </div>
                <div className="box-content">
                  <h3>Safe and secure</h3>
                  <p className="description">Check any pro’s work samples, client reviews, and identity verification.</p>

                </div>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="section-populated">
              <div className="float">
                <div className="float-inner">
                  <ul className="tick-2">
                    <li>
                    <IoIosCheckmarkCircleOutline />
                    The best for every budget
                    </li>
                    <li>
                    <IoIosCheckmarkCircleOutline />
                    Quality work done quickly
                    </li>
                    <li>
                    <IoIosCheckmarkCircleOutline />
                    Protected payments, every time
                    </li>
                    <li>
                    <IoIosCheckmarkCircleOutline />
                    24/7 support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bgTalent-dark">
        <div className="content-container">
          <div className="content-left">
            <div className="section-populated">
              <div className="title-section">
                  <h2 className="td-section-title">A whole world of freelance talent at your fingertips</h2>
              </div>
              <div className="benefit">
                <div className="icon">
                <SlBadge style={{fontSize: '30px', color: '#50a5fe'}}/>
                </div>
                <div className="box-content">
                  <h3>Proof of qualityy</h3>
                  <p className="description">Check any pro’s work samples, client reviews, and identity verification.</p>

                </div>
              </div>
              <div className="benefit">
                <div className="icon">
                <AiOutlineDollar style={{fontSize: '30px', color: '#50a5fe'}}/>
                </div>
                <div className="box-content">
                  <h3>No cost until you hire</h3>
                  <p className="description">Check any pro’s work samples, client reviews, and identity verification.</p>

                </div>
              </div>
              <div className="benefit">
                <div className="icon">
                <SlBadge style={{fontSize: '30px', color: '#50a5fe'}}/>
                </div>
                <div className="box-content">
                  <h3>Safe and secure</h3>
                  <p className="description">Check any pro’s work samples, client reviews, and identity verification.</p>

                </div>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="section-populated">
              <div className="images-container d-flex ">
                <div className="w-50">
                  <img src={I1} alt="" className="w-100"/>
                </div>
                <div className="w-50">
                <img src={I2} alt="" className="w-100"/>
                </div>
              </div>
              <div className="images-container pt-40 d-flex ">
                <div className="w-50">
                  <img src={I3} alt="" className="w-100"/>
                </div>
                <div className="w-50">
                  <img src={I4} alt="" className="w-100"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </>
  );
};

export default Talent;
