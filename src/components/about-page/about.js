import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./about.scss";
import { GiTreehouse } from "react-icons/gi";
import { HiMiniHomeModern } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container className="about-container">
        <Row className="about-wrapper">
          <Col xs={12} lg={6} className="about-left-side">
            <Image
              src="./images/content/about.png"
            ></Image>
          </Col>
          <Col xs={12} lg={6} className="about-right-side">
            <h3>{t('about.heading')} <br /> {t('about.heading2')} </h3>
            <p>
              {t('about.paragraph')}
            </p>
            <div className="text-icons">
              <div className="icon-group">
                <span className="circle first">
                  <HiMiniHomeModern />
                </span>
                <p>{t('about.modernArchitectText')} </p>
              </div>
              <div className="icon-group">
                <span className="circle second">
                  <GiTreehouse />
                </span>
                <p>{t('about.greenBuildingText')} </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default About;
