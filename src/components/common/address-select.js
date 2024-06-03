import React from "react";
import { Form } from "react-bootstrap";
import { isInValid, isValid } from "../../helpers/function/forms";
import "./input-style.scss";
import { useTranslation } from "react-i18next";
const AddressSelect = ({
    formik,
    field,
    label,
    options,
    handleValue,
    handleDisable,
    handleChange,
    feedback = true,
    location,
    locationField = "location",
}) => {

    const handleSelectChange = (event) => {
        formik.handleChange(event);
        if (location) {
            const coordinates = event.target.options[event.target.selectedIndex].dataset;
            formik.setFieldValue(locationField, [coordinates.lat, coordinates.lng]);
        }
    };

const {t} = useTranslation();

    return (
        <Form.Group className="form-select-class" controlId={field}>
            <Form.Label>{label}</Form.Label>
            <Form.Select
                className="select"
                name={field}
                value={handleValue === undefined ? formik.values[field] : handleValue}
                onBlur={formik.handleBlur}
                onChange={handleChange || handleSelectChange}
                isInvalid={feedback && isInValid(formik, field)}
                isValid={feedback && isValid(formik, field)}
                disabled={handleDisable}
            >

                <option disabled value={-1} >
                {t('addressSelect.select')} {/* {label} */}

                </option>

                {options &&
                    options.map((option) => (
                        <option
                            key={option.id}
                            value={option.id}
                            data-lat={option.location?.lat}
                            data-lng={option.location?.lng}
                        >
                            {option.title || option.name}
                        </option>
                    ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="formik-feedback">
                {formik.errors[field]}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default AddressSelect;
