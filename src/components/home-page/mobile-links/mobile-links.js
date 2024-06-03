import React from 'react'
import { AppleWhite, PlayStore } from '../../../helpers/data/mobile-icons'
import { Button, Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './mobile-links.scss'
import { useTranslation } from 'react-i18next'

const MobileLinks = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <>
            <Container className="mobile-app-links-container">
                <div className="mobile-link-content">
                    <div className="content-title">
                        <h5>{ t('mobileLinks.h5') } </h5>
                        <h5></h5>
                        <div className="content-description">{ t('mobileLinks.description') } </div>
                    </div>
                    <div className="mobile-app-links">
                        <Button className="app-link-ios" onClick={() => navigate('/mobile', { state: { type: 'ios' } })}>
                            <AppleWhite />
                            <div className="button-text-wrapper">
                                <div className="button-text">{ t('mobileLinks.buttonText') } </div>
                                <div className="store-text">{t("mobileLinks.appStore")} </div>
                            </div>
                        </Button>
                        <Button className="app-link-google" onClick={() => navigate('/mobile', { state: { type: 'android' } })}>
                            <PlayStore />
                            <div className="button-text-wrapper">
                                <div className="button-text">{t("mobileLinks.get")} </div>
                                <div className="store-text">{t("mobileLinks.googlePlay")} </div>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="mobile-app-image-wrapper">
                    <Image
                        className="mobile-app-image"
                        src="/images/mobileapps/home-mobile.png"
                        draggable="false"
                        fluid />
                </div>
            </Container>
        </>
    )
}

export default MobileLinks