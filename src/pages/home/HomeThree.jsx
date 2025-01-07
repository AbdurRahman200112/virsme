import React from "react";
import { Layout } from "../../layouts/Layout";
import { HeroThree } from "../../components/hero_sections/HeroThree";
import { ServiceAreaOne } from "../../components/service/ServiceAreaOne";
import { AboutTwo } from "../../components/about/AboutTwo";
import { AwardsOne } from "../../components/awards/AwardsOne";
import { VideoAreaFour } from "../../components/video_areas/VideoAreaFour";
import { ExperienceOne } from "../../components/experience/ExperienceOne";
import { PortfolioOne } from "../../components/portfolio/PortfolioOne";
import { FaqOne } from "../../components/faq/FaqOne";
import { TestimonialTwo } from "../../components/testimonials/TestimonialTwo";
import { PricingOne } from "../../components/pricing/PricingOne";
import { ImpressionOne } from "../../components/impressions/ImpressionOne";
import { ContactTwo } from "../../components/contact/ContactTwo";
import { TeamOne } from "../../components/teams/TeamOne";

export const HomeThree = () => {
  return (
    <Layout header={2} footer={2}>
      {/* hero */}
      <HeroThree />

       {/* about section */}
        <AboutTwo />

      {/* service area */}
      <ServiceAreaOne />

      {/* awards section */}
      <AwardsOne />

      {/* portfolio section */}
      <PortfolioOne />


      {/* experience */}
      {/* <ExperienceOne /> */}
      
      {/* impression */}
      <ImpressionOne />

      {/* faq */}
      <FaqOne />

      {/* testimonial */}
      <TestimonialTwo />

      {/* pricing */}
      <PricingOne />

      {/* team section */}
      <TeamOne />
      
      {/* contact */}
      {/* <ContactTwo /> */}
    </Layout>
  );
};
