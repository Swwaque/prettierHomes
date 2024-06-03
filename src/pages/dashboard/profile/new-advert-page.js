import React, { useState } from "react";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import AdvertCommon from "../../../components/dashboard/profile/advert-edit-new/advert-common";
import AdvertAddress from "../../../components/dashboard/profile/advert-edit-new/advert-address";
import AdvertProperties from "../../../components/dashboard/profile/advert-edit-new/advert-properties";
import AdvertImages from "../../../components/dashboard/profile/advert-edit-new/advert-images";
import ButtonComponent from "../../../components/common/button-component";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TbHomePlus } from "react-icons/tb";
import { saveAdvert } from "../../../api/adverts-service";
import { useToast } from "../../../store/providers/toast-provider";
import { useTranslation } from "react-i18next";

const NewAdvertPage = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    desc: "",
    price: 0.0,
    advertTypeId: -1,
    categoryId: -1,
    countryId: -1,
    cityId: -1,
    districtId: -1,
    address: "",
    location: [],
    propertyValues: [],
    images: [],
  };
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    title: Yup.string()
    .required(t("newAdvertPageTranslations.requiredTitle"))
    .min(5, t("newAdvertPageTranslations.minTitle", { min: 5 }))
    .max(150, t("newAdvertPageTranslations.maxTitle", { max: 150 })),
  desc: Yup.string()
    .required(t("newAdvertPageTranslations.requiredDesc"))
    .max(300, t("newAdvertPageTranslations.maxDescription", { max: 300 })),
  price: Yup.number()
    .required(t("newAdvertPageTranslations.requiredPrice"))
    .positive(t("newAdvertPageTranslations.pricePositive")),
  advertTypeId: Yup.number()
    .required(t("newAdvertPageTranslations.requiredAdvertTypeId"))
    .notOneOf([-1], t("newAdvertPageTranslations.advertTypeNotOneOf")),
  categoryId: Yup.number()
    .required(t("newAdvertPageTranslations.requiredCategory"))
    .notOneOf([-1], t("newAdvertPageTranslations.categoryNotOneOf")),
  countryId: Yup.number()
    .required(t("newAdvertPageTranslations.requiredCountry"))
    .notOneOf([-1], t("newAdvertPageTranslations.countryNotOneOf")),
  cityId: Yup.number()
    .required(t("newAdvertPageTranslations.requiredCity"))
    .notOneOf([-1], t("newAdvertPageTranslations.cityNotOneOf")),
  districtId: Yup.number()
    .required(t("newAdvertPageTranslations.requiredDistrict"))
    .notOneOf([-1], t("newAdvertPageTranslations.districtNotOneOf")),
  address: Yup.string()
    .required(t("newAdvertPageTranslations.requiredAddress"))
    .min(2, t("newAdvertPageTranslations.minAddress", { min: 2 }))
    .max(100, t("newAdvertPageTranslations.maxAddress", { max: 100 })),
  location: Yup.array()
    .of(Yup.number())
    .required(t("newAdvertPageTranslations.requiredLocation"))
    .min(2, t("newAdvertPageTranslations.minLocation", { min: 2 }))
    .max(2, t("newAdvertPageTranslations.maxLocation", { max: 2 })),
  images: Yup.array()
    .required(t("newAdvertPageTranslations.requiredImages"))
    .min(1, t("newAdvertPageTranslations.minImage", { min: 1 }))
    .max(10, t("newAdvertPageTranslations.maxImage", { max: 10 }))
    .test(
      "file-size",
      t("newAdvertPageTranslations.imagesTest2"),
      (value) => {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 3 * 1024 * 1024) {
            return false;
          }
        }
        return true;
      }
    )
    .of(
      Yup.mixed().test(
        "is-image",
        t("newAdvertPageTranslations.imagesMixedText2"),
        (value) =>
          value instanceof File && value.type.startsWith("image/")
      )
    ),
});

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      for (const image of formik.values.images) {
        formData.append("images", image);
      }

      const { images, ...rest } = values;
      const advert = {
        ...rest,
        location: { lat: rest.location[0], lng: rest.location[1] },
      };
      formData.append("advert", JSON.stringify(advert));

      await saveAdvert(formData);
      showToast({
        severity: 'success',
        summary: t('newAdvertPageTranslations.summarySuccess'),
        detail: t('newAdvertPageTranslations.detailSuccess'),
        life: 2000,

      })
      navigate("/my-adverts");
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
  });

  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <PageHeader title= {t("newAdvertPageTranslations.pageHeaderTitle")}/>
        <Spacer />
        <AdvertCommon formik={formik} />
        <Spacer minHeight={50} />
        <AdvertAddress formik={formik} />
        <Spacer minHeight={50} />
        <AdvertProperties formik={formik} />
        <Spacer />
        <AdvertImages formik={formik} field="images" />
        <Spacer />
        <Container className="button-component">
          <ButtonComponent
            formik={formik}
            loading={loading}
            type="submit"
            text= {t("newAdvertPageTranslations.buttonText")}
          >
            <TbHomePlus />
          </ButtonComponent>
        </Container>
        <Spacer />
      </Form>
    </>
  );
};

export default NewAdvertPage;
