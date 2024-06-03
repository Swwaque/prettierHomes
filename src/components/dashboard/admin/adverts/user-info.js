import React from "react";
import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import './user-info.scss'
import { useTranslation } from "react-i18next";

const UserInfo = ({ resp, favCount, tourRequestCount }) => {
const {t} = useTranslation();
  const formatDate = (date) => {
    return moment(date).format("MM/DD/YYYY");
  };

  return (
    <Container className="admin-advert-user-info" fluid>
      <Row className="row-cols-1 row-cols-lg-3">
        <Col><span>{t("userInfoTranslations.owner")} </span>{resp.user.firstName + " " + resp.user.lastName}</Col>
        <Col><span>{t("userInfoTranslations.email")} </span>{resp.user.email}</Col>
        <Col><span>{t("userInfoTranslations.phone")} </span>{resp.user.phone}</Col>
        <Col><span>{t("userInfoTranslations.view")} </span>{resp.viewCount}</Col>
        <Col><span>{t("userInfoTranslations.favorities")} </span>{favCount} </Col>
        <Col><span>{t("userInfoTranslations.tourRequests")} </span>{tourRequestCount}</Col>
        <Col><span>{t("userInfoTranslations.createDate")} </span>{formatDate(resp.createdAt)}</Col>
        <Col><span>{t("userInfoTranslations.updateDate")} </span>{formatDate(resp.updatedAt)}</Col>
        {/* <Col><span>{t("userInfoTranslations.builtIn")} </span>{resp.builtIn ? "true" : "false"}</Col> */}
      </Row>
    </Container>
  );
};

export default UserInfo;
