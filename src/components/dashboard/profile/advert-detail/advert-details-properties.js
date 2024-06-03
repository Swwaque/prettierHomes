import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./advert-details-properties.scss";

const AdvertDetailsProperties = () => {
  const { advertDetails } = useSelector((state) => state.misc);
  const keysResponse = advertDetails?.category?.categoryPropertyKeysResponse || [];
  const propertyValues = advertDetails?.categoryPropertyValue || [];

  return (
    <Container className="advert-details-properties-container">
      <h4 className='advert-properties-title' >DETAILS</h4>
      <Row style={{ padding: "10px" }} className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {keysResponse.map((propertyKey, index) => (
          <Col className="properties-col" key={index}>
            <div className="properties-wrapper ">
              <strong className="property-key">
                {`${propertyKey.name}`}
              </strong>
              <span>:</span>
              <span className="property-value">
                {`${propertyKey?.prefix || ''} ${propertyValues[index]?.value || ''} ${propertyKey?.suffix || ''}`}
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdvertDetailsProperties;