import React from "react";
import { Layout } from "../../layouts/Layout";
import { ServiceAreaSix } from "../../components/service/ServiceAreaSix";
import { TextSliderTwo } from "../../components/text_slider/TextSliderTwo";
import { ContactTwo } from "../../components/contact/ContactTwo";
import { ServiceAreaFive } from "../../components/service/ServiceAreaFive";
import { ServiceAreaFour } from "../../components/service/ServiceAreaFour";
import { ServiceAreaThree } from "../../components/service/ServiceAreaThree";

export const Service = () => {
  return (
    <Layout breadcrumbTitle={"Our services"} breadcrumbSubtitle={"what we do"}>
      {/* services */}
      <ServiceAreaSix />
      <ServiceAreaFive />
      <ServiceAreaFour />
      <ServiceAreaThree />

      {/* text slider */}
      <TextSliderTwo />

      {/* contact */}
      <ContactTwo />
    </Layout>
  );
};
