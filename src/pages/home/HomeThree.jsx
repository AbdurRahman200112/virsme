import React from "react";
import { Layout } from "../../layouts/Layout";
// import { HeroThree } from "../../components/hero_sections/HeroThree";
import { HeroFour } from "../../components/hero_sections/HeroFour";
import { ServiceAreaOne } from "../../components/service/ServiceAreaOne";
// import { ServiceAreaTwo } from "../../components/service/ServiceAreaTwo";
import { ServiceAreaThree } from "../../components/service/ServiceAreaThree";
import { ServiceAreaFour } from "../../components/service/ServiceAreaFour";
import { ServiceAreaFive } from "../../components/service/ServiceAreaFive";
// import { ServiceAreaSix } from "../../components/service/ServiceAreaSix";
// import { ExperienceOne } from "../../components/experience/ExperienceOne";
import { PricingOne } from "../../components/pricing/PricingOne";
import { TestimonialOne } from "../../components/testimonials/TestimonialOne";
import { FaqOne } from "../../components/faq/FaqOne";
import { BrandOne } from "../../components/brands/BrandOne";
// import { ImpressionOne } from "../../components/impressions/ImpressionOne";
// import {BusinessOne} from "../../components/business/BusinessOne";
import { TeamOne } from "../../components/teams/TeamOne";
import { Step } from "../steps/step";
import { AboutFour } from "../../components/about/AboutFour";
import { ChooseOne } from "../../components/choose/ChooseOne";
import { AboutThree } from "../../components/about/AboutThree";
import { AboutTwo } from "../../components/about/AboutTwo";
import { AwardsOne } from "../../components/awards/AwardsOne";
import Talent from "../talents/talent";
import Business from "../business/Business";

// import BG2 from "../../assets/img/breadcrumb/h13-bg.jpg";
import Slider from "../slider/Slider";

export const HomeThree = () => {
  return (
    <Layout header={2} footer={2}  >
      <HeroFour />

      <AboutFour />
      <ChooseOne />

      <AboutTwo />
      <AboutThree />

      {/* <Talent /> */}

      <ServiceAreaThree />
      <AwardsOne />
      <ServiceAreaOne/>
      {/* <Step /> */}
      <ServiceAreaFive />
      <ServiceAreaFour />

      {/* <ExperienceOne /> */}

      {/* <Business /> */}

      {/* <Slider/> */}

      {/* <ImpressionOne /> */}

      <PricingOne />

      <TestimonialOne />
      <BrandOne />

      <FaqOne />

      <TeamOne />

    </Layout>
  );
};
