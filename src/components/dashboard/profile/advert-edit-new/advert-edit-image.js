import React, { useState } from "react";
import AdvertImages from "./advert-images";
import ButtonComponent from "../../../common/button-component";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Container, Form } from "react-bootstrap";
import { uploadImage } from "../../../../api/image-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { TbUpload } from "react-icons/tb";
import "./advert-edit-image.scss";
import { useTranslation } from "react-i18next";

const AdvertEditImage = ({ advertId, setDisplay, display }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const initialValues = {
    attach: [],
  };

  const validationSchema = Yup.object({
    attach: Yup.array()
      .required(t("advertEditImageTranslations.attachRequired"))
      .min(1, t("advertEditImageTranslations.min", { min: 1 }))
      .max(
        10 - display.length,
        10 - display.length === 0
          ? t("advertEditImageTranslations.maxOne")
          : t("advertEditImageTranslations.maxTwo", { max: 10 - display.length })
      )
      .test("is-image", t("advertEditImageTranslations.testTwo"), (value) =>
        value.every(
          (file) => file instanceof File && file.type.startsWith("image/")
        )
      )
      .test("file-size", t("advertEditImageTranslations.testFour"), (value) => {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 3 * 1024 * 1024) {
            return false;
          }
        }
        return true;
      }),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      for (const image of values.attach) {
        formData.append("images", image);
      }

      formData.append("advert", advertId);

      const resp = await uploadImage(formData);

      setDisplay((prev) => [...prev, ...resp]);
      showToast({
        severity: "success",
        summary: t('success.success'),
        detail: t('advertEditImageTranslations.detailSuccess'),
        life: 2000,
        icon: "pi pi-check-circle",
      });

      formik.resetForm();
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t('error.error'),
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

  return (
    <Container className="advert-edit-image-container">
      <Form onSubmit={formik.handleSubmit} noValidate>
        <AdvertImages field={"attach"} formik={formik} />
        <div className="edit-image-button">
          <ButtonComponent
            formik={formik}
            loading={loading}
            type="submit"
            text= {t('advertEditImageTranslations.upload')} 
            style={{
              width: "110px",
              padding: "10px 15px",
              borderRadius: "10px",
            }}
          >
            <TbUpload />
          </ButtonComponent>
        </div>
      </Form>
    </Container>
  );
};

export default AdvertEditImage;
