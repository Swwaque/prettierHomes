import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./needhelp.scss";
import { RiMailSendLine } from "react-icons/ri";
import { HiOutlinePhone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NeedHelp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container className="need-help">
      <Row className="white-space">
        <Col xs={12} md={6} lg={7} className="need-help-text">
          <h2>{t("needHelp.helpText")} </h2>
          <h6>{t("needHelp.browseProperties")}</h6>
        </Col>
        <Col xs={12} md={6} lg={5} className="need-help-buttons">
         
          <button  className="mail-button" onClick={() => navigate("/contact")}>
            <RiMailSendLine />
            {t("needHelp.mailUs")}
          </button>
          {/* bu kısımda navigate contact sayfasındaki offices idli dive gitmeli */}
          <button  className="phone-button" onClick={() => navigate("/contact")}>
            <HiOutlinePhone />
            {t("needHelp.contactUs")}
            </button>
         
        </Col>
      </Row>
    </Container>
  );
};

export default NeedHelp;
