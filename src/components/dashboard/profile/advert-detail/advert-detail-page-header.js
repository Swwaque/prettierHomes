import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IoMdPricetag } from "react-icons/io";
import { HiEye, HiMapPin, HiClock } from "react-icons/hi2";
import { PiMoneyFill } from "react-icons/pi";
import "./advert-detail-page-header.scss";
import { useTranslation } from "react-i18next";

function calculateWeeksSinceCreation(createdAt) {
  if (!createdAt) {
    return 0;
  }
  const creationDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - creationDate;
  const weeksDifference = timeDifference / (1000 * 60 * 60 * 24 * 7);
  return Math.floor(weeksDifference);
}

const AdvertDetailPageHeader = () => {
  const { advertDetails } = useSelector((state) => state.misc);
  const weeksSinceCreation = calculateWeeksSinceCreation(advertDetails?.createdAt);
  const formatedPrice = advertDetails?.price?.toLocaleString();
  const { t } = useTranslation();

  return (
    <Container className="advert-details-page-header-container">
      <div className="advert-title-type-wrapper">
        <div className="advert-title">{advertDetails?.title}</div>
        <div className="advert-type"><IoMdPricetag />
          {t(`advertTypes.${advertDetails?.advertType?.title}`, { defaultValue: advertDetails?.advertType?.title }).toUpperCase()}</div>
      </div>
      <div className="header-advert-details">
        <div className="details">
          <div className="city-district">
            <HiMapPin className="detail-icon" />
            {`${advertDetails?.district?.name}, ${advertDetails?.city?.name}, ${advertDetails?.country?.name}`}
          </div>
          <div className="week">
            <HiClock className="detail-icon" />
            {`${weeksSinceCreation} week${weeksSinceCreation >= 1 ? "s" : ""} ago`}
          </div>
          <div className="view-count">
            <HiEye className="detail-icon" />
            {`${advertDetails?.viewCount} view`}
          </div>
        </div>
        <div className="price">
          <PiMoneyFill className="detail-icon d-md-none" />
          {`$${formatedPrice}`}
        </div>
      </div>
    </Container>
  );
};

export default AdvertDetailPageHeader;
