import React from 'react';
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import { config } from '../../helpers/config';
import "./offices.scss"
import { useTranslation } from 'react-i18next';

const offices = config.contact.offices;

const Offices = () => {
const { t } = useTranslation();

  return (
    <Container className="office-container">


      <Row>
        <Col xs={12} className='office-text'>
          <h4>{t("offices.visitOfficeTitle")} </h4>
          <p>
            {t("offices.visitOfficeDescription")}
          </p>
        </Col>
      </Row>
      <Row className='office-addresses'>
        {offices.length && offices.map((office, index) => {
          return (
            <Col key={index}>
              <Image className='img-city' src={`images/contact/${office.image}`} />
              <h4>{office.name}</h4>
              <Nav className="flex-column">
                <Nav.Link href={office.mapURL} target='_blank'>{office.address}</Nav.Link>
                <Nav.Link href={`tel:${config.contact.phone2}`}>{office.phone}</Nav.Link> </Nav>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Offices
