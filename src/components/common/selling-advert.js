import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./selling-advert.scss";
import { GoShieldLock } from "react-icons/go";
import { FaHouseSignal } from "react-icons/fa6";
import { PiTreeFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const SellingAdvert = () => {
  const {t} = useTranslation()

  return (
    <Container className="selling-advert-container">
      <Row>
        <Col className="selling-left-side order-lg-1 order-2" lg={6}>
          <Row>
            <div className="left-side-caption">
              <h2>
                {t('sellingAdvert.caption')} <br /> {t('sellingAdvert.caption2')}
              </h2>
            </div>
          </Row>
          <Row>
            <div className="selling-option">
              <span className="circle">
                <FaHouseSignal />
              </span>
              <div className="option-text">
                <h5>{t('sellingAdvert.techDrivenTitle')} </h5>
                <span>
                  {t('sellingAdvert.techDrivenDescription')}
                </span>
              </div>
            </div>
          </Row>
          <Row>
            <div className="selling-option">
              <span className="circle">
                <PiTreeFill />
              </span>
              <div className="option-text">
                <h5>{t('sellingAdvert.sustainabilityTitle')} </h5>
                <span>
                  {t('sellingAdvert.sustainabilityDescription')}
                </span>
              </div>
            </div>
          </Row>
          <Row>
            <div className="selling-option">
              <span className="circle">
                <GoShieldLock />
              </span>
              <div className="option-text">
                <h5>{t('sellingAdvert.remoteWorkTitle')} </h5>
                <span>
                 {t('sellingAdvert.remoteWorkDescription')}
                </span>
              </div>
            </div>
          </Row>
        </Col>
        <Col className="selling-right-side order-lg-2 order-1" lg={6}>
          <Image src={`/images/content/family.png`} />
        </Col>
      </Row>
    </Container>
  );
};

export default SellingAdvert;
