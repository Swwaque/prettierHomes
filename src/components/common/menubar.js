import React, { useEffect, useState } from "react";
import UserProfile from "./user-Profile";
import { Navbar, Nav, Container, Image, Offcanvas, Button, NavDropdown } from "react-bootstrap";
import { RiMore2Fill } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { TbHomePlus } from "react-icons/tb";
import { config } from "../../helpers/config";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/slices/settings-slice";
import "./menubar.scss";
 
import { useTranslation } from "react-i18next";
 
const languages = config.settings.languages;

const Menubar = () => {
  const { isUserLogin } = useSelector((state) => state.auth);
  const [mode, setMode] = useState("default");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentLanguageCode = localStorage.getItem("i18nextLng");



  const handleScroll = () => {
    const scrollYPosition = window.scrollY;
    if (scrollYPosition > 250) {
      setMode("changed");
    } else {
      setMode("default");
    }
  };

  const handleLanguageChange =  (code) => {
    i18n.changeLanguage(code)
    dispatch(setLanguage(code));
    // window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" sticky="top" className={`top-nav-menu bg-${mode}`} collapseOnSelect>
      <Container>

        <Navbar.Toggle aria-controls={`offcanvas-menu`} className="collapse-toggle">
          <RiMore2Fill className="icon" />
        </Navbar.Toggle>

        <Navbar.Brand as={Link} to="/" className="nav-brand">
          <Image src={`/logos/${mode === "default" ? "logo.png" : "logo-white-3.png"}`} className="img-fluid" alt={config.project.name} />
        </Navbar.Brand>

        <Navbar.Offcanvas
          id={`offcanvas-menu`}
          aria-labelledby={`offcanvas-menu-side`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Navbar.Brand as={Link} to="/">
                <Image src={`/logos/logo.png`} className="img-fluid" alt={config.project.name} />
              </Navbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 navigation">
            <Nav.Link as={Link} to="/" eventKey="1">
              {t('menubar.home')}
              </Nav.Link>
              <Nav.Link as={Link} to="/ad/search" eventKey="2">
              {t('menubar.properties')}
              </Nav.Link>
              <Nav.Link as={Link} to="/about" eventKey="3">
              {t('menubar.about')}
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" eventKey="4">
              {t('menubar.contact')}
              </Nav.Link>

            </Nav>
            <Nav className="lang-auth-nav">
              {isUserLogin ? (
                null
              ) : (
                <div className="auth-links">
                  <Nav.Link as={Link} to="/login" eventKey="5">{t('menubar.login')} </Nav.Link>
                  <span> {t('menubar.or')} </span>
                  <Nav.Link as={Link} to="/register" eventKey="6">{t('menubar.register')}</Nav.Link>
                </div>
              )}

              <NavDropdown
                title={<img alt="" src={languages.find(lang => lang.code === currentLanguageCode)?.flag} className="flag-icon" />}
                className="language-dropdown"
              >
                {languages.map((lang) => (
                  <NavDropdown.Item
                    key={lang.code}
                    className="language-item"
                    eventKey={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    // active={language === lang.code}
                    disabled= {currentLanguageCode === lang.code}
                  >
                    <img alt="" src={lang.flag} draggable="false" className="flag-icon" /> {lang.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        {isUserLogin
          ?
          <div className="menu-wrapper">
            <Button
              className="add-property"
              as={Link}
              to="/ad"
            >
              <span className="d-none d-lg-block">{t('menubar.addProperty')} <BsArrowRight className="ms-2" /></span>
              <span className="d-lg-none"><TbHomePlus size={20} /></span>
            </Button>
            <UserProfile />
          </div>
          :
          null}
      </Container>
    </Navbar>
  );
};

export default Menubar;
