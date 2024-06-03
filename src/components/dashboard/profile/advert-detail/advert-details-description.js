import React from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import "./advert-details-description.scss"
import { useTranslation } from 'react-i18next';

const AdvertDetailsDescription = () => {
  const { advertDetails } = useSelector((state) => state.misc);
  const {t} = useTranslation();

  return (
    <>
      <Container className="advert-details-description-container">
        <h4 className='description-title' >{t('advertDescriptionTranslations.description')} </h4>
        <div className='advert-category-title'><strong>{t('advertDescriptionTranslations.category')} : </strong>{advertDetails?.category?.title}</div>
        <div className='advert-description'>{advertDetails?.description}</div>
      </Container>
    </>
  )
}

export default AdvertDetailsDescription