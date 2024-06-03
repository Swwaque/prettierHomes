import React from "react";
import smile from "./smile.png";
import home from "./home.png";
import "./logo-loading.scss";

const LogoLoading = ({ size }) => {
  const hw = size || "160px";

  return (
    <>
      <div className="logo-loading">
        <div className="loading-wrapper">
          <img className="smile" src={smile} alt="logo" style={{ width: hw }} />
          <img className="home" src={home} alt="logo" style={{ width: hw }} />
        </div>
      </div>
    </>
  );
};

export default LogoLoading;
