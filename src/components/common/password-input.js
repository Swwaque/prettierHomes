import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { HiLockClosed, HiEye, HiEyeSlash } from "react-icons/hi2";
import { isInValid, isValid } from "../../helpers/function/forms";
import "./password-input.scss";
import { useTranslation } from "react-i18next";


const PasswordInput = ({ formik, placeholder, field, children, setFocus }) => {
  const [type, setType] = useState("password");
  const {t} = useTranslation();

  const handleType = () => {
    const newType = type === "password" ? "text" : "password";
    setType(newType);
  };

  const handleFocus = () => {
    if (setFocus) setFocus(true);
  };

  const handleBlur = () => {
    if (setFocus) setFocus(false);
    formik.setFieldTouched(field, true)
  };

  return (
    <InputGroup className="password-input-group mb-4">
      <InputGroup.Text className={`password-input-group-text ${isInValid(formik, field) ? "invalid" : ""}`}>
        {children || <HiLockClosed />}
      </InputGroup.Text>
      <Form.Control
        className="user-password-input"
        type={type}
        placeholder={placeholder || t("passwordInput.placeholderPassword")}
        {...formik.getFieldProps(field)}
        name={field}
        onChange={formik.handleChange}
        value={formik.values[field]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isInvalid={isInValid(formik, field)}
        isValid={isValid(formik, field)}
      />
      <InputGroup.Text className={`password-eye  ${isInValid(formik, field) ? "invalid" : ""}`} onClick={handleType}>
        {type === "password" ? <HiEye /> : <HiEyeSlash />}
      </InputGroup.Text>
      <Form.Control.Feedback type="invalid" className="form-feedback">
        {formik.errors[field]}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
