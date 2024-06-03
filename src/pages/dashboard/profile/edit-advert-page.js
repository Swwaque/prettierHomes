import { useEffect, useState } from "react";
import {
  getAdvertById,
  updateAdvertByCustomer,
} from "../../../api/adverts-service";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import AdvertAddress from "../../../components/dashboard/profile/advert-edit-new/advert-address";
import AdvertProperties from "../../../components/dashboard/profile/advert-edit-new/advert-properties";
import ButtonComponent from "../../../components/common/button-component";
import AdvertEditCommon from "../../../components/dashboard/profile/advert-edit-new/advert-edit-common";
import DisplayImages from "../../../components/dashboard/profile/advert-edit-new/display-images";
import AdvertEditImage from "../../../components/dashboard/profile/advert-edit-new/advert-edit-image";
import AdvertEditTour from "../../../components/dashboard/profile/advert-edit-new/advert-edit-tour";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Container, Form } from "react-bootstrap";
import { TbHomeCog } from "react-icons/tb";
import { useToast } from "../../../store/providers/toast-provider";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


const EditAdvertPage = () => {
  const [loading, setLoading] = useState(false);
  const [flag, setflag] = useState(false);
  const [display, setDisplay] = useState([]);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const { t } = useTranslation();

  const fetchAdvert = async (id) => {
    try {
      const resp = await getAdvertById(id);
      const mappedAdvert = editAdvert(resp);
      formik.setValues(mappedAdvert);
      setDisplay([...resp.images]);
      setflag(true);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
      });
    }
  };
  const editAdvert = (advert) => {
    return {
      active: advert.active,
      advertTypeId: advert.advertType.id,
      categoryId: advert.category.id,
      propertyValues: advert.categoryPropertyValue.map((item) => item.value),
      countryId: advert.country.id,
      cityId: advert.city.id,
      districtId: advert.district.id,
      address: advert.address,
      title: advert.title,
      desc: advert.description,
      price: advert.price,
      location: [advert.location.lat, advert.location.lng],
    };
  };

  useEffect(() => {
    fetchAdvert(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  const initialValues = null;
  const validationSchema = Yup.object({
    title: Yup.string()
    .required(t("editAdvertPageTranslations.requiredTitle"))
    .min(5, t("editAdvertPageTranslations.titleMinLength"))
    .max(150, t("editAdvertPageTranslations.titleMaxLength")),
  desc: Yup.string()
    .required(t("editAdvertPageTranslations.requiredDesc"))
    .max(300, t("editAdvertPageTranslations.descMaxLength")),
  price: Yup.number()
    .required(t("editAdvertPageTranslations.requiredPrice"))
    .positive(t("editAdvertPageTranslations.pricePositive")),
  advertTypeId: Yup.number()
    .required(t("editAdvertPageTranslations.requiredAdvertTypeId"))
    .notOneOf([-1], t("editAdvertPageTranslations.advertTypeIdNotOneOf")),
  categoryId: Yup.number()
    .required(t("editAdvertPageTranslations.requiredCategory"))
    .notOneOf([-1], t("editAdvertPageTranslations.categoryIdNotOneOf")),
  countryId: Yup.number()
    .required(t("editAdvertPageTranslations.requiredCountry"))
    .notOneOf([-1], t("editAdvertPageTranslations.countryIdNotOneOf")),
  cityId: Yup.number()
    .required(t("editAdvertPageTranslations.requiredCity"))
    .notOneOf([-1], t("editAdvertPageTranslations.cityIdNotOneOf")),
  districtId: Yup.number()
    .required(t("editAdvertPageTranslations.requiredDistrict"))
    .notOneOf([-1], t("editAdvertPageTranslations.districtIdNotOneOf")),
  address: Yup.string()
    .required(t("editAdvertPageTranslations.requiredAddress"))
    .min(2, t("editAdvertPageTranslations.addressMinLength"))
    .max(100, t("editAdvertPageTranslations.addressMaxLength")),
  location: Yup.array()
    .of(Yup.number())
    .required(t("editAdvertPageTranslations.locationRequired"))
    .min(2, t("editAdvertPageTranslations.locationMinLength"))
    .max(2, t("editAdvertPageTranslations.locationMaxLength")),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      location: {
        lat: values.location[0],
        lng: values.location[1],
      },
    };
    try {
      await updateAdvertByCustomer(id, payload);
      showToast({
        severity: "success",
        summary: t("success.success"),
        detail: t("editAdvertPageTranslations.detail"),
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
      navigate(-1);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      {flag && (
        <>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <PageHeader title= {t("editAdvertPageTranslations.editAdvert")}/>
            <Spacer />
            <AdvertEditCommon formik={formik} />
            <Spacer minHeight={50} />
            <AdvertAddress formik={formik} />
            <Spacer minHeight={50} />
            <AdvertProperties info={"Update"} formik={formik} />
            <Container className="button-component">
              <ButtonComponent
                formik={formik}
                loading={loading}
                type="submit"
                text= {t("editAdvertPageTranslations.update")}
              >
                <TbHomeCog />
              </ButtonComponent>
            </Container>
            <Spacer />
          </Form>

          <AdvertEditImage
            advertId={id}
            setDisplay={setDisplay}
            display={display}
          />

          <DisplayImages
            display={display}
            setDisplay={setDisplay}
            advertId={id}
          />
          <Spacer />
          <AdvertEditTour />
          <Spacer />
        </>
      )}
    </>
  );
};

export default EditAdvertPage;
