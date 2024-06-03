import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { getTourRequests } from "../../../../api/report-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { TbFaceIdError } from "react-icons/tb";
import "../reports/admin-reports.scss";
import { useTranslation } from "react-i18next";
import Status from "../../../../helpers/data/status";


const AdminTourRequestsReport = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { status } = Status();

  const initialValues = {
    startDate: "",
    endDate: "",
    status: "",
  };

  const validationSchema = Yup.object({
    startDate: Yup.date(),
    endDate: Yup.date(),
    status: Yup.number(),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await getTourRequests(values);
      showToast({
        severity: 'success',
        summary: t("adminTourRequestsReportTranslations.summarySuccess"),
        detail: t("adminTourRequestsReportTranslations.detailSuccess"),
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
            <span className="admin-report-title">{t("adminTourRequestsReportTranslations.adminReportTitle")}</span>
          </Row>
          <Row className="admin-report-form-row">
            <Col xs={12} xl={true} className="admin-report-form-col">
              <Form.Group className="form-group" controlId="startDate">
                <Form.Label>{t("adminTourRequestsReportTranslations.labelStartDate")} </Form.Label>
                <Form.Control
                  type="date"
                  {...formik.getFieldProps("startDate")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} xl={true} className="admin-report-form-col">
              <Form.Group className="form-group" controlId="endDate">
                <Form.Label>{t("adminTourRequestsReportTranslations.labelEndDate")} </Form.Label>
                <Form.Control
                  type="date"
                  {...formik.getFieldProps("endDate")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} xl={true} className="admin-report-form-col">
              <Form.Group className="form-group" controlId="status">
                <Form.Label>{t("adminTourRequestsReportTranslations.labelStatus")} </Form.Label>
                <Form.Select
                  className="form-group"
                  {...formik.getFieldProps("status")}
                >
                  {status.map((status, index) => (
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

export default AdminTourRequestsReport;
