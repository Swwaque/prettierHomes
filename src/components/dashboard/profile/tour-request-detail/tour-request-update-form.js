import React, { useEffect, useState } from "react";
import ButtonLoader from "../../../common/button-loader";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { formatTime } from "../../../../helpers/function/date-time";
import { tourRequestCancel, tourRequestUpdate } from "../../../../api/tour-requests-service";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../../../store/providers/toast-provider";
import { Tag } from "primereact/tag";
import { useTranslation } from "react-i18next";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { HiArrowUturnLeft, HiOutlineTrash, HiXMark } from "react-icons/hi2";
import { PiHandPalmDuotone } from "react-icons/pi";
import { t } from "i18next";
import "../tour-request-detail/tour-request-update-form.scss";

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

const TourRequestUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const { refresher } = useSelector((state) => state.misc);
  const { showToast } = useToast();
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tr = location.state;
  const id = tr?.id;
  const formatedPrice = tr?.advert?.price.toLocaleString();


  const advertAddress = () => {
    return tr?.advert?.district?.name + ", " +
      tr?.advert?.city?.name + ", " +
      tr?.advert?.country?.name;
  };

  const getTagStyle = (status) => {
    switch (status) {
      case 'PENDING':
        return '#f18506';
      case 'APPROVED':
        return '#61c141';
      case 'DECLINED':
        return '#ec4747';
      default:
        return null;
    }
  };

  const initialValues = {
    ...tr,
    tourDate: tr?.tourDate,
    tourTime: formatTime(tr?.tourTime),
    advertId: tr.id,
  };

  const validationSchema = Yup.object({
    tourDate: Yup.date().required(t("tourRequestUpdateFormTranslations.tourDateRequired")),
    tourTime: Yup.string().required(t("tourRequestUpdateFormTranslations.tourTimeRequired")),
  });

  const tourRequestCancelConfirm = (event) => {
    prettyConfirm({
      event: event,
      message: "Are you sure you want to cancel this tour request?",
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleCancel(),
    });
  };

  const handleCancel = async () => {
    try {
      await tourRequestCancel(id);
      showToast({
        severity: "success",
        summary: t("tourRequestUpdateFormTranslations.summarySuccessCancel"),
        detail: t("tourRequestUpdateFormTranslations.detailSuccessCancel"),
        life: 2000,
      });
      navigate("/my-tour-requests");
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
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      tourTime: formatTime(values.tourTime),
    };
    try {
      await tourRequestUpdate(id, payload);
      showToast({
        severity: "success",
        summary: t("tourRequestUpdateFormTranslations.summarySuccess"),
        detail: t("tourRequestUpdateFormTranslations.detailSuccess"),
        life: 2000,
      });
      navigate("/my-tour-requests");
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
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => { }, [refresher]);

  return (
    <div className="tour-request-update-container">
      <div className="advert-status-info">
        <div className="title-address">
          <h5 className="title">
            {tr?.advert?.title}
          </h5>
          <div className="address">
            {advertAddress()}
          </div>
          <div className="tour-status">
            <Tag
              value={t(`statusForTourRequest.${tr?.status}`)}
              className="tour-request-tag"
              style={{ backgroundColor: getTagStyle(tr?.status) }}
            />
          </div>
        </div>
        <div className="price">
          {`$${tr.advert?.price.toLocaleString()}`}
        </div>
      </div>

      <Form className="tour-request-update-form" onSubmit={formik.handleSubmit}>
        <div className='tour-date-time'>
          <Form.Group className='form-group-date' controlId="tourDate">
            <Form.Text>{t("tourRequestUpdateFormTranslations.tourDate")}</Form.Text>
            <Form.Control
              type="date"
              {...formik.getFieldProps("tourDate")}
              isInvalid={isInValid(formik, "tourDate")}
              isValid={isValid(formik, "tourDate")}
              min={new Date().toISOString().split("T")[0]}
              disabled={tr?.status === "CANCELED" || tr?.status === "APPROVED"}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.tourDate}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className='form-group-time' controlId="tourTime">
            <Form.Text>{t("tourRequestUpdateFormTranslations.tourTime")} </Form.Text>
            <Form.Control
              as="select"
              className={`${isInValid(formik, "tourTime") ? "is-invalid" : ""
                } ${isValid(formik, "tourTime") ? "is-valid" : ""}`}
              {...formik.getFieldProps("tourTime")}
              isInvalid={isInValid(formik, "tourTime")}
              isValid={isValid(formik, "tourTime")}
              disabled={tr?.status === "CANCELED" || tr?.status === "APPROVED"}
            >
              {tr?.tourTime && (
                <option
                  key={tr?.tourTime}
                  value={tr?.tourTime}
                >
                  {tr?.tourTime}
                </option>
              )}
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.tourTime}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </Form>

      <div className='button-wrapper'>
        <Button
          className="back-button"
          variant="secondary"
          type="button"
          onClick={() => navigate(-1)}
        >
          <HiArrowUturnLeft size={20} />{t("tourRequestDetail.back")}
        </Button>

        {tr.status === "CANCELED"
          ?
          null
          :
          tr.status === "APPROVED"
            ?
            <Button
              className="cancel-button"
              onClick={(e) => tourRequestCancelConfirm(e)}
              variant="danger"
              type="button"
              disabled={!formik.isValid || loading}
            >
              {loading ? <ButtonLoader /> : <HiXMark size={20} />} {t("tourRequestUpdateFormTranslations.buttonCancel")?.toUpperCase()}
            </Button>
            :
            <Button
              className="update-button"
              variant="warning"
              type="button"
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || loading}
            >
              {loading ? <ButtonLoader /> : <HiOutlineTrash size={20} />}{t("tourRequestUpdateFormTranslations.buttonUpdate")?.toUpperCase()}
            </Button>
        }
      </div>
    </div>
  );
};

export default TourRequestUpdateForm;
