import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Subscription.css"; // Create and copy your CSS here
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import thumbImage1 from "../../assets/img/expreance/01.jpg";
import thumbImage2 from "../../assets/img/expreance/02.jpg";
import thumbImage3 from "../../assets/img/expreance/03.jpg";
import thumbImage4 from "../../assets/img/expreance/04.jpg";
import startup from "../../assets/img/service/service2/startup.png";
import smallBusiness from "../../assets/img/service/service2/sbusiness.png";
import mediumBusiness from "../../assets/img/service/service2/mbusiness.png";
import largeBusiness from "../../assets/img/service/service2/lbusiness.png";
import startupW from "../../assets/img/service/service2/startup-w.png";
import smallBusinessW from "../../assets/img/service/service2/sbusiness-w.png";
import mediumBusinessW from "../../assets/img/service/service2/mbusiness-w.png";
import largeBusinessW from "../../assets/img/service/service2/lbusiness-w.png";

 const services = [
  {no:'01', name: "Accounting & Finance", price: 500, img: thumbImage1 },
  {no:'02', name: "Software Development & Maintenance", price: 700, img: thumbImage2 },
  {no:'03', name: "Human Resource", price: 300, img: thumbImage3 },
  {no:'04', name: "Content Creation & Branding", price: 600, img: thumbImage4 },
  {no:'05', name: "IT Support", price: 400, img: thumbImage3 },
];
const businessSizes = [
  { label: "Startup", hours: 5, icon_w: startupW, icon: startup  },
  { label: "Small Business", hours: 10, icon_w: smallBusinessW, icon: smallBusiness },
  { label: "Medium Business", hours: 15, icon_w: mediumBusinessW, icon: mediumBusiness },
  { label: "Enterprise", hours: 20, icon_w: largeBusinessW, icon: largeBusiness },
];

export const Subscriptions = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBusinessSize, setSelectedBusinessSize] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);


  const handleBusinessSizeClick = (size) => {
    setSelectedBusinessSize(size);
    setSelectedServices((prev) =>
      prev.map((s) => ({ ...s, hours: size.hours }))
    );
  };

  const goToStep = (nextStep, previousStep) => {
    if (nextStep === 2 && previousStep === 1 && selectedServices.length === 0) {
      Swal.fire("Required!", "Select at least one service to move forward", "error");
      return;
    }

    if (nextStep === 4 && selectedServices.length === 0) {
      Swal.fire("Required!", "Select at least one service to move forward", "error");
      return;
    }
    if (nextStep === 2 && previousStep === 3 && selectedServices.length === 0) {
      Swal.fire("Required!", "Select at least one service to move forward", "error");
      return;
    }

    setStep(nextStep);
  };

  const handleServiceClick = (service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.name === service.name);
      if (isSelected) {
        return prev.filter((s) => s.name !== service.name);
      } else {
        return [...prev, { ...service, hours: 1 }];
      }
    });
  };

  // Render summary
  const renderSummary = () => {
    return selectedServices.map((service) => (
      <tr key={service.name}>
        <td>{service.name}</td>
        <td>${service.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td>
          <input
            type="number"
            className="form-control"
            value={service.hours}
            min="1"
            onChange={(e) => updateServiceHours(service.name, e.target.value)}
          />
        </td>
        <td>${(service.price * service.hours).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td>
          <Button
            variant="danger"
            size="sm"
            onClick={() => removeService(service.name)}
          >
            Remove
          </Button>
        </td>
      </tr>
    ));
  };
  

  const updateServiceHours = (serviceName, hours) => {
    setSelectedServices((prev) =>
      prev.map((s) =>
        s.name === serviceName ? { ...s, hours: parseInt(hours || 0, 10) } : s
      )
    );
  };

  const removeService = (serviceName) => {
    setSelectedServices((prev) => prev.filter((s) => s.name !== serviceName));
  };

  const submitForm = () => {
    e.preventDefault();
    if (!businessName || !email) {
      Swal.fire("Required!", "Please fill out the required fields", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire("Invalid Email!", "Please enter a valid email address", "error");
      return;
    }

    Swal.fire({
      title: "Confirmation",
      text: "Are you sure all the information is correct?",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your details have been submitted.", "success");
      }
    });
  };

  return (
    <div className="stepsForm td-testimonial-area td-grey-bg pb-20 p-relative">
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      <div className="container-fluid d-none d-md-block d-lg-block d-xl-block d-sm-block">
        <div className="col-12">
          <div className="td-testimonial-bg-text text-center td-services-bg-text">
            <h2>Services</h2>
          </div>
        </div>
      </div>
      <form onSubmit={submitForm}>
        {step === 1 && (
          <div id="step-1" className="step-container container">
            <h1 className="text-center">Select Services</h1>
            <div className="pt-50 pb-60">
              <div className="row">
              {services.map((service) => (
                <div
                className="col-lg-12  wow fadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
                key={service.name}
              >
                <div className="td-expreance-content-wrap p-relative">
                  <div className="td-expreance-thumb" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${service.img})`}}>
                    {/* <img className="w-100" src={service.img} alt={service.name} /> */}
                  </div>
                  <div className="td-expreance-item" >
                    <div className="row">
                      <div className="col-lg-6 mb-30">
                        <div className="td-expreance-content">
                          <p className="td-expreance-title-pre">
                            Business, Finance <span>/</span> June 21, 2024
                          </p>
                          <h3 className="td-expreance-title">
                            <span>{service.no}</span>
                            <button
                            type="button"
                            onClick={() => handleServiceClick(service)}
                            className="text-start"
                          >
                            {service.name}
                          </button>
                          </h3>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-30">
                        <div className="td-expreance-btn-wrap">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknow.
                          </p>
                          <div className="td-expreance-btn">
                            <button type="button" onClick={() => handleServiceClick(service)}>
                              <svg
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M25 50C38.8235 50 50 38.8235 50 25C50 11.1765 38.8235 0 25 0C11.1765 0 0 11.1765 0 25C0 38.8235 11.1765 50 25 50ZM25 2.94118C37.2059 2.94118 47.0588 12.7941 47.0588 25C47.0588 37.2059 37.2059 47.0588 25 47.0588C12.7941 47.0588 2.94118 37.2059 2.94118 25C2.94118 12.7941 12.7941 2.94118 25 2.94118Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M24.5585 39.2638L38.8232 24.9991L24.5585 10.7344L22.4997 12.7932L34.7056 24.9991L22.4997 37.205L24.5585 39.2638Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M36.7646 23.5293H11.7646V26.4705H36.7646V23.5293Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              ))}
              </div>
            </div>

            {/* navigation */}
            <div className="td-portfolio-navigation">
              <div className="row align-items-center">
                <div className="col-sm-5 mb-30">

                </div>
                <div className="col-sm-2 mb-30">
                </div>
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left text-right">
                    <Link to="#" onClick={() => goToStep(2, 1)}>
                      <span className="td-portfolio-more-content mr-20">
                        Next
                      </span>
                      <div className="td-portfolio-more-icon">
                        <i className="fa-regular fa-arrow-right-long"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>


            {/* <div className="container">
              <div className="row">
                <div
                  className="col-lg-12 wow fadeInUp"
                  data-wow-delay=".3s"
                  data-wow-duration="1s"
                >
                  <div className="td-expreance-content-wrap p-relative">
                    <div className="td-expreance-thumb">
                      <img className="w-100" src={thumbImage2} alt="thumb" />
                    </div>
                    <div className="td-expreance-item">
                      <div className="row">
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-content">
                            <p className="td-expreance-title-pre">
                              Business, Finance <span>/</span> June 21, 2024
                            </p>
                            <h3 className="td-expreance-title">
                              <span>01</span>Startup investment
                            </h3>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-btn-wrap">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s,
                              when an unknow.
                            </p>
                            <div className="td-expreance-btn">
                              <a href="#">
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M25 50C38.8235 50 50 38.8235 50 25C50 11.1765 38.8235 0 25 0C11.1765 0 0 11.1765 0 25C0 38.8235 11.1765 50 25 50ZM25 2.94118C37.2059 2.94118 47.0588 12.7941 47.0588 25C47.0588 37.2059 37.2059 47.0588 25 47.0588C12.7941 47.0588 2.94118 37.2059 2.94118 25C2.94118 12.7941 12.7941 2.94118 25 2.94118Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M24.5585 39.2638L38.8232 24.9991L24.5585 10.7344L22.4997 12.7932L34.7056 24.9991L22.4997 37.205L24.5585 39.2638Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M36.7646 23.5293H11.7646V26.4705H36.7646V23.5293Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-12 wow fadeInUp"
                  data-wow-delay=".4s"
                  data-wow-duration="1s"
                >
                  <div className="td-expreance-content-wrap p-relative">
                    <div className="td-expreance-thumb">
                      <img className="w-100" src={thumbImage1} alt="thumb" />
                    </div>
                    <div className="td-expreance-item">
                      <div className="row">
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-content">
                            <p className="td-expreance-title-pre">
                              Business, Finance <span>/</span> June 21, 2024
                            </p>
                            <h3 className="td-expreance-title">
                              <span>02</span>Cryptocurrency investment
                            </h3>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-btn-wrap">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s,
                              when an unknow.
                            </p>
                            <div className="td-expreance-btn">
                              <a href="#">
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M25 50C38.8235 50 50 38.8235 50 25C50 11.1765 38.8235 0 25 0C11.1765 0 0 11.1765 0 25C0 38.8235 11.1765 50 25 50ZM25 2.94118C37.2059 2.94118 47.0588 12.7941 47.0588 25C47.0588 37.2059 37.2059 47.0588 25 47.0588C12.7941 47.0588 2.94118 37.2059 2.94118 25C2.94118 12.7941 12.7941 2.94118 25 2.94118Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M24.5585 39.2638L38.8232 24.9991L24.5585 10.7344L22.4997 12.7932L34.7056 24.9991L22.4997 37.205L24.5585 39.2638Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M36.7646 23.5293H11.7646V26.4705H36.7646V23.5293Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-12 wow fadeInUp"
                  data-wow-delay=".5s"
                  data-wow-duration="1s"
                >
                  <div className="td-expreance-content-wrap p-relative">
                    <div className="td-expreance-thumb">
                      <img className="w-100" src={thumbImage3} alt="thumb" />
                    </div>
                    <div className="td-expreance-item">
                      <div className="row">
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-content">
                            <p className="td-expreance-title-pre">
                              Business, Finance <span>/</span> June 21, 2024
                            </p>
                            <h3 className="td-expreance-title">
                              <span>03</span>Business development
                            </h3>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-btn-wrap">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s,
                              when an unknow.
                            </p>
                            <div className="td-expreance-btn">
                              <a href="#">
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M25 50C38.8235 50 50 38.8235 50 25C50 11.1765 38.8235 0 25 0C11.1765 0 0 11.1765 0 25C0 38.8235 11.1765 50 25 50ZM25 2.94118C37.2059 2.94118 47.0588 12.7941 47.0588 25C47.0588 37.2059 37.2059 47.0588 25 47.0588C12.7941 47.0588 2.94118 37.2059 2.94118 25C2.94118 12.7941 12.7941 2.94118 25 2.94118Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M24.5585 39.2638L38.8232 24.9991L24.5585 10.7344L22.4997 12.7932L34.7056 24.9991L22.4997 37.205L24.5585 39.2638Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M36.7646 23.5293H11.7646V26.4705H36.7646V23.5293Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-12 wow fadeInUp"
                  data-wow-delay=".6s"
                  data-wow-duration="1s"
                >
                  <div className="td-expreance-content-wrap p-relative">
                    <div className="td-expreance-thumb">
                      <img className="w-100" src={thumbImage2} alt="thumb" />
                    </div>
                    <div className="td-expreance-item">
                      <div className="row">
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-content">
                            <p className="td-expreance-title-pre">
                              Business, Finance <span>/</span> June 21, 2024
                            </p>
                            <h3 className="td-expreance-title">
                              <span>04</span>Market compliance
                            </h3>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-btn-wrap">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s,
                              when an unknow.
                            </p>
                            <div className="td-expreance-btn">
                              <a href="#">
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M25 50C38.8235 50 50 38.8235 50 25C50 11.1765 38.8235 0 25 0C11.1765 0 0 11.1765 0 25C0 38.8235 11.1765 50 25 50ZM25 2.94118C37.2059 2.94118 47.0588 12.7941 47.0588 25C47.0588 37.2059 37.2059 47.0588 25 47.0588C12.7941 47.0588 2.94118 37.2059 2.94118 25C2.94118 12.7941 12.7941 2.94118 25 2.94118Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M24.5585 39.2638L38.8232 24.9991L24.5585 10.7344L22.4997 12.7932L34.7056 24.9991L22.4997 37.205L24.5585 39.2638Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M36.7646 23.5293H11.7646V26.4705H36.7646V23.5293Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-12 wow fadeInUp"
                  data-wow-delay=".7s"
                  data-wow-duration="1s"
                >
                  <div className="td-expreance-content-wrap p-relative">
                    <div className="td-expreance-thumb">
                      <img className="w-100" src={thumbImage4} alt="thumb" />
                    </div>
                    <div className="td-expreance-item">
                      <div className="row">
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-content">
                            <p className="td-expreance-title-pre">
                              Business, Finance <span>/</span> June 21, 2024
                            </p>
                            <h3 className="td-expreance-title">
                              <span>05</span>Business transformation
                            </h3>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                          <div className="td-expreance-btn-wrap">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the 1500s,
                              when an unknow.
                            </p>
                            <div className="td-expreance-btn">
                              <a href="#">
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M25 50C38.8235 50 50 38.8235 50 25C50 11.1765 38.8235 0 25 0C11.1765 0 0 11.1765 0 25C0 38.8235 11.1765 50 25 50ZM25 2.94118C37.2059 2.94118 47.0588 12.7941 47.0588 25C47.0588 37.2059 37.2059 47.0588 25 47.0588C12.7941 47.0588 2.94118 37.2059 2.94118 25C2.94118 12.7941 12.7941 2.94118 25 2.94118Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M24.5585 39.2638L38.8232 24.9991L24.5585 10.7344L22.4997 12.7932L34.7056 24.9991L22.4997 37.205L24.5585 39.2638Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M36.7646 23.5293H11.7646V26.4705H36.7646V23.5293Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        )}
        {step === 2 && (
          <div id="step-2" className="step-container container">
            <h1 className="text-center">Select Business Size</h1>
            <div className="row pt-70 pb-60">
                <div className="col-lg-12">
                  <div className="price-tab-content">
                    <div
                        className="tab-pane fade show"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                        tabIndex="0"
                        >
                        <div className="row">
                        {businessSizes.map((size) => (
                          <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
                            <div className={`td-pricing-wrap business-card ${selectedBusinessSize?.label === size.label ? "active td-pricing-wrap-2" : ""}`}
                                key={size.label}>
                              <div className="td-pricing-content text-center">
                                <div className="td-pricing-icon mb-40">
                                  <span>
                                    <img src={selectedBusinessSize?.label === size.label ? size.icon_w : size.icon} alt="" width="100px"/>
                                  </span>
                                </div>
                                <div className="td-pricing-tag mb-30">
                                  <h5 className="mb-10">{size.label}</h5>
                                  <span>{size.hours} Hours</span>
                                </div>
                                <div className="td-pricing-price mb-50">
                                  <h2 className="mb-30">$99<span>/Hour</span></h2>
                                  <p>
                                    Plus Anual Financial Audit Free for <br />
                                    One-Time
                                  </p>
                                </div>
                                <div className="td-pricing-btn td-pricing-btn-2">
                                  <button type="button" onClick={() => handleBusinessSizeClick(size)}>{selectedBusinessSize?.label === size.label ? "Selected" : "Select"}</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        </div>
                    </div>
                  </div>
                </div>
            </div>
            {/* navigation */}
            <div className="td-portfolio-navigation pb-110">
              <div className="row align-items-center">
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left">
                    <Link to="#" onClick={() => goToStep(1, 2)}>
                      <div className="td-portfolio-more-icon">
                        <i className="fa-solid fa-arrow-left-long"></i>
                      </div>
                      <span className="td-portfolio-more-content ml-20">
                        Prev
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-2 mb-30">
                </div>
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left text-right">
                    <Link to="#" onClick={() => goToStep(3, 2)}>
                      <span className="td-portfolio-more-content mr-20">
                        Next
                      </span>
                      <div className="td-portfolio-more-icon">
                        <i className="fa-regular fa-arrow-right-long"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div id="step-3" className="step-container container">
            <h1 className="text-center">Summary</h1>
            <div className="row pt-70 pb-60">
              <div className="col-lg-12">
                <Table striped bordered hover responsive className="styled-table">
                  <thead className="thead-dark">
                    <tr>
                      <th>Service</th>
                      <th>Price per Hour</th>
                      <th>Hours</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>{renderSummary()}</tbody>
                </Table>
              </div>
            </div>
            {/* navigation */}
            <div className="td-portfolio-navigation">
              <div className="row align-items-center">
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left">
                    <Link to="#" onClick={() => goToStep(2, 3)}>
                      <div className="td-portfolio-more-icon">
                        <i className="fa-solid fa-arrow-left-long"></i>
                      </div>
                      <span className="td-portfolio-more-content ml-20">
                        Prev Post
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-2 mb-30">
                </div>
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left text-right">
                    <Link to="#" onClick={() => goToStep(4, 3)}>
                      <span className="td-portfolio-more-content mr-20">
                        Next
                      </span>
                      <div className="td-portfolio-more-icon">
                        <i className="fa-regular fa-arrow-right-long"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div id="step-4" className="step-container container">
            <h1>Confirmation & Additional Info</h1>
            <div>
              <label>Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div>
              <label>Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* navigation */}
            <div className="td-portfolio-navigation pb-110">
              <div className="row align-items-center">
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left">
                    <Link to="#" onClick={() => goToStep(3, 4)}>
                      <div className="td-portfolio-more-icon">
                        <i className="fa-solid fa-arrow-left-long"></i>
                      </div>
                      <span className="td-portfolio-more-content ml-20">
                        Prev Post
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-2 mb-30">
                </div>
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left text-right">
                    <Link to="#" onClick={submitForm()}>
                      <span className="td-portfolio-more-content mr-20">
                        Next
                      </span>
                      <div className="td-portfolio-more-icon">
                        <i className="fa-regular fa-arrow-right-long"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// export default Subscription;
