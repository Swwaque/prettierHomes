import React from 'react';
import { Form } from 'react-bootstrap';
import { isInValid, isValid } from "../../helpers/function/forms";

const AdvertTypeSelect = ({ t, formik, advertTypes, feedback, field = "advertTypeId"}) => {
  return (
    <Form.Group className="form-select-class" controlId={field }>
      <Form.Label>{t("adminAdvertEditCommon.labelAdvertType")}</Form.Label>
      <Form.Select
        className="select"
        name={field }
        value={formik.values[field]}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        isInvalid={feedback && isInValid(formik, field)}
        isValid={feedback && isValid(formik, field)}
        // disabled={handleDisable}
      >
        <option disabled value={-1}>
          {t("addressSelect.select")} {/* {label} */}
        </option>

        {advertTypes &&
          advertTypes.map((option) => (
            <option key={option.id} value={option.id}>
                  {t(`bannerTranslations.${option.title}`, { defaultValue: option.title })}
            </option>
          ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid" className="formik-feedback">
        {formik.errors[field]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default AdvertTypeSelect;
