import React from "react";
import PageHeader from "../../components/common/page-header";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowUturnLeft, HiHome } from "react-icons/hi2";
import "./error.scss";

const Error403Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t("Error403Page.title")} />
      <Container className="error-page-container">
        <Row className="m-0">
          <Col xs={12} lg={6} className="error-page-section">
            <Image
              src={"/images/error/403.jpg"}
              alt="forbidden-error-image"
              fluid
            />
          </Col>
          <Col xs={12} lg={6} className="error-page-section">
            <h3 className="">
             {t("Error403Page.h3")}
            </h3>
            <h5 className="">
            {t("Error403Page.h5")}
            </h5>

            <div className="error-page-button-wrapper">
              <Button
                onClick={() => navigate(-1)}
                className="error-button back-button"
                variant="secondary"
              >
                <HiArrowUturnLeft />
              </Button>

              <Button
                onClick={() => navigate("/")}
                className="error-button home-button"
                variant="warning"
              >
                <HiHome />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Error403Page;
