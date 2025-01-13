import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Navigation } from "swiper";
import bg1 from "./c1.jpg";
import Finance from "./finance.jpg";
import HumanResource from "./Human-Resource.jpg";
import ContentCreation from "./content-creation.jpg";
import ItSupport from "./it-support.jpg";
import './slider.css'
// Install Swiper modules
SwiperCore.use([Navigation]);

const categories = [
    { services: "8 Services", title: "Software Development & Maintainance", img: bg1 },
    { services: "8 Services", title: "Accounting & Finance", img: Finance },
    { services: "1 Service", title: "Human Resource", img: HumanResource },
    { services: "1 Service", title: "Content Creation & Branding", img: ContentCreation },
    { services: "0 Services", title: "IT Support", img: ItSupport },
];

const Slider = () => {
    return (
        <div
            className="container"
            style={{ marginTop: "200px", marginBottom: "200px", position: "relative" }}
        >
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                Browse talent by category
            </h2>
            <p className="text-gray-500 mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>
                Get some inspirations from 1800+ skills
            </p>
            <Swiper
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                spaceBetween={20}
                slidesPerView={4}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },  // Ensure 5 columns for wider screens
                }}
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                backgroundImage: `url(${category.img})`,
                                backgroundRepeat: "no-repeat",
                                width: "100%",
                                height: "300px",
                                backgroundPosition: "center center",
                                backgroundSize: 'cover',
                                borderRadius: "15px",
                            }}
                        >
                            {/* Overlay for dim effect */}
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                            {/* Text Content */}
                            <div className="absolute bottom-4 left-4 text-white p-4">
                                <p className="text-sm font-medium mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: '13px' }}>
                                    {category.services}
                                </p>
                                <h3
                                    className="font-bold text-white"
                                    style={{ fontFamily: "Poppins, sans-serif", fontSize: '20px', lineHeight: '1.4' }}
                                >
                                    {category.title}
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-button-prev h-2" style={prevArrowStyles}></div>
                <div className="swiper-button-next" style={nextArrowStyles}></div>
            </Swiper>
        </div>
    );
};

// Custom styles for navigation arrows
const arrowBaseStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid rgba(0, 0, 0, 0.1)", // Light gray border
    backgroundColor: "#fff", // White background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: '8px',  // Decreased font size for the arrow
    color: 'black',
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow
};

const prevArrowStyles = {
    ...arrowBaseStyles,
    left: "0px", // Position outside the slider
    fontSize: '12px !important'
};

const nextArrowStyles = {
    ...arrowBaseStyles,
    right: "0px", // Position outside the slider
};

export default Slider;
