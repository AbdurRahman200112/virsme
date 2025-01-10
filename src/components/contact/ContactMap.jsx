import React from "react";

export const ContactMap = () => {
  return (
    <div className="td-map-area fix">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="td-contact-map-box p-relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94352.7356592725!2d-83.18151508271028!3d42.352692364228794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ca0110cb1d75%3A0x5776864e35b9c4d2!2sDetroit%2C%20MI%2C%20USA!5e0!3m2!1sen!2s!4v1736507223101!5m2!1sen!2s"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="td-contact-map-logo">
                <h3>VirSME</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
