import { React, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { getMostPopularReport } from "../../../../api/report-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { TbFaceIdError } from "react-icons/tb";
import "../reports/admin-reports.scss";
import { useTranslation } from "react-i18next";

const AdminMostPopularReport = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const initialValues = {
    amount: 0,
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .required(t("adminMostPopularReportTranslations.amountRequired"))
      .positive(t("adminMostPopularReportTranslations.amountPositive"))
    ,
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await getMostPopularReport(values.amount);
      showToast({
        severity: 'success',
        summary: t('adminMostPopularReportTranslations.summarySuccess'),
        detail: t('adminMostPopularReportTranslations.detailSuccess'),
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

  return (
    <Container className="admin-reports-module">
      <div className="admin-report-form-wrapper">
        <Form className="admin-report-form" noValidate >
          <Row className="admin-report-title-row">
            <span className="admin-report-title">{t("adminMostPopularReportTranslations.adminReportTitle")} </span>
          </Row>
          <Row className="admin-report-form-row">
            <Col className="admin-report-form-col">
              <Form.Group className="form-group" controlId="amount">
                <Form.Label>{t("adminMostPopularReportTranslations.labelAmount")} </Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("amount")}
                  isInvalid={isInValid(formik, "amount")}
                  isValid={isValid(formik, "amount")}
                />
                <Form.Control.Feedback type="invalid" className="formik-feedback">
                  {formik.errors.amount}
                </Form.Control.Feedback>
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

export default AdminMostPopularReport;
