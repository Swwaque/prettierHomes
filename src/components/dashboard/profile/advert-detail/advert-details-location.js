import React from 'react'
import { useSelector } from 'react-redux'
import LocationDisplay from '../location/LocationDisplay';
import { Col, Container, Row } from 'react-bootstrap';
import "./advert-details-location.scss"
import { useTranslation } from 'react-i18next';

const AdvertDetailsLocation = () => {
  const { advertDetails } = useSelector((state) => state.misc);
  const {t} = useTranslation();

  const content = [
    {
      name: t('advertLocationTranslations.colCountry'),
      value: `${advertDetails?.country?.name}`,
    },
    {
      name: t('advertLocationTranslations.colCity'),
      value: `${advertDetails?.city?.name}`,
    },
    {
      name: t('advertLocationTranslations.colDistrict'),
      value: `${advertDetails?.district?.name}`,
    },
  ];

  return (
    <Container className="advert-details-location-container">
      <h4 className='advert-location-title'>{t('advertLocationTranslations.location')}</h4>
      <Row style={{ padding: "10px" }}>

        {content.map((item, index) => (
          <Col xs={12} lg={4} className='location-col' key={index}>
            <div className="location-wrapper ">
              <strong className="location-key">
                {item.name}
              </strong>
              <span>:</span>
              <span className="location-value">
                {item.value}
              </span>
            </div>
          </Col>
        ))}
        <Col cols={12} className='location-col'>
          <div className="address-wrapper ">
            <strong className="address-key">
              {t('advertLocationTranslations.address')}
            </strong>
            <span>:</span>
            <span className="address-value">
              {`${advertDetails?.address}`}
            </span>
          </div>
        </Col>
      </Row>

      <div className="advert-details-map-wrapper">
        <LocationDisplay location={advertDetails?.location} />
      </div>
    </Container>
  );
}

export default AdvertDetailsLocation;