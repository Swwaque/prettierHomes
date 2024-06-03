import React, { useEffect, useState } from "react";
import InputText from "../../../common/input-text";
import InputTextArea from "../../../common/input-text-area";
import { Col, Container, Row } from "react-bootstrap";
import { getAdvertTypes, getCategories } from "../../../../api/adverts-service";
import { useToast } from "../../../../store/providers/toast-provider";
import './advert-common.scss'
import { useTranslation } from "react-i18next";
import AdvertTypeSelect from "../../AdvertTypeSelect ";
import CategorySelect from "../../CategorySelect ";

const AdvertCommon = ({ formik }) => {
  const [advertTypes, setAdvertTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const fetchAdvertTypes = async () => {
    try {
      const data = await getAdvertTypes();
      setAdvertTypes(data);
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

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
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

  useEffect(() => {
    fetchAdvertTypes();
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="advert-common">
      <h5>{t("advertCommonTranslations.commonHeaderH5")}</h5>
      <Row>
        <Col>
          <InputText
            formik={formik}
            label={t("advertCommonTranslations.labelTitle")}
            type="text"
            field="title"
            placeholder={t("advertCommonTranslations.labelTitle")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputTextArea
            formik={formik}
            label={t("advertCommonTranslations.labelDescription")}
            field="desc"
            placeholder={t("advertCommonTranslations.placeholderDescription")}
          />
        </Col>
      </Row>

      <Row className=" row-cols-1 row-cols-lg-3 ">
        <Col>
          <InputText
            formik={formik}
            label={t("advertCommonTranslations.labelPrice")}
            type={"number"}
            field="price"
            placeholder={t("advertCommonTranslations.placeholderPrice")}
          />
        </Col>

        <Col>
          {
            //   advertTypes.length > 0 && (
            //   <InputSelect
            //     formik={formik}
            //     field={"advertTypeId"}
            //     label={t("advertCommonTranslations.labelAdvertType")}
            //     options={advertTypes}
            //   />

            <AdvertTypeSelect t={t} formik={formik} advertTypes={advertTypes} feedback={true} field={"advertTypeId"} />
          // )
          }

        </Col>
        <Col>
          {categories.length > 0 && (
            // <InputSelect
            //   formik={formik}
            //   field={"categoryId"}
            //   label={t("advertCommonTranslations.labelCategory")}
            //   options={categories}
            // />
            <CategorySelect t={t} formik={formik} categories={categories} feedback={true} field={"categoryId"}  />
          )
          }
        </Col>
      </Row>
    </Container>
  );
};

export default AdvertCommon;
