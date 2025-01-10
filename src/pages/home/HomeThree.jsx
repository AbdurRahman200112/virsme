import React from "react";
import { Layout } from "../../layouts/Layout";
import { HeroThree } from "../../components/hero_sections/HeroThree";
import { ServiceAreaOne } from "../../components/service/ServiceAreaOne";
import { PortfolioOne } from "../../components/portfolio/PortfolioOne";
import { TestimonialOne } from "../../components/testimonials/TestimonialOne";
import { ImpressionOne } from "../../components/impressions/ImpressionOne";
import { TeamOne } from "../../components/teams/TeamOne";
import { Step } from "../steps/step";
import Talent from "../talents/talent";
import Business from "../business/Business";
// import BG2 from "../../assets/img/breadcrumb/h13-bg.jpg";
import BG2 from "../../assets/img/breadcrumb/h13-bg.jpg";


export const HomeThree = () => {
  return (
    <Layout header={2} footer={2} style={{backgroundImage: `url(${BG2})`}} >
      <HeroThree />

      <Step />

      <Talent />

      {/* <ServiceAreaOne /> */}

      <Business />

      {/* <PortfolioOne /> */}

      <TestimonialOne />

      <TeamOne />

    </Layout>
  );
};
