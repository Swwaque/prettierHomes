import React, { useState } from "react";
import ButtonComponent from "../../../common/button-component";
import InputText from "../../../common/input-text";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { saveAdvertType } from "../../../../api/advert-type-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { useNavigate } from "react-router";
import { HiArrowUpCircle, HiArrowUturnLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const AdminAdvertTypeNew = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    title: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required(t("adminAdvertTypeNew.requiredTitle"))
      .min(2, t("adminAdvertTypeNew.minTitle", { min: 2 }))
      .max(50, t("adminAdvertTypeNew.maxTitle", { max: 50 })),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await saveAdvertType(values);
      await showToast({
        severity: "success",
        summary: t("adminAdvertTypeNew.summarySuccess"),
        detail: t("adminAdvertTypeNew.detailSuccess"),
        life: 2000,
      });
      navigate("/dashboard/advert-types");
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
  });

  return (
    <>
      <div className="admin-new-advert-type-container">
        <Form noValidate onSubmit={formik.handleSubmit}>
          <InputText
            formik={formik}
            label={t("adminAdvertTypeNew.labelTitle")}
            field="title"
            type={"text"}
          />
          <div className="button-wrapper">
            <Button
              className="back-button"
              variant="secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              <HiArrowUturnLeft size={20} /> {t("adminAdvertTypeNew.buttonBack")}
            </Button>
            <ButtonComponent
              formik={formik}
              loading={loading}
              type="submit"
              text={t("adminAdvertTypeNew.buttonTextCreate")}
              style={{/*Just for override*/ }}
            >
              <HiArrowUpCircle />
            </ButtonComponent>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AdminAdvertTypeNew;
