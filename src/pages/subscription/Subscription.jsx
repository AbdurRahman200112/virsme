import React, { useState, useEffect, useRef  } from "react";
import { styled } from "@mui/material/styles";
import { Layout } from "../../layouts/Layout";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import gsap from "gsap";
import "./Subscription.css"; 
import CancelIcon from "@mui/icons-material/Cancel";
import thumbImage1 from "../../assets/img/expreance/01.jpg";
import thumbImage2 from "../../assets/img/expreance/02.jpg";
import thumbImage3 from "../../assets/img/expreance/03.jpg";
import thumbImage4 from "../../assets/img/expreance/04.jpg";
import $ from "jquery";
import bg1 from "../../assets/img/service/bg.jpg";
import bg2 from "../../assets/img/service/bg2.jpg";
import bg3 from "../../assets/img/service/bg3.jpg";
import bg4 from "../../assets/img/service/bg4.jpg";
import bg5 from "../../assets/img/service/bg5.jpg";


 const services = [
  {no:'01', name: "Accounting & Finance", price: 500, img: thumbImage1 },
  {no:'02', name: "Software Development & Maintenance", price: 700, img: thumbImage2 },
  {no:'03', name: "Human Resource", price: 300, img: thumbImage3 },
  {no:'04', name: "Content Creation & Branding", price: 600, img: thumbImage4 },
  {no:'05', name: "IT Support", price: 400, img: thumbImage3 },
];

const bgImages = [bg1, bg2, bg3, bg4, bg5];

// const businessSizes = [
//   { label: "Startup", hours: 5, icon_w: startupW, icon: startup  },
//   { label: "Small Business", hours: 10, icon_w: smallBusinessW, icon: smallBusiness },
//   { label: "Medium Business", hours: 15, icon_w: mediumBusinessW, icon: mediumBusiness },
//   { label: "Enterprise", hours: 20, icon_w: largeBusinessW, icon: largeBusiness },
// ];

const businessSizes = [
  {
    // category: "Finance",
    hours: "05",
    title: "Startup",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "/service-details",
    bgClass: "service-img-2",
  },
  {
    // category: "Investment",
    hours: "10",
    title: "Small Business",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "/service-details",
    bgClass: "service-img-3",
  },
  {
    // category: "Digital Marketing",
    hours: "15",
    title: "Medium Business",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "/service-details",
    bgClass: "service-img-4",
  },
  {
    // category: "Tax Advising",
    hours: "20",
    title: "Enterprise",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "/service-details",
    bgClass: "service-img-5",
  },
];

export const Subscriptions = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBusinessSize, setSelectedBusinessSize] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [disabledSize, setDisabledSize] = useState(null);
  
  useEffect(() => {
    $(".service__item-8").on("mouseenter", function () {
      $(this).addClass("active").siblings().removeClass("active");
      $("#service-bg-img").removeClass().addClass($(this).attr("rel"));
    });
  }, []);

  const selectedServicesBox = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  
  const handleBusinessSizeClick = (size) => {

  
    setDisabledSize(size.title);
    setTimeout(() => {
      setSelectedBusinessSize(size);
      setSelectedServices((prev) =>
        prev.map((s) => ({ ...s, hours: size.hours }))
      );
      setDisabledSize(null); // Re-enable the button after 1 second
    }, 1000);
  };

  const goToStep = (nextStep, previousStep) => {
    if (nextStep === 2 && previousStep === 1) {
      if(selectedServices.length === 0){
        Swal.fire("Required!", "Select at least one service to move forward", "error");
        return;
      }
    }

    if (nextStep === 3 && previousStep === 2) {
      if (!selectedBusinessSize) {
        Swal.fire("Required!", "Please select a business size to continue", "error");
        return;
      }
    }
    
    if (nextStep === 4 && previousStep===3) {
      if(selectedServices.length === 0){

        Swal.fire("Required!", "Select at least one service to move forward", "error");
        return;
      }
    }
    if (nextStep === 2 && previousStep === 3 && selectedServices.length === 0) {
      goToStep(1);
      return;
    }

    setStep(nextStep);
  };

  const handleServiceClick = (service, index = null) => {
    // If the service is already selected, show a warning and return
    if (selectedServices.some((s) => s.name === service.name)) {
      Swal.fire("Warning!", "This service is already selected!", "warning");
      return;
    }
  
    // If `index` is provided, handle animation from step 1
    if (index !== null) {
      const serviceElement = document.getElementById(`service-${index}`);
      const targetBox = selectedServicesBox.current;
  
      const clone = serviceElement.cloneNode(true);
      document.body.appendChild(clone);
  
      const rect = serviceElement.getBoundingClientRect();
      const targetRect = targetBox.getBoundingClientRect();
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
  
      gsap.set(clone, {
        position: "absolute",
        left: rect.left + scrollX,
        top: rect.top + scrollY,
        width: rect.width,
        height: rect.height,
        zIndex: 1000,
      });
  
      // Animation: x-axis first, then y-axis
      gsap
        .timeline()
        .to(clone, {
          x: 50,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(clone, {
          y: targetRect.top - rect.top + scrollY,
          scale: 0.5,
          opacity: 0.8,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            clone.remove();
            setSelectedServices((prev) => [
              ...prev,
              { ...service, hours: selectedBusinessSize?.hours || 0 },
            ]);
          },
        });
  
      gsap.to(serviceElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          serviceElement.style.visibility = "hidden";
        },
      });
    } else {
      // If `index` is not provided, handle selection directly (from step 3 Chip)
      setSelectedServices((prev) => [
        ...prev,
        { ...service, hours: selectedBusinessSize?.hours || 0 },
      ]);
    }
  };
  
  
  
  const handleServiceRemove = (service) => {
    setSelectedServices((prev) => prev.filter((s) => s.name !== service.name));
  
    // Make the original service element visible again
    const serviceIndex = services.findIndex((s) => s.name === service.name);
    const serviceElement = document.getElementById(`service-${serviceIndex}`);
    if (serviceElement) {
      gsap.to(serviceElement, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          serviceElement.style.visibility = "visible";
        },
      });
    }
  };
  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0854A7",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const renderSummary = () => {
    return selectedServices.map((service) => (
      <StyledTableRow key={service.name}>
        <StyledTableCell>{service.name}</StyledTableCell>
        <StyledTableCell>${service.price}</StyledTableCell>
        <StyledTableCell>
          <TextField
            id="standard-number"
            type="number"
            variant="standard"
            value={service.hours}
            min="1"
            onChange={(e) => handleHoursChange(service.name, e.target.value)}
          />
        </StyledTableCell>
        <StyledTableCell>${(service.price * service.hours).toFixed(2)}</StyledTableCell>
        <StyledTableCell>
          <IconButton onClick={() => deleteServiceRow(service.name)}>
            <CancelIcon  />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
    ));
  };

  const renderUnselectedServices = () => {
    const unselectedServices = services.filter(
      (service) => !selectedServices.some((selected) => selected.name === service.name)
    );
  
    return unselectedServices.map((service) => (
      <Chip
        icon={<AddIcon />}
        label={service.name}
        variant="outlined"
        color="primary"
        key={service.name}
        onClick={() => handleServiceClick(service)} // Pass only the service, no index
      />
    ));
  };
  
  
  const deleteServiceRow = (serviceName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can add this service again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedServices = selectedServices.filter((s) => s.name !== serviceName);
        setSelectedServices(updatedServices); 
  
        Swal.fire({
          title: "Deleted!",
          text: "The service has been removed.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };
  
  const updateTotal = () => {
    const totalHours = selectedServices.reduce((sum, service) => sum + service.hours, 0);
    const totalCost = selectedServices.reduce((sum, service) => sum + service.price * service.hours, 0);
    return { totalHours, totalCost };
  };

  const handleHoursChange = (serviceName, newHours) => {
    setSelectedServices((prev) =>
      prev.map((service) =>
        service.name === serviceName
          ? { ...service, hours: Math.max(1, parseInt(newHours) || 1) }
          : service
      )
    );
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
    <Layout header={2} footer={2}>
    <div className="stepsForm td-testimonial-area td-grey-bg pb-20 p-relative">
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      <form onSubmit={submitForm}>
        {step === 1 && (
          <div id="step-1" className="step-container container">
            <div className="container-fluid d-none d-md-block d-lg-block d-xl-block d-sm-block">
              <div className="col-12">
                <div className="td-testimonial-bg-text text-center td-services-bg-text">
                  <h2 className="text-center">Services</h2>
                </div>
              </div>
            </div>
            <h1 className="text-center">Select Services</h1>
            <div className="pt-50 pb-60 min-height">
              <div className="row align-items-end">
                <div className="col-lg-9 col-md-12 col-sm-12">
                {services
                  .filter((service) => !selectedServices.some((s) => s.name === service.name)) // Exclude selected services
                  .map((service, index) => (
                    <div
                      key={service.name}
                      id={`service-${index}`}
                      className="w-100"
                    >
                      <div className="td-expreance-content-wrap p-relative">
                        <div
                          className="td-expreance-thumb"
                          style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${service.img})`,
                          }}
                        ></div>
                        <div className="td-expreance-item">
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
                                    onClick={() => handleServiceClick(service, index)}
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
                                  when an unknown.
                                </p>
                                <div className="td-expreance-btn">
                                  <button
                                    type="button"
                                    onClick={() => handleServiceClick(service, index)}
                                  >
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
                <div className="col-lg-3 ms-auto">
                <h3>Selected Services</h3>
                <div
                  ref={selectedServicesBox}
                  className="selected-services-container d-flex flex-column"
                  style={{
                    minHeight: "200px",
                    border: "1px dashed #ccc",
                    padding: "10px",
                    backgroundColor: "#e9ecef",
                  }}
                >
                  {selectedServices.map((service, index) => (
                    <button 
                    type="button"
                    key={index}
                    className="selected-service"
                    onClick={() => handleServiceRemove(service)}
                    >
                      {service.name}

                    </button>
                  ))}
                </div>
                </div>
              </div>

            </div>

            {/* navigation */}
            <div className="td-portfolio-navigation container">
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
          </div>
        )}
        {step === 2 && (
          <div id="step-2" className="step-container ">
            <div className="container-fluid d-none d-md-block d-lg-block d-xl-block d-sm-block">
              <div className="col-12">
                <div className="td-testimonial-bg-text text-center td-services-bg-text">
                  <h2 className="text-center">Business</h2>
                </div>
              </div>
            </div>
            <h1 className="text-center">Select Business Size</h1>   
            <div className="pt-70 pb-60">
              <div className="td-service-area fix bg-position p-relative">
                    <div className="container-fluid g-0">
                      {/* bg images */}
                      <div className="service__slider-8">
                        <div id="service-bg-img" className="service-img-2">
                          {bgImages.map((bg, index) => (
                            <div
                              key={index}
                              className={`service-bg service-img-${index + 1}`}
                              style={{ backgroundImage: `url(${bg})` }}
                            ></div>
                          ))}
                        </div>
                      </div>
              
                      {/* service items */}
                      <div className="row gx-0 row-cols-xl-4 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 row-cols-1">
                        {businessSizes.map((size) => (
                          <div
                            className="col td-service-border service__item-8"
                            rel={size.bgClass}
                          >
                            <div className={`td-service-wrap p-relative ${selectedBusinessSize?.title === size.title ? "active " : ""}`}
                            key={size.title}
                            >
                              <span
                                className={`td-service-cetagory td-service-cetagory-${
                                  size + 1
                                }`}
                              >
                                {size.category}
                              </span>
                              <h2 className="td-service-number">{size.hours}<br />Hours</h2>
                              <div className="td-service-content">
                                <h4 className="td-service-title">
                                  <Link to={size.link}>{size.title}</Link>
                                </h4>
                                <div className="td-service-content-inner">
                                  <p className="td-service-content-para mb-45">
                                    {size.description}
                                  </p>
                                  <div className="td-service-btn">
                                    <button type="button"
                                      className={`td-btn td-btn-2 td-left-right ${disabledSize === size.title ? "disabled" : ""}`}
                                      onClick={() => handleBusinessSizeClick(size)}
                                      disabled={disabledSize === size.title}
                                    >
                                      {selectedBusinessSize?.title === size.title ? "Selected" : "Select"}
              
                                      <span className="td-arrow-angle ml-10">
                                        <svg
                                          className="td-arrow-svg-top-right"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10"
                                          height="10"
                                          viewBox="0 0 10.00 10.00"
                                        >
                                          <path d="M1.018 10.009 0 8.991l7.569-7.582H1.723L1.737 0h8.26v8.274H8.574l.013-5.847Z" />
                                          <path d="M1.018 10.009 0 8.991l7.569-7.582H1.723L1.737 0h8.26v8.274H8.574l.013-5.847Z" />
                                        </svg>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
              </div>
            </div>
            {/* navigation */}
            <div className="td-portfolio-navigation pb-110 container">
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
          <div id="step-3" className="step-container container" style={{ height: '100vh' }}>
            <div className="container-fluid d-none d-md-block d-lg-block d-xl-block d-sm-block">
              <div className="col-12">
                <div className="td-testimonial-bg-text text-center td-services-bg-text">
                  <h2 className="text-center">Summary</h2>
                </div>
              </div>
            </div>
            
            <h1 className="text-center">Summary</h1>
            <div className="row pt-70 pb-60">
              <div className="col-lg-12">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Service</StyledTableCell>
                      <StyledTableCell>Price per Hour</StyledTableCell>
                      <StyledTableCell>Hours</StyledTableCell>
                      <StyledTableCell>Total</StyledTableCell>
                      <StyledTableCell>Remove</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderSummary()}</TableBody>
                </Table>
              </TableContainer>
              </div>
            </div>
            <div className="totals">
              <p>Total Hours: {updateTotal().totalHours}</p>
              <p>Total Cost: ${updateTotal().totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="row">
            <div className="col-12">
                <h5 className="mt-3">More Services</h5>
                <Stack direction="row" spacing={1} className="py-3 overflow-auto">
                {renderUnselectedServices()}
                </Stack>
            </div>
            </div>
            {/* Navigation */}
            <div className="td-portfolio-navigation">
              <div className="row align-items-center">
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left">
                    <Link to="#" onClick={() => goToStep(2, 3)}>
                      <div className="td-portfolio-more-icon">
                        <i className="fa-solid fa-arrow-left-long"></i>
                      </div>
                      <span className="td-portfolio-more-content ml-20">Prev</span>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-2 mb-30"></div>
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left text-right">
                    <Link to="#" onClick={() => goToStep(4, 3)}>
                      <span className="td-portfolio-more-content mr-20">Next</span>
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
          <div id="step-4" className="step-container container" style={{height: '100vh'}}>
            <div className="container-fluid d-none d-md-block d-lg-block d-xl-block d-sm-block">
              <div className="col-12">
                <div className="td-testimonial-bg-text text-center td-services-bg-text">
                  <h2 className="text-center">Confirmation</h2>
                </div>
              </div>
            </div>
            <h1 className="text-center">Confirmation & Additional Info</h1>
            <div className="form-group">
              <label>Business Name</label>
              <input
                type="text"
                className="form-control"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Navigation */}
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
                <div className="col-sm-2 mb-30"></div>
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left text-right">
                    <Link to="#" onClick={(e) => { e.preventDefault(); submitForm(e); }}>
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
    </Layout>
  );
};

// export default Subscription;
