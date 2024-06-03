import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import {
  deleteAdvert,
  findAdvertForAdmin,
  updateAdvertByAdmin,
} from "../../../../api/adverts-service";
import Spacer from "../../../common/spacer";
import AdvertAddress from "../../profile/advert-edit-new/advert-address";
import AdvertProperties from "../../profile/advert-edit-new/advert-properties";
import ButtonComponent from "../../../common/button-component";
import DisplayImages from "../../profile/advert-edit-new/display-images";
import AdvertEditImage from "../../profile/advert-edit-new/advert-edit-image";
import AdminAdvertEditCommon from "./admin-advert-edit-common";
import AdminAdvertEditTour from "./admin-advert-edit-tour";
import UserInfo from "./user-info";
import FieldWrapper from "../../../common/field-wrapper";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToast } from "../../../../store/providers/toast-provider";
import { getTourRequestCount } from "../../../../api/tour-requests-service";
import { getFavoritesCount } from "../../../../api/favorites-service";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { PiHandPalmDuotone } from "react-icons/pi";
import { HiOutlineTrash } from "react-icons/hi2";
import { MdEditNote } from "react-icons/md";
import './admin-adverts-edit.scss'
import { useTranslation } from "react-i18next";

const AdminAdvertsEdit = () => {
  const [loading, setLoading] = useState(false);
  const [flag, setflag] = useState(false);
  const [display, setDisplay] = useState([]);
  const [user, setUser] = useState({});
  const [favCount, setFavCount] = useState({});
  const [tourRequestCount, setTourRequestCount] = useState({});
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const id = location.state.id;

  //Backendden Status String olarak geliyor seçili olarak göstermek için buraya yazdık
  const statusForAdverts = [
    {
      id: 0,
      name: t("adminAdvertEditCommon.PENDING"),
    },
    {
      id: 1,
      name: t("adminAdvertEditCommon.ACTIVATED"),
    },
    {
      id: 2,
      name: t("adminAdvertEditCommon.REJECTED"),
    },
  ];

  //Advert getirme işlemi (location'Dan gelen id ile)
  const fetchAdvert = async (id) => {
    try {
      const resp = await findAdvertForAdmin(id);
      const fav = await fetchFavoritesCount(id);
      const tourReq = await fetchTourRequestCount(id);
      setFavCount(fav);
      setTourRequestCount(tourReq);
      setUser(resp);
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

  //Advert update işlemi (location'Dan gelen id ile)
  const editAdvert = (advert) => {
    return {
      statusForAdvert: findStatusIdByName(advert.statusForAdvert),
      slug: advert.slug,
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

  // responsedan gelen status name ile id bulma
  const findStatusIdByName = (statusName) => {
    const foundStatus = statusForAdverts.find(
      (status) => status.name === t(`adminAdvertEditCommon.${statusName}`)
    );
    return foundStatus ? foundStatus.id : null;
  };

  //advertin favori sayısını bulma
  const fetchFavoritesCount = async (id) => {
    try {
      const resp = await getFavoritesCount(id);
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  //advertin tour request sayısını bulma
  const fetchTourRequestCount = async (id) => {
    try {
      const resp = await getTourRequestCount(id);
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdvert(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  const initialValues = null;
  const validationSchema = Yup.object({
    title: Yup.string()
      .required(t("adminAdvertsEditTranslations.requiredTitle"))
      .min(5, t("adminAdvertsEditTranslations.minTitle", { min: 5 }))
      .max(150, t("adminAdvertsEditTranslations.maxTitle", { max: 150 })),
    desc: Yup.string()
      .required(t("adminAdvertsEditTranslations.requiredDescription"))
      .max(300, t("adminAdvertsEditTranslations.maxDescription", { max: 300 })),
    price: Yup.number()
      .required(t("adminAdvertsEditTranslations.requiredPrice"))
      .positive(t("adminAdvertsEditTranslations.positivePrice")),
    advertTypeId: Yup.number()
      .required(t("adminAdvertsEditTranslations.requiredAdvertTypeId"))
      .notOneOf([0], t("adminAdvertsEditTranslations.notOneOfAdvertTypeId")),
    categoryId: Yup.number()
      .required(t("adminAdvertsEditTranslations.requiredCategoryId"))
      .notOneOf([0], t("adminAdvertsEditTranslations.notOneOfCategoryId")),
    countryId: Yup.number()
      .required(t("adminAdvertsEditTranslations.requiredCountryId"))
      .notOneOf([0], t("adminAdvertsEditTranslations.notOneOfCountryId")),
    cityId: Yup.number()
      .required(t("adminAdvertsEditTranslations.requiredCityId"))
      .notOneOf([0], t("adminAdvertsEditTranslations.notOneOfCityId")),
    districtId: Yup.number()
      .required(t("adminAdvertsEditTranslations.requiredDistrictId"))
      .notOneOf([0], t("adminAdvertsEditTranslations.notOneOfDistrictId")),
    address: Yup.string()
      .required(t("adminAdvertsEditTranslations.requiredAddress"))
      .min(2, t("adminAdvertsEditTranslations.minAddress", { min: 2 }))
      .max(100, t("adminAdvertsEditTranslations.maxAddress", { max: 100 })),
    location: Yup.array()
      .of(Yup.number())
      .required(t("adminAdvertsEditTranslations.requiredLocation"))
      .min(2, t("adminAdvertsEditTranslations.minLocation", { min: 2 }))
      .max(2, t("adminAdvertsEditTranslations.maxLocation", { max: 2 })),
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
      await updateAdvertByAdmin(id, payload);
      showToast({
        severity: "success",
        summary: t("success.success"),
        detail: t("adminAdvertsEditTranslations.detailSuccessUpdated"),
        life: 2000,
      });
      navigate("/dashboard/adverts");
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

  const handleDelete = async (event) => {
    prettyConfirm({
      event: event,
      message: t("adminAdvertsEditTranslations.prettyConfirmMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => confirmDelete(id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: t("adminAdvertsEditTranslations.summaryWarn"),
          detail: t("adminAdvertsEditTranslations.detailWarn"),
          life: 2000,
          icon: <IoMdCheckmarkCircleOutline size={50} />,
        });
      },
    });
  };

  const confirmDelete = async (id) => {
    try {
      await deleteAdvert(id);
      showToast({
        severity: "success",
        summary: t("adminAdvertsEditTranslations.summarySuccessDeleted"),
        detail: t("adminAdvertsEditTranslations.detailSuccessDeleted"),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      navigate("/dashboard/adverts");
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
        icon: <TbFaceIdError size={50} />,
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
    <>
      {flag && (
        <div className="admin-adverts-edit-page">
          <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="admin-advert-edit-form"
          >
            <AdminAdvertEditCommon formik={formik} />
            <Spacer minHeight={50} />
            <AdvertAddress formik={formik} fluid={true} />
            <Spacer minHeight={50} />
            <AdvertProperties info={"Update"} formik={formik} fluid={true} />
            <Container className="admin-advert-edit-button-wrapper">
              <Button
                className="delete-button"
                variant="secondary"
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                <HiOutlineTrash size={20} />{t("adminAdvertsEditTranslations.buttonDelete")}
              </Button>

              <ButtonComponent
                className="submit-button"
                formik={formik}
                loading={loading}
                type="submit"
                text={t("adminAdvertsEditTranslations.buttonText")}
              >
                <MdEditNote size={20} />
              </ButtonComponent>
            </Container>
            <Spacer minHeight={50} />
            <UserInfo
              resp={user}
              favCount={favCount}
              tourRequestCount={tourRequestCount}
            />
            <Spacer />
          </Form>
          <FieldWrapper label={t("adminAdvertsEditTranslations.labelGalleries")}>
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
          </FieldWrapper>
          <Spacer minHeight={50} />
          <FieldWrapper label={t("adminAdvertsEditTranslations.labelTourRequests")}>
            <AdminAdvertEditTour />
          </FieldWrapper>
        </div>
      )}
    </>
  );
};

export default AdminAdvertsEdit;
