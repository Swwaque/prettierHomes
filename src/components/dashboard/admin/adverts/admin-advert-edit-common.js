import React, { useEffect, useState } from "react";
import InputText from "../../../common/input-text";
import InputTextArea from "../../../common/input-text-area";
import InputSelect from "../../../common/input-select";
import { Col,Container, Row } from "react-bootstrap";
import { getAdvertTypes, getCategories } from "../../../../api/adverts-service";
import { useToast } from "../../../../store/providers/toast-provider";
import './admin-advert-edit-common.scss'
import { useTranslation } from "react-i18next";
import CategorySelect from "../../CategorySelect ";
import AdvertTypeSelect from "../../AdvertTypeSelect ";

const AdminAdvertEditCommon = ({ formik }) => {
  const [advertTypes, setAdvertTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();
  const {t} = useTranslation();

  //Edit kısmında seçili göstermek için kullandık burda ise options kısmı için kullandık
  const statusForAdverts = [
    {
      id: 0,
      name: t("advertStatus.statusForAdvertsId1"),
    },
    {
      id: 1,
      name: t("advertStatus.statusForAdvertsId2"),
    },
    {
      id: 2,
      name: t("advertStatus.statusForAdvertsId3"),
    },
  ];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="admin-advert-edit-common-container" fluid>
      <Row>
        <Col>
          <InputText
            formik={formik}
            label= {t("adminAdvertEditCommon.labelTitle")}
            type="text"
            field="title"
            placeholder={t("adminAdvertEditCommon.placeholderTitle")}
          />
        </Col>
      </Row>
      <Row style={{ pointerEvents: "none" }}>
        <Col>
          <InputText
            formik={formik}
            label= {t("adminAdvertEditCommon.labelSluq")}
            type="text"
            field="slug"
            placeholder={t("adminAdvertEditCommon.placeholderSluq")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputTextArea
            formik={formik}
            label={t("adminAdvertEditCommon.labelDescription")}
            field="desc"
            placeholder={t("adminAdvertEditCommon.placeholderDescription")}
          />
        </Col>
      </Row>
      <Row className=" row-cols-1 row-cols-md-2 row-cols-lg-4">
        <Col>
          <InputText
            formik={formik}
            label={t("adminAdvertEditCommon.labelPrice")}
            type={"number"}
            field="price"
            placeholder={t("adminAdvertEditCommon.placeholderPrice")}
          />
        </Col>
        <Col>
          <InputSelect
            formik={formik}
            field={"statusForAdvert"}
            label={t("adminAdvertEditCommon.labelStatus")}
            options={statusForAdverts}
          />
        </Col>
        <Col>
          {
            advertTypes.length > 0 && (
            // <InputSelect
            //   formik={formik}
            //   field={"advertTypeId"}
            //   label={t("adminAdvertEditCommon.labelAdvertType")}
            //   options={advertTypes}
            //   />
          <AdvertTypeSelect t={t} formik={formik} advertTypes={advertTypes} field={"advertTypeId"}/>
          )
          }
        </Col>
        <Col>
          {categories.length > 0 && (
            // <InputSelect
            //   formik={formik}
            //   field={"categoryId"}
            //   label={t("adminAdvertEditCommon.labelCategory")}
            //   options={categories}
            // />
            <CategorySelect t={t} formik={formik} categories={categories} field={"categoryId"}/>
            )
        }
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAdvertEditCommon;
