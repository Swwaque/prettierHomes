import React from "react";
import { Form } from "react-bootstrap";
import { isInValid, isValid } from "../../helpers/function/forms";
import "./input-style.scss";

const InputText = ({
  formik,
  label,
  type,
  field,
  id,
  autoComplete,
  placeholder,
  handleChange,
  handleValue,
  handleDisable,
  feedback = true,
}) => {
  return (
    <Form.Group className="form-text-input-class" controlId={id || field}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        name={field}
        value={handleValue === undefined ? formik.values[field] : handleValue}
        onBlur={formik.handleBlur}
        onChange={handleChange || formik.handleChange}
        isInvalid={feedback && isInValid(formik, field)}
        isValid={feedback && isValid(formik, field)}
        disabled={handleDisable}
      />
      <Form.Control.Feedback type="invalid" className="formik-feedback">
        {formik.errors[field]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputText;
