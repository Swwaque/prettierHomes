import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { getAdvertTypes, getCategories } from "../../../../api/adverts-service";
import { useToast } from "../../../../store/providers/toast-provider";
import InputText from "../../../common/input-text";
import InputTextArea from "../../../common/input-text-area";
import "./advert-edit-common.scss";
import { useTranslation } from "react-i18next";
import AdvertTypeSelect from "../../AdvertTypeSelect ";
import CategorySelect from "../../CategorySelect ";

const AdvertEditCommon = ({ formik }) => {
  const [advertTypes, setAdvertTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();
  const {t} = useTranslation();

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
    <Container className="advert-edit-common">
      <h5>{t("advertEditCommonTranslations.commonHeaderH5")} </h5>
      <Row>
        <Col>
          <InputText
            formik={formik}
            label={t("advertEditCommonTranslations.labelTitle")}
            type="text"
            field="title"
            placeholder={t("advertEditCommonTranslations.placeholderTitle")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputTextArea
            formik={formik}
            label={t("advertEditCommonTranslations.labelDescription")}
            field="desc"
            placeholder={t("advertEditCommonTranslations.placeholderDescription")}
          />
        </Col>
      </Row>
      <Row className=" row-cols-1 row-cols-md-2 row-cols-lg-4">
        <Col>
          <InputText
            formik={formik}
            label={t("advertEditCommonTranslations.labelPrice")}
            type={"number"}
            field="price"
            placeholder={t("advertEditCommonTranslations.placeholderPrice")}
          />
        </Col>
        <Col>
          {advertTypes.length > 0 && (
            // <InputSelect
            //   formik={formik}
            //   field={"advertTypeId"}
            //   label={t("advertEditCommonTranslations.labelAdvertType")}
            //   options={advertTypes}
            // />
            <AdvertTypeSelect t={t} formik={formik} advertTypes={advertTypes} feedback={true} field={"advertTypeId"}  />
          )}
        </Col>
        <Col>
          {categories.length > 0 && (
            // <InputSelect
            //   formik={formik}
            //   field={"categoryId"}
            //   label={t("advertEditCommonTranslations.labelCategory")}
            //   options={categories}
            // />
            <CategorySelect t={t} formik={formik} categories={categories} feedback={true} field={"categoryId"} />
          )}
        </Col>
        <Col className="check-switch">
          <Form.Group controlId="custom-switch">
            <Form.Label>{t("advertEditCommonTranslations.formLabel")} </Form.Label>
            <Form.Check
              className="custom-switch"
              type="switch"
              checked={formik.values.active}
              {...formik.getFieldProps("active")}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default AdvertEditCommon;
