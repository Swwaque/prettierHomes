import React from "react";
import LogoLoading from "./LogoLoading";

const PageLoading = ({ size }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "calc(100vh - 76px)",
      }}
    >
      <LogoLoading size={size} />;
    </div>
  );
};

export default PageLoading;
