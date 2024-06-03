import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Map from "./map";
import ContactForm from "./contact-form";
import Spacer from "../common/spacer";
import Offices from "./offices";
import "./contact.scss";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container className="contact-container">
        <div className="map-wrapper">
          <Map />
        </div>
        <br />
        <Row className="">
          <Col xs={12} md={7} lg={6}>
            <ContactForm />
          </Col>
          <Col xs={12} md={5} lg={6}>
            <div className="contact-form-text">
              <h4> {t("contact.contactTitle")} </h4>
              <p >
               {t("contact.contactDescription")}
              </p>
            </div>
          </Col>
        </Row>
        <Spacer />
      </Container>
      <br />
      <Offices/>
    </>
  );
};

export default Contact;
