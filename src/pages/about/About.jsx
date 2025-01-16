import React from "react";
import { Layout } from "../../layouts/Layout";
import { AboutFive } from "../../components/about/AboutFive";
import { AboutFour } from "../../components/about/AboutFour";
import { AboutThree } from "../../components/about/AboutThree";
import { AboutTwo } from "../../components/about/AboutTwo";
import { AwardsOne } from "../../components/awards/AwardsOne";
import { AboutOne } from "../../components/about/AboutOne";
import { HistoryOne } from "../../components/history/HistoryOne";
import { TeamFour } from "../../components/teams/TeamFour";
import { BrandOne } from "../../components/brands/BrandOne";

export const About = () => {
  return (
    <Layout breadcrumbTitle={"About Us"} breadcrumbSubtitle={"About Us"}>
      {/* about */}
      <AboutTwo />
      <AboutThree />
      <AwardsOne />
      {/* <AboutOne /> */}

      {/* <HistoryOne /> */}

      {/* <TeamFour /> */}
    </Layout>
  );
};
