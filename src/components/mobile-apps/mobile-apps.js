import React from "react";
import Spacer from "../common/spacer";
import { Col, Container, Image, Row } from "react-bootstrap";
import  SideContent  from "../../helpers/config/side-content";
import { useLocation } from "react-router-dom";
import "./mobile-apps.scss";
import { useTranslation } from "react-i18next";

const MobileApps = () => {
  const location = useLocation();
  const type = location.state?.type || "ios";
  const {promotion} = SideContent();
const {t} = useTranslation();
  return (
    <Container className="mobile-apps-container">
      <Spacer minHeight={50} />
      <Row>
        <Col xs={12} lg={7} className="main-content">
          <Image loading="lazy" src={`/images/mobileapps/${type === "ios" ? "ios" : "android"}.png`} fluid />
        </Col>
        <Col xs={12} lg={5} className="side-content">
          <div className="brand-logo">
            <Image src="/logos/logo.png" />
            <div>
              {t('mobileAppsTranslations.brandLogoText')}
            </div>
          </div>
          {promotion.map((item, index) => (
            <div className="auth-form-side-item" key={index}>
              <div className="auth-form-side-item-icon" style={item.iconStyle}>
                {item.icon}
              </div>
              <div className="auth-form-side-item-text">
                {item.text}
              </div>
            </div>
          ))}
        </Col>
      </Row>
      <Spacer minHeight={50} />
    </Container>
  );
};

export default MobileApps;
