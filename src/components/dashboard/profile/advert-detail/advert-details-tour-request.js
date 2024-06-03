import React, { useState } from "react";
import ButtonLoader from "../../../common/button-loader";
import AuthTourModal from "../../../common/auth-tour-modal";
import * as Yup from "yup";
import { saveTourRequest } from "../../../../api/adverts-service";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { formatTime } from "../../../../helpers/function/date-time";
import { useToast } from "../../../../store/providers/toast-provider";
import { FaPeopleRoof } from "react-icons/fa6";
import "./advert-details-tour-request.scss";
import moment from "moment";
import { useTranslation } from "react-i18next";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ["00", "30"]) {
      const time = `${hour.toString().padStart(2, "0")}:${minute}`;
      options.push(time);
    }
  }
  return options;
};

const AdvertDetailsTourRequest = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isUserLogin } = useSelector((state) => state.auth);
  const { advertDetails } = useSelector((state) => state.misc);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const initialValues = {
    advertId: advertDetails ? advertDetails.id : "",
    tourDate: "",
    tourTime: "",
  };

  const validationSchema = Yup.object({
    tourDate: Yup.date().required(t("advertTourRequestTranslations.tourDate")),
    tourTime: Yup.string().required(t("advertTourRequestTranslations.tourTime")),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    if (!isUserLogin) {
      setLoading(false);
      setShowModal(true);
    } else {
      const payload = {
        ...values,
        tourTime: formatTime(values.tourTime),
      };
      try {
        await saveTourRequest(payload);
        resetForm();
        showToast({
          severity: "success",
          summary: t("advertTourRequestTranslations.summarySuccess"),
          detail: t("advertTourRequestTranslations.detailSuccess"),
          life: 2000,
        });
      } catch (err) {
        const errMsg = Object.values(err.response.data)[0];
        showToast({
          severity: "error",
          summary: t("error.error"),
          detail: errMsg,
          life: 2000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <Container className="advert-details-tour-request-container">
      <Form className="advert-tour-request-form" onSubmit={formik.handleSubmit}>
        <div className="form-header">
          <h3>{t("advertTourRequestTranslations.titleH2")} </h3>
          <h6>{t("advertTourRequestTranslations.subTitleH6")}</h6>
        </div>
        <div className="tour-request-tip">
          <p>
            {t("advertTourRequestTranslations.reminder")}
          </p>
        </div>
        <div className="tour-request-form-group-wrapper mb-4">
          <Form.Group
            className="advert-tour-request-form-group"
            controlId="tourDate"
          >
            <Form.Label>{t("advertTourRequestTranslations.formTextDate")} </Form.Label>
            <Form.Control
              type="date"
              {...formik.getFieldProps("tourDate")}
              isInvalid={isInValid(formik, "tourDate")}
              isValid={isValid(formik, "tourDate")}
              min={moment().add(1, 'day').format('YYYY-MM-DD')}
            />
            <Form.Control.Feedback type="invalid" className="form-feedback">
              {formik.errors.tourDate}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="tour-request-form-group-wrapper mb-4">
          <Form.Group
            className="advert-tour-request-form-group"
            controlId="tourTime"
          >
            <Form.Label>{t("advertTourRequestTranslations.formTextTime")} </Form.Label>
            <Form.Control
              as="select"
              className={`${isInValid(formik, "tourTime") ? "is-invalid" : ""
                } ${isValid(formik, "tourTime") ? "is-valid" : ""}`}
              {...formik.getFieldProps("tourTime")}
            >
              <option className="" value="" label="-- : --"  disabled/>
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid" className="form-feedback">
              {formik.errors.tourTime}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="tour-request-form-button-wrapper">
          <Button
            variant="danger"
            type="submit"
            disabled={!formik.isValid || loading}
          >
            {loading ? <ButtonLoader /> : <FaPeopleRoof />} {t("advertTourRequestTranslations.loading")}
          </Button>
        </div>
      </Form>
      <AuthTourModal show={showModal} onHide={() => setShowModal(false)} />
    </Container>
  );
};

export default AdvertDetailsTourRequest;
