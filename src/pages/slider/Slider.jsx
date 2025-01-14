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
            className="container service-categories"
            style={{ marginTop: "150px", marginBottom: "200px", position: "relative" }}
        >
            <h2 className="td-section-title font-bold mb-4" style={{fontSize: '45px'}}>
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
                    240: { slidesPerView: 1 },
                    520: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },  // Ensure 5 columns for wider screens
                }}
            >
                {categories.map((category, index) => (
                    
                    <SwiperSlide key={index}>
                        <a href="#" className="category-banner-inner">
                            <div className="banner-image">
                                <div className="image-wrapper">
                                    <img src={category.img} alt="" />
                                </div>
                                <div className="inner">
                                    <div className="number">
                                        <p>{category.services}</p>
                                    </div>
                                    <h4 className="title">
                                        {category.title}
                                    </h4>
                                </div>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}


                <div className="swiper-button-prev h-2" ></div>
                <div className="swiper-button-next" ></div>
            </Swiper>
        </div>
    );
};


export default Slider;
