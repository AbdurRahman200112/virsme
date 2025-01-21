import React from "react";
import brand1 from "../../assets/img/brands/1.png";
import brand2 from "../../assets/img/brands/2.png";
import brand3 from "../../assets/img/brands/3.png";
import brand4 from "../../assets/img/brands/4-edits.png";
import brand5 from "../../assets/img/brands/5.png";
import brand6 from "../../assets/img/brands/6.png";
import brand7 from "../../assets/img/brands/7.png";
import brand8 from "../../assets/img/brands/8-edit.png";
import brand9 from "../../assets/img/brands/9.png";
import brand10 from "../../assets/img/brands/10.png";

import { Swiper, SwiperSlide } from "../swiper/SwiperRoot";

const brandList = [
  { id: 1, link: "#", imageSrc: brand1, alt: "Brand 1" },
  { id: 2, link: "#", imageSrc: brand2, alt: "Brand 2" },
  { id: 3, link: "#", imageSrc: brand3, alt: "Brand 3" },
  { id: 4, link: "#", imageSrc: brand4, alt: "Brand 4" },
  { id: 5, link: "#", imageSrc: brand5, alt: "Brand 5" },
  { id: 6, link: "#", imageSrc: brand6, alt: "Brand 6" },
  { id: 7, link: "#", imageSrc: brand7, alt: "Brand 7" },
  { id: 8, link: "#", imageSrc: brand8, alt: "Brand 8" },
  { id: 9, link: "#", imageSrc: brand9, alt: "Brand 9" },
  { id: 10, link: "#", imageSrc: brand10, alt: "Brand 10" },

];

export const BrandOne = ({ className = "" }) => {
  const swiper_settings = {
    spaceBetween: 60,
    loop: true,
    freeMode: true,
    slidesPerView: "auto",
    autoplay: { delay: 4000 },
    breakpoints: {
      768: {
        spaceBetween: 30,
      },
      576: {
        spaceBetween: 20,
      },
      0: {
        spaceBetween: 20,
      },
    },
  };

  return (
    <div className={`td-brands-area td-grey-bg ${className}`}>
      <div className="container">
        <div className="row gx-0">
          <div className="col-12">
            <div className="td-brands-wrap company-logo-slider-full">
              <div className="swiper-container td-brand-slide">
                <div className="swiper-wrapper">
                  <Swiper {...swiper_settings}>
                    {brandList.map((brand) => (
                      <SwiperSlide key={brand.id}>
                        <div className="td-brand-single-logo text-center" >
                          <a href={brand.link} style={{backgroundImage:`url(${brand.imageSrc})`, backgroundSize: 'contain'}}>
                            {/* <img src={brand.imageSrc} alt={brand.alt} style={{width: '100%'}} /> */}
                          </a>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
