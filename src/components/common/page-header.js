import React from "react";
import { Container } from "react-bootstrap";
import "./page-header.scss";

const PageHeader = ({ title }) => {
  return (
    <Container className="page-header">
      <h1>{title}</h1>
    </Container>
  );
};

export default PageHeader;
