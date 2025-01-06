import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
import "./Subscription.css"; // Create and copy your CSS here
import { services } from "./services"; // Import services data from a separate file
import Swal from "sweetalert2";


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
        return [...prev, { ...service, hours: 0 }];
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
    <div className="stepsForm">
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      <form onSubmit={submitForm}>
        {step === 1 && (
          <div id="step-1">
            <h1>Select Services</h1>
            <div>
              {services.map((service) => (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => handleServiceClick(service)}
                >
                  {service.name}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => goToStep(2, 1)}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div id="step-2">
            <h1>Select Business Size</h1>
            <div>
              {businessSizes.map((size) => (
                <button
                type="button"
                  key={size.label}
                  className={`business-card ${
                    selectedBusinessSize?.label === size.label ? "active" : ""
                  }`}
                  onClick={() => handleBusinessSizeClick(size)}
                >
                  <h4>{size.label}</h4>
                  <p>{size.hours} Hours</p>
                </button>
              ))}
            </div>
            <button type="button" onClick={() => goToStep(1, 2)}>
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedBusinessSize) goToStep(3, 2);
                else Swal.fire("Required!", "Select a business size", "error");
              }}
            >
              Next
            </button>
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
            <button type="button" onClick={() => goToStep(2, 3)}>
              Back
            </button>
            <button type="button" onClick={() => goToStep(4, 3)}>
              Next
            </button>
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
            <button type="button" onClick={() => goToStep(3, 4)}>
              Back
            </button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

// export default Subscription;
