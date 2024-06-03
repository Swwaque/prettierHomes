import React from 'react'
import { Image as FullImage } from 'primereact/image';
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import TourRequestUpdateForm from './tour-request-update-form';
import './tour-request-details.scss'


const TourRequestDetails = () => {
  const location = useLocation();
  const tr = location.state;

  return (
    <>
      <Container className='customer-tour-request-detail-container'>
        <Row className='customer-tour-details-wrapper'>
          <Col xs={12} lg={6} className="tour-request-image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${tr?.image?.type};base64, ${tr?.image?.data}`}
              alt={`${tr?.image?.name}`}
              preview
            />
          </Col>
          <Col xs={12} lg={6}>
            <TourRequestUpdateForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TourRequestDetails