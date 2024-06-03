import React from "react";
import PageHeader from "../../components/common/page-header";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./error.scss";

const Error500Page = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t("Error500Page.title")} />
      <Container className="error-page-container">
        <Row className="m-0">
          <Col xs={12} lg={6} className="error-page-section">
            <Image
              src={"/images/error/500.jpg"}
              alt="server-error-image"
              fluid
            />
          </Col>
          <Col xs={12} lg={6} className="error-page-section">
            <h3 className="">
              {t("Error500Page.h3")}
            </h3>
            <h5 className="">
            {t("Error500Page.h5")}
            </h5>
            <h5 className="">
            {t("Error500Page.h52")}
            </h5>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Error500Page;
