import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { getAdvertTypes, getCategories } from "../../../../api/adverts-service";
import { getAllAdvertsReport } from "../../../../api/report-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { TbFaceIdError } from "react-icons/tb";
import "../reports/admin-reports.scss";
import { useTranslation } from "react-i18next";
import Status from "../../../../helpers/data/status";


const AdminAdvertsReport = () => {
  const [loading, setLoading] = useState(false);
  const [advertTypes, setAdvertTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { statusForAdverts } = Status();

  const fetchAdvertTypes = async () => {
    try {
      const data = await getAdvertTypes();
      setAdvertTypes([{ id: "", title: t("adminAdvertsReportTranslations.titleAll") }, ...data]);
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
      setCategories([{ id: "", title: t("adminAdvertsReportTranslations.titleAll") }, ...data]);
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

  const initialValues = {
    startDate: "",
    endDate: "",
    category: "",
    type: "",
    status: "",
  };

  const validationSchema = Yup.object({
    startDate: Yup.date(),
    endDate: Yup.date(),
    category: Yup.number(),
    type: Yup.number(),
    status: Yup.number(),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await getAllAdvertsReport(values);
      showToast({
        severity: 'success',
        summary: t('adminAdvertsReportTranslations.summarySuccess'),
        detail: t('adminAdvertsReportTranslations.detailSuccess'),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      })
    } catch (err) {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const errMsg = JSON.parse(event.target.result)?.message || "Error occurred";
        showToast({
          severity: "error",
          summary: t("error.error"),
          detail: errMsg,
          life: 2000,
          icon: <TbFaceIdError size={50} />,
        });
      };
      fileReader.readAsText(err.response.data);
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

  useEffect(() => {
    fetchAdvertTypes();
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="admin-reports-module">
      <div className="admin-report-form-wrapper">
        <Form className="admin-report-form" noValidate>
          <Row className="admin-report-title-row">
            <span className="admin-report-title">{t('adminAdvertsReportTranslations.adverts')} </span>
          </Row>
          <Row className="admin-report-form-row">
            <Col xs={12} xl={3} xxl={true} className="admin-report-form-col">
              <Form.Group className="form-group" controlId="startDate">
                <Form.Label>{t('adminAdvertsReportTranslations.labelStartDate')}</Form.Label>
                <Form.Control
                  type="date"
                  {...formik.getFieldProps("startDate")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} xxl={true} className="admin-report-form-col">
              <Form.Group className="form-group" controlId="endDate">
                <Form.Label>{t('adminAdvertsReportTranslations.labelEndDate')} </Form.Label>
                <Form.Control
                  type="date"
                  {...formik.getFieldProps("endDate")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} xl={6} xxl={true} className="admin-report-form-col">
              <Form.Group className="form-group" controlId="category">
                <Form.Label>{t('adminAdvertsReportTranslations.labelCategory')} </Form.Label>
                <Form.Select
                  {...formik.getFieldProps("category")}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {t(`bannerTranslations.${category.title}`, { defaultValue: category.title })}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={6} xxl={true} className="admin-report-form-col">
              <Form.Group className="form-group" controlId="type">
                <Form.Label>{t('adminAdvertsReportTranslations.labelAdvertType')}</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("type")}
                >
                  {advertTypes.map((type, index) => (
                    <option key={index} value={type.id}>
                      {t(`bannerTranslations.${type.title}`, { defaultValue: type.title })}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={6} xxl={true} className="admin-report-form-col">
              <Form.Group className="form-group" controlId="status">
                <Form.Label>{t('adminAdvertsReportTranslations.labelStatus')} </Form.Label>
                <Form.Select
                  {...formik.getFieldProps("status")}
                >
                  {statusForAdverts.map((status, index) => (
                    <option key={index} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="admin-report-button-wrapper" onClick={formik.handleSubmit}>
        {loading ? <Spinner animation="border" role="status" style={{ height: '50px', width: '50px', color: "orange" }} /> : <SiMicrosoftexcel />}
      </div>
    </Container>
  );
};

export default AdminAdvertsReport;