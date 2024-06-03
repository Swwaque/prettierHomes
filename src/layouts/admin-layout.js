import React, { useEffect } from "react";
import SideMenu from "../components/admin-layout/side-menu";
import TopSide from "../components/admin-layout/top-side";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import "../layouts/admin-layout.scss";

const AdminLayout = () => {
  const { dashboardSide } = useSelector((state) => state.misc);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className="admin-layout-container">
        {dashboardSide && (
          <div className="admin-side-wrapper">
            <SideMenu />
          </div>
        )}
        <div className="admin-contents-wrapper">
          <TopSide />
          <div className="admin-spacer">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
