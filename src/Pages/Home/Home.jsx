import React from "react";
import TopDecorators from "./TopDecorators";
import ServiceMap from "./ServiceMap";
import Hero from "./Hero";
import TopServices from "./TopServices";
import Reviews from "../../Components/Reviews";
import PrivacyTerms from "../../Components/PrivacyTerms";
import HelpSupport from "../../Components/HelpSupport";
import BigProjectBanner from "../../Components/BigProjectBanner";

const Home = () => {
  return (
    <div>
      <title>StyelDecor - Home</title>
      <Hero></Hero>
      <TopServices></TopServices>
      <BigProjectBanner></BigProjectBanner>
      <TopDecorators></TopDecorators>
      <Reviews></Reviews>
      <HelpSupport></HelpSupport>
    </div>
  );
};

export default Home;
