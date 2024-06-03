import React, { useEffect } from "react";
import Menubar from "../components/common/menubar";
import Footer from "../components/common/footer";
import ScrollToTopButton from "../components/common/scroll-to-top-button";
import AuthFavModal from "../components/common/auth-fav-modal";
import { Outlet, useLocation } from "react-router-dom";
import './user-layout.scss';

const UserLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className="user-layout-container">
        <Menubar />
        <AuthFavModal />
        <div className="user-layout-spacer">
          <Outlet />
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default UserLayout;
