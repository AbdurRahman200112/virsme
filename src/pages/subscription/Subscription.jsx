import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { TextField, Button, Container, Grid, Typography, Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import gsap from "gsap";
import "./subscription.css";
import CancelIcon from "@mui/icons-material/Cancel";
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
import LARAVEL_API_URL from "../../utils/baseUrl";

import $ from "jquery";
import axios from "axios";
const services = [
  { no: '01', name: "Accounting & Finance", price: 500, img: thumbImage1 },
  { no: '02', name: "Software Development & Maintenance", price: 700, img: thumbImage2 },
  { no: '03', name: "Human Resource", price: 300, img: thumbImage3 },
  { no: '04', name: "Content Creation & Branding", price: 600, img: thumbImage4 },
  { no: '05', name: "IT Support", price: 400, img: thumbImage3 },
];

const businessSizes = [
  { label: "Startup", hours: 5, icon_w: startupW, icon: startup },
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
  const [disabledSize, setDisabledSize] = useState(null);
  const [activeField, setActiveField] = useState(null); // Tracks the focused field
  const focusRef = useRef(null); // Ref to track the active input element
  
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

  const submitSelection = async (data) => axios.post(`${LARAVEL_API_URL}/submit-selection`, data);

  const goToStep = (nextStep, previousStep) => {
    if (nextStep === 2 && previousStep === 1) {
      if (selectedServices.length === 0) {
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

    if (nextStep === 4 && previousStep === 3) {
      if (selectedServices.length === 0) {

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

  const handleServiceClick = (service) => {
    if (selectedServices.some((s) => s.name === service.name)) {
      handleServiceRemove(service);
      return;
    }

    setSelectedServices((prev) => [...prev, service]);
    // Trigger animation for this specific service

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
            id={`hours-${service.name}`} // Unique ID for each service
            type="number"
            variant="standard"
            value={service.hours || 1} // Default value is 1
            inputProps={{ min: 1 }} // Enforce minimum value
            onChange={(e) => handleHoursChange(service.name, e.target.value)} // Update only this service
            onFocus={(e) => handleFieldFocus(service.name, e.target)} // Track focus
            inputRef={activeField === service.name ? focusRef : null} // Attach ref only to the active field
          />
        </StyledTableCell>
        <StyledTableCell>${(service.price * (service.hours || 1)).toFixed(2)}</StyledTableCell>
        <StyledTableCell>
          <IconButton onClick={() => deleteServiceRow(service.name)}>
            <CancelIcon />
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
    const totalHours = selectedServices.reduce((sum, service) => sum + Number(service.hours || 0), 0);
    const totalCost = selectedServices.reduce((sum, service) => sum + service.price * (Number(service.hours) || 0), 0);
    return { totalHours, totalCost };
  };

  const handleHoursChange = (serviceName, newValue) => {
    const value = Math.max(1, parseInt(newValue, 10) || 1); // Ensure minimum value is 1
  
    setSelectedServices((prevServices) =>
      prevServices.map((service) =>
        service.name === serviceName ? { ...service, hours: value } : service
      )
    );
  
    // Keep the focus on the currently active field
    if (focusRef.current && activeField === serviceName) {
      setTimeout(() => {
        focusRef.current.focus();
      }, 0);
    }
  };
  const handleFieldFocus = (serviceName, inputElement) => {
    setActiveField(serviceName); // Set the active field to the clicked service
    focusRef.current = inputElement; // Update the focusRef
  };
  
  

  const submitForm = async (e) => {
    e.preventDefault();

    const payload = {
      business_name: businessName,
      email,
      selected_services: selectedServices.map((service) => ({
        name: service.name || "Unknown Service", // Default fallback if `name` is missing
        price_per_hour: service.price || 0, // Default fallback if `price_per_hour` is missing
        hours: service.hours || 1, // Default fallback if `hours` is missing
      })),
      business_size: selectedBusinessSize?.label, // Assuming `label` is correct
    };

    Swal.fire({
      title: "Confirmation",
      text: "Are you sure all the information is correct?",
      icon: "question",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await submitSelection(payload);
          Swal.fire("Success!", "Your details have been submitted.", "success");
          console.log("Response:", response.data);

          // Clear the form after successful submission
          setBusinessName("");
          setEmail("");
          setSelectedServices([]);
          setSelectedBusinessSize(null);
          setStep(1);
        } catch (error) {
          console.error("Error inserting data:", error.response?.data?.message || error.message);
          Swal.fire("Error!", "Failed to insert data. Please try again.", "error");
        }
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
      <form onSubmit={submitForm}>
        {step === 1 && (
          <div id="step-1" className="step-container container">
            <div className=" d-none d-md-block d-lg-block d-xl-block d-sm-block">
              <div className="col-12">
                <div className="td-testimonial-bg-text text-center td-services-bg-text">
                  <h2 className="text-center">Services</h2>
                </div>
              </div>
            </div>
            <h1 className="text-center">Select Services</h1>
            <div className="pt-50 pb-60 min-height">
              <div className="row align-items-end">
                <div className="col-12">
                  {services.map((service) => (
                    <div
                      className={`td-expreance-content-wrap p-relative ${selectedServices.some((s) => s.name === service.name) ? "selected" : ""
                        }`}
                      key={service.name}
                      onClick={() => handleServiceClick(service)}
                    >
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
                                {selectedServices.some((s) => s.name === service.name) ? "Selected" : "Select"}
                              </p>
                              <h3 className="td-expreance-title">
                                <span>{service.no}</span>
                                <button type="button" className="text-start">
                                  {service.name}
                                </button>
                              </h3>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-30">
                            <div className="td-expreance-btn-wrap">
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <div className="td-expreance-btn">
                                <button type="button">
                                  {selectedServices.some((s) => s.name === service.name) ? (
                                    <svg
                                      width="50"
                                      height="50"
                                      viewBox="0 0 50 50"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="25"
                                        cy="25"
                                        r="20"
                                        stroke="#0b7ffe"
                                        strokeWidth="2"
                                        fill="none"
                                      />
                                      <path
                                        d="M15 25L22 32L35 18"
                                        stroke="#0b7ffe"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      width="50"
                                      height="50"
                                      viewBox="0 0 50 50"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M25 50C38.8235 50 50 38.8235 50 25C50 11.1765 38.8235 0 25 0C11.1765 0 0 11.1765 0 25C0 38.8235 11.1765 50 25 50ZM25 2.94118C37.2059 2.94118 47.0588 12.7941 47.0588 25C47.0588 37.2059 37.2059 47.0588 25 47.0588C12.7941 47.0588 2.94118 37.2059 2.94118 25C2.94118 12.7941 12.7941 2.94118 25 2.94118Z"
                                        fill="#0b7ffe"
                                      />
                                      <path
                                        d="M24.5585 39.2638L38.8232 24.9991L24.5585 10.7344L22.4997 12.7932L34.7056 24.9991L22.4997 37.205L24.5585 39.2638Z"
                                        fill="#0b7ffe"
                                      />
                                      <path
                                        d="M36.7646 23.5293H11.7646V26.4705H36.7646V23.5293Z"
                                        fill="#0b7ffe"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="td-portfolio-navigation container">
              <div className="row align-items-center">
                <div className="col-sm-5 mb-30"></div>
                <div className="col-sm-2 mb-30"></div>
                <div className="col-sm-5 mb-30">
                  <div className="td-portfolio-more-left text-right">
                    <Link to="#" onClick={() => goToStep(2, 1)}>
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
            <div className="container">
              <div className="row pt-70 pb-60">
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
                        {businessSizes.map((size) => (
                          <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
                            <div className={`td-pricing-wrap business-card ${selectedBusinessSize?.label === size.label ? "active td-pricing-wrap-2" : ""}`}
                              key={size.label}>
                              <div className="td-pricing-content text-center">
                                <div className="td-pricing-icon mb-40">
                                  <span>
                                    <img src={selectedBusinessSize?.label === size.label ? size.icon_w : size.icon} alt="" width="100px" />
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
          <div id="step-3" className="step-container container" style={{ height: '110vh' }}>
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
          <div id="step-4" className="step-container container" style={{ height: '100vh', }}>
            <div className="container-fluid d-none d-md-block d-lg-block d-xl-block d-sm-block">
              <div className="col-12">
                <div className="td-testimonial-bg-text text-center td-services-bg-text">
                  <h2 className="text-center">Confirmation</h2>
                </div>
              </div>
            </div>
            <h1 className="text-center">Confirmation</h1>
            <div className="row pt-70 pb-60">
              <div className="col-lg-12">
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    padding: '30px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    maxWidth: '500px',
                    width: '100%',
                    margin: 'auto',
                  }}
                >
                  <Typography variant="h4" align="center" sx={{ color: '#0b7ffe', fontWeight: 'bold', marginBottom: '20px' }}>
                    Confirmation
                  </Typography>
                  <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Business Name"
                          variant="outlined"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&.Mui-focused fieldset': {
                                borderColor: '#0b7ffe',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Contact Email"
                          type="email"
                          variant="outlined"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&.Mui-focused fieldset': {
                                borderColor: '#0b7ffe',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={(e) => { e.preventDefault(); submitForm(e); }}
                          sx={{
                            backgroundColor: '#0b7ffe',
                            color: '#fff',
                            fontWeight: 'bold',
                            '&:hover': {
                              backgroundColor: '#4caf50',
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ marginTop: '30px' }}>
                    <div className="td-portfolio-navigation">
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Button
                            variant="text"
                            onClick={() => goToStep(3, 4)}
                            sx={{
                              color: '#0b7ffe',
                              textTransform: 'none',
                              '&:hover': {
                                color: '#4caf50',
                              },
                            }}
                          >
                            <i className="fa-solid fa-arrow-left-long" style={{ marginRight: '10px' }}></i>
                            Prev Step
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        )}


      </form>
    </div>
  );
};
