import React from "react";
import { Form } from "react-bootstrap";
import "./input-style.scss";
import { isInValid, isValid } from "../../helpers/function/forms";

const InputTextArea = ({formik,label,field,placeholder,row=3}) => {
  return (
    <Form.Group className="form-text-input-class" controlId={field}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        {...formik.getFieldProps(field)}
        isInvalid={isInValid(formik, field)}
        isValid={isValid(formik, field)}
        rows={row}
      />
      <Form.Control.Feedback type="invalid" className="formik-feedback">
        {formik.errors[field]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputTextArea;
