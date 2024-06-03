import React from "react";
import ButtonLoader from "./button-loader";
import { Button } from "react-bootstrap";
import "./button-component.scss";

const ButtonComponent = ({ children, formik, loading, type = "button", text, style, onClick }) => {
  const defaultStyle = {
    width: '270px',
    padding: '15px',
  };

  return (
    <Button
      variant="primary"
      type={type}
      className={`dynamic-button ${style ? "" : "auto-wide"}`}
      onClick={onClick || formik.handleSubmit}
      disabled={!formik.isValid || loading}
      style={style || defaultStyle}
    >
      {loading ? <ButtonLoader /> : children} {text}
    </Button>
  );
};

export default ButtonComponent;
