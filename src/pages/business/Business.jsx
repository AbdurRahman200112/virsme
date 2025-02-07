import React from "react";
import BG from "../../assets/img/hero/hero3/h19-7.jpg";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";


export const Business = () => {
    return (
        <div className="container-fluid">
            <div className="row"
                style={{
                    marginTop: "150px",
                }}>
                {/* Left Column */}
                <div className="col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-start my-5">
                    <div className="col-md-8">
                        <h2 className="td-section-title" style={{fontSize:'38px'}}>
                            Find the talent needed to get your business growing.
                        </h2>
                        <p className="mt-3" style={{ color: '#000', fontFamily: 'Poppins', lineHeight: "1.5" }}>Work with the largest network of independent professionals and get things done—from quick turnarounds.</p>
                        <div className="row">
                            <div className="col-6">
                                <div className="td-brand-counter">
                                    <h4 className="td-brand-counter-title"
                                    >
                                        <span
                                            data-purecounter-duration="1"
                                            data-purecounter-end="890"
                                            className="purecounter"
                                        >
                                            0
                                        </span>
                                        M
                                    </h4>
                                    <span className="td-brand-counter-pre">
                                        Total Employees
                                    </span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="td-brand-counter">
                                    <h4 className="td-brand-counter-title"
                                    >
                                        <span
                                            data-purecounter-duration="1"
                                            data-purecounter-end="750"
                                            className="purecounter"
                                        >
                                            0
                                        </span>
                                        M
                                    </h4>
                                    <span className="td-brand-counter-pre">
                                        Positive Reviews
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-6">
                                <div className="td-brand-counter">
                                    <h4 className="td-brand-counter-title"
                                    >
                                        <span
                                            data-purecounter-duration="1"
                                            data-purecounter-end="98"
                                            className="purecounter"
                                        >
                                            0
                                        </span>
                                        M
                                    </h4>
                                    <span className="td-brand-counter-pre">
                                        Projects recieved
                                    </span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="td-brand-counter">
                                    <h4 className="td-brand-counter-title"
                                    >
                                        <span
                                            data-purecounter-duration="1"
                                            data-purecounter-end="336"
                                            className="purecounter"
                                        >
                                            0
                                        </span>
                                        M
                                    </h4>
                                    <span className="td-brand-counter-pre">
                                        Projects Completed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link to="/subscription">
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
                                <b>Find Talent Your Way</b> <GoArrowUpRight /> {/* Add the icon */}
                            </button>
                        </Link>
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
        </div>
    )
}
export default Business;