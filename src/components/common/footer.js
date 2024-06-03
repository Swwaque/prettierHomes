import React from "react";
import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import { config } from "../../helpers/config";
import { Link, useNavigate } from "react-router-dom";
import { SlSocialLinkedin, SlSocialInstagram, SlSocialFacebook } from "react-icons/sl";
import { FaXTwitter, FaAppStore } from "react-icons/fa6";
import { PlayStore } from '../../helpers/data/mobile-icons'
import "./footer.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col xs={12} md={{ span: 12, order: 1 }} lg={{ span: 4, order: 1 }} className="footer-section">
            <Image
              src={`/logos/logo-white.png`}
              className="img-fluid"
              alt={config.project.name}
            ></Image>
            <p className="footer-description">{t('footer.description')} </p>
          </Col>
          <Col xs={12} md={{ span: 4, order: 3 }} lg={{ span: 2, order: 2 }} className="footer-section">
            <h3>{t('footer.navigation')} </h3>
            <Nav className="flex-column p-2">
              <Nav.Link as={Link} to="/">{t('footer.home')}</Nav.Link>
              <Nav.Link as={Link} to="/ad/search">{t('footer.properties')}</Nav.Link>
              <Nav.Link as={Link} to="/about">{t('footer.about')} </Nav.Link>
              <Nav.Link as={Link} to="/contact">{t('footer.contact')}</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={{ span: 4, order: 4 }} lg={{ span: 3, order: 3 }} className="footer-section">
            <h3>{t('footer.h3')}</h3>
            <Nav className="flex-column p-2">
              <Nav.Link as={Link} to="/privacy-policy">{t('footer.privacyPolicy')}</Nav.Link>
              <Nav.Link as={Link} to="/term-of-use">{t('footer.termsConditions')}</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={{ span: 4, order: 2 }} lg={{ span: 3, order: 4 }} className="footer-section">
            <h3>{t('footer.contactHeading')}</h3>
            <Nav className="flex-column p-2">
              <Nav.Link href={config.contact.center.mapURL} target="_blank">
                {config.contact.center.address}
              </Nav.Link>
              <Nav.Link href={`tel:${config.contact.center.phone}`}>
                {config.contact.center.phone}
              </Nav.Link>
              <Nav.Link href={`mailto:${config.contact.center.email}`}>
                {config.contact.center.email}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="footer-store-social-section">
            <div className="button-wrapper">
              <a className="store-ios-button d-none d-sm-flex" onClick={() => navigate('/mobile', { state: { type: 'ios' } })}>
                <FaAppStore />
              </a>
              <a className="store-google-button d-none d-sm-flex" onClick={() => navigate('/mobile', { state: { type: 'android' } })} >
                <PlayStore />
              </a>
              <a
                className="social-twitter-button"
                href="https://twitter.com/prettierhomes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </a>
              <a
                className="social-facebook-button"
                href="https://www.facebook.com/profile.php?id=61555635581245"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SlSocialFacebook />
              </a>
              <a
                className="social-instagram-button"
                href="https://www.instagram.com/prettierhomes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SlSocialInstagram />
              </a>
              <a
                className="social-linkedin-button"
                href="https://www.linkedin.com/in/prettier-homes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SlSocialLinkedin />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="copyright">&copy; {currentYear} {t("footer.allRightsReserved")} </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
