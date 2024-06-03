import React from "react";
import { Image, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth-slice";
import DashboardMenus from "../../helpers/data/dashboard-menus";
import { prettyDialog } from "../../helpers/function/toast-confirm";
import { SlLogout } from "react-icons/sl";
import { useToast } from "../../store/providers/toast-provider";
import { resetFavs } from "../../store/slices/fav-slice";
import { PiArrowUDownLeftBold, PiDoorOpenFill } from "react-icons/pi";
import "./side-menu.scss";
import { useTranslation } from "react-i18next";


const SideMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user.role.toLowerCase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { admin, manager } = DashboardMenus();
  let dashboardMenu = role === "admin" ? admin : manager

  const handleLogout = async () => {
    prettyDialog({
      message: t("sideMenu.message"),
      header: t("sideMenu.header"),
      handleAccept: () => {
        dispatch(logout());
        dispatch(resetFavs());
        navigate("/");

        showToast({
          severity: "success",
          summary: t("sideMenu.logout"),
          detail: t("sideMenu.detailSuccess"),
          icon: <SlLogout size={50} />,
          life: 1000,
        });
      },
    });
  };

  return (
    <div className="admin-side-menu">
      <div className="admin-side-logo">
        <Image
          src="/logos/logo-white-2.png"
          alt="brand-logo"
          className="img-fluid d-none d-sm-inline"
        />
        <Image
          src="/logos/just_logo_white-2.png"
          alt="brand-logo"
          className="img-fluid d-sm-none"
        />
      </div>
      <Nav className="side-menu-nav central">
        {
          dashboardMenu.map((item, index) => (
            <Nav.Link
              className="side-menu-link"
              as={Link}
              to={item.link}
              key={index}
              eventKey={index}
              title={item.title}
            >
              {item.icon}<span className="d-none d-sm-inline">{item.title}</span>
            </Nav.Link>
          ))
        }
      </Nav>
      <Nav className="side-menu-nav">
        <Nav.Link
          className="side-menu-link back-site"
          as={Link}
          to={"/"}
          title={t("sideMenu.titleNavLink")}
        >
          <PiArrowUDownLeftBold className="back-icon" /><span className="d-none d-sm-inline">{t("sideMenu.titleNavLink")} </span>
        </Nav.Link>
        <Nav.Link
          className="side-menu-link logout"
          as={Link}
          onClick={() => handleLogout()}
          title={t("sideMenu.logout")}
        >
          <PiDoorOpenFill className="logout-icon" /><span className="d-none d-sm-inline">{t("sideMenu.logout")} </span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default SideMenu;
