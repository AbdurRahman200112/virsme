import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
import "./Subscription.css"; // Create and copy your CSS here
import Swal from "sweetalert2";
import bgImage from "../../assets/img/expreance/bg2.jpg";
import thumbImage1 from "../../assets/img/expreance/01.jpg";
import thumbImage2 from "../../assets/img/expreance/02.jpg";
import thumbImage3 from "../../assets/img/expreance/03.jpg";
import thumbImage4 from "../../assets/img/expreance/04.jpg";

export const services = [
  {no:'01', name: "Accounting & Finance", price: 500, img: thumbImage1 },
  {no:'02', name: "Software Development & Maintenance", price: 700, img: thumbImage2 },
  {no:'03', name: "Human Resource", price: 300, img: thumbImage3 },
  {no:'04', name: "Content Creation & Branding", price: 600, img: thumbImage4 },
  {no:'05', name: "IT Support", price: 400, img: thumbImage3 },
];

export const Subscriptions = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const businessSizes = [
    { label: "Startup", hours: 5 },
    { label: "Small Business", hours: 10 },
    { label: "Medium Business", hours: 15 },
    { label: "Enterprise", hours: 20 },
  ];

  const [selectedBusinessSize, setSelectedBusinessSize] = useState(null);

  const handleBusinessSizeClick = (size) => {
    setSelectedBusinessSize(size);
    setSelectedServices((prev) =>
      prev.map((s) => ({ ...s, hours: size.hours }))
    );
  };

  const goToStep = (nextStep, previousStep) => {
    if (nextStep === 2 && selectedServices.length === 0) {
      Swal.fire("Required!", "Select at least one service to move forward", "error");
      return;
    }

    if (nextStep === 4 && selectedServices.length === 0) {
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

  const renderSummary = () => {
    return selectedServices.map((service) => (
      <tr key={service.name}>
        <td>{service.name}</td>
        <td>${service.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td>
          <input
            type="number"
            value={service.hours}
            min="1"
            onChange={(e) => updateServiceHours(service.name, e.target.value)}
          />
        </td>
        <td>${(service.price * service.hours).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td>
          <button onClick={() => removeService(service.name)}>Remove</button>
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

  const submitForm = (e) => {
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
    <div className="stepsForm td-testimonial-area td-grey-bg pb-140 p-relative">
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      <div className="container-fluid d-none d-md-block">
        <div className="col-12">
          <div className="td-testimonial-bg-text text-center td-services-bg-text">
            <h2>Services</h2>
          </div>
        </div>
      </div>
      <form onSubmit={submitForm}>
        {step === 1 && (
          <div id="step-1" className="container">
            <h1 className="text-center">Select Services</h1>
            <div className="pt-70 pb-60">
              <div className="row">
              {services.map((service) => (
                <div
                className="col-lg-12  wow fadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
                key={service.name}
              >
                <div className="td-expreance-content-wrap p-relative">
                  <div className="td-expreance-thumb">
                    <img className="w-100" src={service.img} alt={service.name} />
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
            <div className="td-portfolio-navigation pb-110">
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
          <div id="step-2" className="container">
            <h1 className="text-center">Select Business Size</h1>
            <div className="pt-70 pb-60">
              {/* {businessSizes.map((size) => (
                <button
                  type="button"
                  key={size.label}
                  className={`business-card ${selectedBusinessSize?.label === size.label ? "active" : ""
                    }`}
                  onClick={() => handleBusinessSizeClick(size)}
                >
                  <h4>{size.label}</h4>
                  <p>{size.hours} Hours</p>
                </button>
              ))} */}
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
            <div className="row">
              <div className="col-lg-12">
                <div className="price-tab-content">
                    <div
                      className="tab-pane fade show"
                      // id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                      tabIndex="0"
                    >
                      <div className="row">
                        <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
                          <div className="td-pricing-wrap">
                            <div className="td-pricing-content text-center">
                              <div className="td-pricing-icon mb-40">
                                <span>
                                  <svg
                                    width="80"
                                    height="80"
                                    viewBox="0 0 80 80"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      opacity="0.3"
                                      clipPath="url(#clip0_335_2248)"
                                    >
                                      <path
                                        d="M58.6641 24.2336C61.6234 20.7084 72.3468 7.93057 75.4235 4.21399C76.2628 3.19986 76.2193 1.9497 75.3068 0.869678C75.2602 0.814456 75.2089 0.763191 75.1535 0.716398C74.0734 -0.19589 72.823 -0.239242 71.8094 0.599932C68.0923 3.6769 55.3129 14.4021 51.79 17.3593L50.4944 16.0639L59.6622 6.89614C60.0312 6.52713 60.1415 5.97216 59.9418 5.49012C59.7422 5.00792 59.2715 4.69361 58.7497 4.69361C44.1193 4.69361 30.3646 10.391 20.0193 20.7363C9.67393 31.0816 3.97656 44.8363 3.97656 59.4668C3.97656 61.4574 4.08425 63.4454 4.2974 65.4177C4.29843 65.4303 4.29981 65.4429 4.30119 65.4554C4.5195 67.462 4.84705 69.4521 5.2828 71.4113C5.41647 72.0126 5.9496 72.4217 6.54105 72.4217C6.63377 72.4217 6.72805 72.4115 6.82232 72.3907C7.51802 72.2361 7.95653 71.5467 7.8017 70.851C7.49221 69.46 7.24001 68.0524 7.04545 66.6344C12.9709 66.949 16.9858 69.1579 21.5789 71.688C28.3023 75.3911 36.6697 80.0001 54.0275 80.0001C54.7402 80.0001 55.3177 79.4224 55.3177 78.7098C55.3177 72.1196 52.1857 67.7151 48.8699 63.0518C46.0601 59.1004 43.1547 55.0144 42.0494 49.246C41.9154 48.5462 41.2393 48.0872 40.5394 48.2216C39.8396 48.3558 39.381 49.0317 39.515 49.7317C40.7263 56.052 43.9355 60.5652 46.767 64.5473C49.7239 68.7058 52.3089 72.3407 52.6894 77.4103C36.9158 77.1897 29.4408 73.0721 22.8241 69.4276C18.0421 66.7937 13.5096 64.2994 6.75609 64.038C6.62431 62.5202 6.55687 60.9943 6.55687 59.4668C6.55687 31.7662 28.2477 9.03657 55.5369 7.37198L47.7571 15.1516C47.2532 15.6555 47.2532 16.4725 47.7571 16.9762L52.1632 21.3823C52.6672 21.8862 53.484 21.8862 53.9879 21.3823C54.4918 20.8784 54.4918 20.0614 53.9879 19.5577L53.6211 19.1909C57.331 16.0766 69.5542 5.81922 73.3424 2.68049C69.6452 7.14352 56.0654 23.3158 55.9274 23.4801C55.497 23.9925 55.5298 24.749 56.0029 25.2221L71.94 41.159C72.5688 41.7879 72.9152 42.6242 72.9152 43.5136C72.9152 44.403 72.5688 45.2392 71.94 45.8682C70.6413 47.1667 68.5291 47.1663 67.2304 45.8682C67.0594 45.697 66.8437 45.5776 66.608 45.5232L51.7802 42.1062C51.4773 42.0365 51.1592 42.0783 50.8843 42.2245C45.9825 44.8334 40.0481 43.9459 36.1179 40.0158C32.1357 36.0336 31.2949 29.837 34.0736 24.9468C34.4258 24.3271 34.2088 23.5396 33.5893 23.1874C32.9699 22.8353 32.1821 23.0524 31.8301 23.6719C28.4793 29.5685 29.4924 37.0398 34.2931 41.8404C36.6312 44.1783 39.5929 45.6585 42.8583 46.1209C45.8515 46.5444 48.9566 46.0497 51.6582 44.7264L65.6911 47.9601C66.8017 48.9341 68.1935 49.4212 69.585 49.4212C71.0987 49.4212 72.6123 48.845 73.7646 47.6929C74.8809 46.5766 75.4957 45.0923 75.4957 43.5136C75.4957 41.9348 74.8809 40.4505 73.7646 39.3344L58.6641 24.2336Z"
                                        fill="#20282D"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_335_22488">
                                        <rect width="80" height="80" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </span>
                              </div>
                              <div className="td-pricing-tag mb-30">
                                <h5 className="mb-10">Startup</h5>
                                <span>5 Hours</span>
                              </div>
                              <div className="td-pricing-price mb-50">
                                <h2 className="mb-30">$99<span>/Hour</span></h2>
                                <p>
                                  Plus Anual Financial Audit Free for <br />
                                  One-Time
                                </p>
                              </div>
                              <div className="td-pricing-btn td-pricing-btn-2">
                                <Link to="/contact">Get Started</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
                          <div className="td-pricing-wrap td-pricing-wrap-2 p-relative">
                            <span className="td-pricing-badge">Best Choice</span>
                            <div className="td-pricing-content text-center">
                              <div className="td-pricing-icon mb-40">
                                <span>
                                  <svg
                                    width="92"
                                    height="80"
                                    viewBox="0 0 92 80"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M84.1958 14.0004H61.9792V7.57024C61.9792 6.25526 61.355 4.99417 60.3092 4.1965C60.0507 3.9994 58.6356 2.96566 56.1577 1.96981C55.1097 1.54874 54 1.18815 52.8586 0.898361C52.1435 0.716376 51.4156 1.14919 51.2338 1.86485C51.0521 2.58034 51.4848 3.30775 52.2004 3.48955C53.2269 3.75034 54.2229 4.07375 55.1608 4.45053C57.4024 5.35138 58.6368 6.28337 58.6882 6.3225C59.075 6.61745 59.3059 7.08371 59.3059 7.57007V14.0004H56.1684V9.21576C56.1684 8.71339 55.8867 8.25336 55.4392 8.02494C53.8187 7.19827 50.3785 5.81124 45.5403 5.81124C40.7021 5.81124 37.2619 7.19809 35.6414 8.02494C35.1939 8.25336 34.9123 8.71321 34.9123 9.21576V14.0006H31.7746V7.57024C31.7746 7.08406 32.0053 6.61763 32.3924 6.32268C32.4438 6.28337 33.6775 5.35174 35.9197 4.45053C38.8126 3.288 42.1393 2.67356 45.5403 2.67356C46.1083 2.67356 46.684 2.69099 47.2513 2.72568C47.9885 2.77069 48.6221 2.20943 48.667 1.4726C48.7118 0.735766 48.1509 0.101933 47.4139 0.0569258C46.7927 0.0192124 46.1622 0 45.5403 0C41.801 0 38.1294 0.681153 34.9226 1.96981C32.444 2.96601 31.0294 3.99957 30.7709 4.19668C29.7252 4.994 29.101 6.25508 29.101 7.57007V14.0004H6.88553C3.08876 14.0004 0 17.0891 0 20.8857V39.5956C0 41.5649 0.830227 43.4134 2.28735 44.7195V73.1145C2.28735 76.9111 5.37611 79.9998 9.17271 79.9998H61.9913C62.7298 79.9998 63.3282 79.4012 63.3282 78.663C63.3282 77.9247 62.7298 77.3261 61.9913 77.3261H9.17288C6.85049 77.3261 4.96109 75.4367 4.96109 73.1143V46.7073C6.89852 47.9897 9.53579 49.4593 12.9917 50.8476C13.6763 51.1224 14.4552 50.7906 14.7306 50.1054C15.0058 49.4203 14.6733 48.6419 13.9885 48.3667C9.0923 46.4001 5.97792 44.2885 4.22745 42.8632C3.23997 42.0595 2.67373 40.8685 2.67373 39.5958V20.8857C2.67373 18.5633 4.56314 16.6739 6.88553 16.6739H84.196C86.5184 16.6739 88.4078 18.5633 88.4078 20.8857V39.5956C88.4078 40.8683 87.8415 42.0593 86.854 42.863C84.855 44.4904 81.2604 46.8729 75.4867 48.982C68.8495 51.4063 60.9775 52.8722 52.0743 53.3477V50.2952C52.0743 48.5382 50.6449 47.1088 48.8881 47.1088H42.1922C40.4351 47.1088 39.0057 48.5382 39.0057 50.2952V53.3496C31.8078 52.9645 25.25 51.9249 19.495 50.255C18.7866 50.0499 18.0444 50.4573 17.8386 51.1664C17.6328 51.8754 18.0409 52.6169 18.7499 52.8227C24.7387 54.5604 31.5481 55.6361 39.0057 56.026V56.6547C39.0057 60.2578 41.9371 63.1889 45.5401 63.1889C49.143 63.1889 52.0743 60.2578 52.0743 56.6547V56.0266C70.1515 55.085 80.6143 50.3738 86.1202 46.7126V73.1145C86.1202 75.4369 84.2308 77.3263 81.9084 77.3263H67.3386C66.6002 77.3263 66.0018 77.9249 66.0018 78.6631C66.0018 79.4014 66.6002 80 67.3386 80H81.9084C85.705 80 88.7938 76.9112 88.7938 73.1146V44.7195C90.2511 43.4134 91.0811 41.5649 91.0811 39.5958V20.8857C91.0813 17.0891 87.9926 14.0004 84.1958 14.0004ZM37.5858 10.0608C39.1799 9.35825 41.8954 8.48479 45.5401 8.48479C49.1848 8.48479 51.9003 9.35825 53.4944 10.0608V14.0004H37.5856V10.0608H37.5858ZM49.4008 56.6549C49.4008 58.7837 47.669 60.5155 45.5401 60.5155C43.4113 60.5155 41.6793 58.7837 41.6793 56.6549V50.2952C41.6793 50.0124 41.9095 49.7823 42.1922 49.7823H48.8881C49.1707 49.7823 49.4008 50.0124 49.4008 50.2952V56.6549Z"
                                      fill="white"
                                    />
                                  </svg>
                                </span>
                              </div>
                              <div className="td-pricing-tag mb-30">
                                <h5 className="mb-10">Professional</h5>
                                <span>1-19 Employees</span>
                              </div>
                              <div className="td-pricing-price mb-50">
                                <h2 className="mb-30">$699</h2>
                                <p>
                                  Plus Anual Financial Audit Free for <br />
                                  One-Time
                                </p>
                              </div>
                              <div className="td-pricing-btn">
                                <Link to="/contact">Get Started</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
                          <div className="td-pricing-wrap">
                            <div className="td-pricing-content text-center">
                              <div className="td-pricing-icon mb-40">
                                <span>
                                  <svg
                                    width="80"
                                    height="81"
                                    viewBox="0 0 80 81"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      opacity="0.3"
                                      clipPath="url(#clip0_335_2258)"
                                    >
                                      <path
                                        d="M80.1407 40.927C80.1407 40.4686 79.8746 40.053 79.4584 39.8619L58.9554 30.4368L79.4584 21.0118C80.3464 20.6034 80.347 19.2906 79.4584 18.8823L40.6301 1.03309C40.3103 0.886605 39.9417 0.890877 39.6261 1.0453L36.1099 2.76405C34.7549 3.42628 35.7748 5.53566 37.1395 4.86977L40.1559 3.39516L46.7764 6.43838L40.0961 9.50967L31.4883 5.56435C31.058 5.36721 30.6686 5.19326 30.1986 5.4081L0.823518 18.8823C-0.0651557 19.29 -0.0663762 20.6034 0.822908 21.0118L21.3259 30.4375L17.3073 32.2844C15.9365 32.9143 16.9075 35.0481 18.2863 34.4139L24.0676 31.7564C24.0883 31.7473 24.1079 31.7357 24.1274 31.7253L39.6511 38.8609C39.96 39.0032 40.3219 39.0032 40.6301 38.8609L56.1496 31.7271L76.1631 40.927L40.1406 57.4859L4.11759 40.927L11.9985 37.3039C13.3693 36.674 12.3995 34.5396 11.0201 35.1744L0.822298 39.8619C-0.0651556 40.2702 -0.0663762 41.5831 0.822298 41.9914L21.3259 51.4165L0.822298 60.8416C-0.0651556 61.2499 -0.0663762 62.5628 0.822298 62.9711L39.6511 80.8203C39.9594 80.9619 40.3219 80.9619 40.6301 80.8203L47.3489 77.7313C48.7191 77.1014 47.7499 74.967 46.3699 75.6018L40.1406 78.4655L4.11759 61.9067L24.1317 52.7062L39.6511 59.8406C39.9594 59.9822 40.3219 59.9822 40.6301 59.8406L56.2198 52.6738C56.3083 52.7562 56.4108 52.8264 56.5262 52.8795L76.1631 61.906L54.0262 72.0825C52.6553 72.713 53.6264 74.8461 55.0052 74.212L79.4584 62.9711C80.3464 62.5628 80.347 61.2499 79.4584 60.8416L58.9554 51.4165L79.4584 41.9914C79.8746 41.8004 80.1407 41.3848 80.1407 40.927ZM49.5822 32.166L42.9464 29.1154L50.2395 25.7628L56.8515 28.8243L49.5822 32.166ZM23.4371 28.828L30.0735 25.7774L37.3348 29.1154L30.6985 32.166L23.4371 28.828ZM13.5591 24.2875L20.1955 21.237L27.2677 24.4877L20.6313 27.5383L13.5591 24.2875ZM20.9804 12.2148L27.5716 15.2665L20.1955 18.6576L13.572 15.6126L20.9804 12.2148ZM30.367 16.5611L37.4136 19.824L30.0735 23.1981L23.0013 19.9473L30.367 16.5611ZM66.7215 15.6071L60.0711 18.6644L52.7987 15.3312L59.4601 12.2691L66.7215 15.6071ZM57.2623 19.9553L50.2432 23.1816L43.0081 19.8314L49.9899 16.6221L57.2623 19.9553ZM59.6506 27.5377L53.0392 24.4761L60.0723 21.2431L66.7178 24.2888L59.6506 27.5377ZM40.2127 18.5368L33.1661 15.2745L40.0973 12.0878L47.1798 15.3343L40.2127 18.5368ZM32.8793 24.4877L40.209 21.118L47.4441 24.4682L40.1406 27.8258L32.8793 24.4877ZM69.5267 22.9979L62.8806 19.9522L69.5273 16.8968L76.1631 19.9473L69.5267 22.9979ZM49.5822 7.72805L56.6543 10.9794L49.9887 14.0434L42.9061 10.7969L49.5822 7.72805ZM30.3707 13.9799L23.7826 10.9294L30.6734 7.76895L37.2872 10.8006L30.3707 13.9799ZM10.7637 16.901L17.3897 19.9473L10.7534 22.9979L4.12004 19.9485L10.7637 16.901ZM40.1406 36.5062L33.5043 33.4557L40.1406 30.4051L46.7764 33.4557L40.1406 36.5062Z"
                                        fill="#20282D"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_335_2258">
                                        <rect
                                          width="80"
                                          height="80"
                                          fill="white"
                                          transform="translate(0 0.92627)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </span>
                              </div>
                              <div className="td-pricing-tag mb-30">
                                <h5 className="mb-10">Business</h5>
                                <span>Unlimited Employees</span>
                              </div>
                              <div className="td-pricing-price mb-50">
                                <h2 className="mb-30">$1500</h2>
                                <p>
                                  Plus Anual Financial Audit Free for <br />
                                  One-Time
                                </p>
                              </div>
                              <div className="td-pricing-btn td-pricing-btn-2">
                                <Link to="/contact">Get Started</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
                          <div className="td-pricing-wrap">
                            <div className="td-pricing-content text-center">
                              <div className="td-pricing-icon mb-40">
                                <span>
                                  <svg
                                    width="80"
                                    height="81"
                                    viewBox="0 0 80 81"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      opacity="0.3"
                                      clipPath="url(#clip0_335_2258)"
                                    >
                                      <path
                                        d="M80.1407 40.927C80.1407 40.4686 79.8746 40.053 79.4584 39.8619L58.9554 30.4368L79.4584 21.0118C80.3464 20.6034 80.347 19.2906 79.4584 18.8823L40.6301 1.03309C40.3103 0.886605 39.9417 0.890877 39.6261 1.0453L36.1099 2.76405C34.7549 3.42628 35.7748 5.53566 37.1395 4.86977L40.1559 3.39516L46.7764 6.43838L40.0961 9.50967L31.4883 5.56435C31.058 5.36721 30.6686 5.19326 30.1986 5.4081L0.823518 18.8823C-0.0651557 19.29 -0.0663762 20.6034 0.822908 21.0118L21.3259 30.4375L17.3073 32.2844C15.9365 32.9143 16.9075 35.0481 18.2863 34.4139L24.0676 31.7564C24.0883 31.7473 24.1079 31.7357 24.1274 31.7253L39.6511 38.8609C39.96 39.0032 40.3219 39.0032 40.6301 38.8609L56.1496 31.7271L76.1631 40.927L40.1406 57.4859L4.11759 40.927L11.9985 37.3039C13.3693 36.674 12.3995 34.5396 11.0201 35.1744L0.822298 39.8619C-0.0651556 40.2702 -0.0663762 41.5831 0.822298 41.9914L21.3259 51.4165L0.822298 60.8416C-0.0651556 61.2499 -0.0663762 62.5628 0.822298 62.9711L39.6511 80.8203C39.9594 80.9619 40.3219 80.9619 40.6301 80.8203L47.3489 77.7313C48.7191 77.1014 47.7499 74.967 46.3699 75.6018L40.1406 78.4655L4.11759 61.9067L24.1317 52.7062L39.6511 59.8406C39.9594 59.9822 40.3219 59.9822 40.6301 59.8406L56.2198 52.6738C56.3083 52.7562 56.4108 52.8264 56.5262 52.8795L76.1631 61.906L54.0262 72.0825C52.6553 72.713 53.6264 74.8461 55.0052 74.212L79.4584 62.9711C80.3464 62.5628 80.347 61.2499 79.4584 60.8416L58.9554 51.4165L79.4584 41.9914C79.8746 41.8004 80.1407 41.3848 80.1407 40.927ZM49.5822 32.166L42.9464 29.1154L50.2395 25.7628L56.8515 28.8243L49.5822 32.166ZM23.4371 28.828L30.0735 25.7774L37.3348 29.1154L30.6985 32.166L23.4371 28.828ZM13.5591 24.2875L20.1955 21.237L27.2677 24.4877L20.6313 27.5383L13.5591 24.2875ZM20.9804 12.2148L27.5716 15.2665L20.1955 18.6576L13.572 15.6126L20.9804 12.2148ZM30.367 16.5611L37.4136 19.824L30.0735 23.1981L23.0013 19.9473L30.367 16.5611ZM66.7215 15.6071L60.0711 18.6644L52.7987 15.3312L59.4601 12.2691L66.7215 15.6071ZM57.2623 19.9553L50.2432 23.1816L43.0081 19.8314L49.9899 16.6221L57.2623 19.9553ZM59.6506 27.5377L53.0392 24.4761L60.0723 21.2431L66.7178 24.2888L59.6506 27.5377ZM40.2127 18.5368L33.1661 15.2745L40.0973 12.0878L47.1798 15.3343L40.2127 18.5368ZM32.8793 24.4877L40.209 21.118L47.4441 24.4682L40.1406 27.8258L32.8793 24.4877ZM69.5267 22.9979L62.8806 19.9522L69.5273 16.8968L76.1631 19.9473L69.5267 22.9979ZM49.5822 7.72805L56.6543 10.9794L49.9887 14.0434L42.9061 10.7969L49.5822 7.72805ZM30.3707 13.9799L23.7826 10.9294L30.6734 7.76895L37.2872 10.8006L30.3707 13.9799ZM10.7637 16.901L17.3897 19.9473L10.7534 22.9979L4.12004 19.9485L10.7637 16.901ZM40.1406 36.5062L33.5043 33.4557L40.1406 30.4051L46.7764 33.4557L40.1406 36.5062Z"
                                        fill="#20282D"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_335_2258">
                                        <rect
                                          width="80"
                                          height="80"
                                          fill="white"
                                          transform="translate(0 0.92627)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </span>
                              </div>
                              <div className="td-pricing-tag mb-30">
                                <h5 className="mb-10">Business</h5>
                                <span>Unlimited Employees</span>
                              </div>
                              <div className="td-pricing-price mb-50">
                                <h2 className="mb-30">$1500</h2>
                                <p>
                                  Plus Anual Financial Audit Free for <br />
                                  One-Time
                                </p>
                              </div>
                              <div className="td-pricing-btn td-pricing-btn-2">
                                <Link to="/contact">Get Started</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div id="step-3">
            <h1>Summary</h1>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Price per Hour</th>
                  <th>Hours</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{renderSummary()}</tbody>
            </table>
            {/* navigation */}
            <div className="td-portfolio-navigation pb-110">
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
          <div id="step-4">
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
                    <Link to="#" onClick={submitForm(e)}>
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
