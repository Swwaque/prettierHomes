import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import "./style.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterNow = () => {
  const { isUserLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();


  return (
    <>
      <Container className="register-now-container">
        <Row>
          <Col className="register-left-side" lg={8}>
            <h2>{t("registerNowTranslations.registerTitle")} </h2>
            <h6 className="my-4">
              {t("registerNowTranslations.registerSubtitle")}
            </h6>
            {!isUserLogin &&
              <Button className="register-button" onClick={() => navigate("/register")} >
                {t("registerNowTranslations.buttonText")} <FaSquareArrowUpRight size={"30"} />
              </Button>}
          </Col>
          <Col className="register-right-side" lg={4}>
            <Image
              src={`images/content/highlight.png`}
              className="register-img"
              fluid
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterNow;
