import React from "react";
import NeedHelp from "../components/common/needhelp";
import Spacer from "../components/common/spacer";
import Banner from "../components/home-page/banner";
import ExploreByCategories from "../components/home-page/properties/by-categories";
import ExploreByCities from "../components/home-page/properties/by-cities";
import RegisterNow from "../components/home-page/register-now";
import SellingAdvert from "../components/common/selling-advert";
import PopularProperties from "../components/home-page/popular-properties";
import MobileLinks from "../components/home-page/mobile-links/mobile-links";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Spacer minHeight={50} />
      <ExploreByCategories />
      <Spacer minHeight={50} />
      <ExploreByCities />
      <Spacer minHeight={50} />
      <RegisterNow />
      <Spacer minHeight={50} />
      <PopularProperties />
      <Spacer minHeight={50} />
      <MobileLinks />
      <Spacer minHeight={60} />
      <NeedHelp />
      <Spacer minHeight={60} />
      <SellingAdvert />
      <Spacer minHeight={50} />
    </>
  );
};

export default HomePage;
