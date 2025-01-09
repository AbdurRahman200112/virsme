import React from "react";
import BG from "../../assets/img/hero/hero3/h19-7.jpg";
import { GoArrowUpRight } from "react-icons/go";


export const Business = () => {
    return (
        <div className="row" style={{ marginTop: '100px', marginBottom: '100px' }}>
            {/* Left Column */}
            <div className="col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                    <h1 style={{ color: '#000', fontFamily: "Poppins", fontSize: "32px", lineHeight: "1.5", fontWeight: 'bold' }}>
                        Find the talent needed to get your business growing.
                    </h1>
                    <p className="mt-3" style={{ color: '#000', fontFamily: 'Poppins', lineHeight: "1.5" }}>Work with the largest network of independent professionals and get things done—from quick turnarounds.</p>
                    <div class="row">
                        <div class="col-md-6">
                            <div className="td-brand-counter">
                                <h2 className="td-brand-counter-title" style={{ fontSize: '60px' }}
                                >
                                    <span
                                        data-purecounter-duration="1"
                                        data-purecounter-end="890"
                                        className="purecounter"
                                    >
                                        0
                                    </span>
                                    M
                                </h2>
                                <span className="td-brand-counter-pre">
                                    Total Employees
                                </span>
                            </div>
                            <span className="td-brand-shape td-brand-shape-position-2">
                                <i className="fa-sharp fa-regular fa-plus fa-fw"></i>
                            </span>
                            <span className="td-brand-shape td-brand-shape-position-3">
                                <i className="fa-sharp fa-regular fa-plus fa-fw"></i>
                            </span>
                        </div>
                        <div class="col-md-6">
                            <div className="td-brand-counter">
                                <h2 className="td-brand-counter-title" style={{ fontSize: '60px' }}
                                >
                                    <span
                                        data-purecounter-duration="1"
                                        data-purecounter-end="750"
                                        className="purecounter"
                                    >
                                        0
                                    </span>
                                    M
                                </h2>
                                <span className="td-brand-counter-pre">
                                    Positive Reviews
                                </span>
                            </div>
                            <span className="td-brand-shape td-brand-shape-position-2">
                                <i className="fa-sharp fa-regular fa-plus fa-fw"></i>
                            </span>
                            <span className="td-brand-shape td-brand-shape-position-3">
                                <i className="fa-sharp fa-regular fa-plus fa-fw"></i>
                            </span>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-6">
                            <div className="td-brand-counter">
                                <h2 className="td-brand-counter-title" style={{ fontSize: '60px' }}
                                >
                                    <span
                                        data-purecounter-duration="1"
                                        data-purecounter-end="98"
                                        className="purecounter"
                                    >
                                        0
                                    </span>
                                    M
                                </h2>
                                <span className="td-brand-counter-pre">
                                    Projects recieved
                                </span>
                            </div>
                            <span className="td-brand-shape td-brand-shape-position-2">
                                <i className="fa-sharp fa-regular fa-plus fa-fw"></i>
                            </span>
                            <span className="td-brand-shape td-brand-shape-position-3">
                                <i className="fa-sharp fa-regular fa-plus fa-fw"></i>
                            </span>
                        </div>
                        <div class="col-md-6">
                            <div className="td-brand-counter">
                                <h2 className="td-brand-counter-title" style={{ fontSize: '60px' }}
                                >
                                    <span
                                        data-purecounter-duration="1"
                                        data-purecounter-end="336"
                                        className="purecounter"
                                    >
                                        0
                                    </span>
                                    M
                                </h2>
                                <span className="td-brand-counter-pre">
                                    Projects Completed
                                </span>
                            </div>
                            <span className="td-brand-shape td-brand-shape-position-2">
                                <i className="fa-sharp fa-regular fa-plus fa-fw"></i>
                            </span>
                            <span className="td-brand-shape td-brand-shape-position-3">
                                <i className="fa-sharp fa-regular fa-plus fa-fw"></i>
                            </span>
                        </div>
                    </div>
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
    )
}
export default Business;