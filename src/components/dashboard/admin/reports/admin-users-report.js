import { React, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getUsers } from "../../../../api/report-service";
import { config } from "../../../../helpers/config";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { TbFaceIdError } from "react-icons/tb";
import "../reports/admin-reports.scss";
import { useTranslation } from "react-i18next";

const AdminUsersReport = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const initialValues = {
    role: "ADMIN",
  };

  const validationSchema = Yup.object({
    role: Yup.string().required(t("adminUserReportTranslations.roleRequired")),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await getUsers(values.role);
      showToast({
        severity: 'success',
        summary: t('adminUserReportTranslations.summarySuccess'),
        detail: t("adminUserReportTranslations.detailSuccess"),
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
            <span className="admin-report-title"> {t("adminUserReportTranslations.adminReportTitle")}</span>
          </Row>
          <Row className="admin-report-form-row">
            <Col className="admin-report-form-col">
              <Form.Group className="form-group" controlId="role">
                <Form.Label>{t("adminUserReportTranslations.labelRole")} </Form.Label>
                <Form.Select
                  {...formik.getFieldProps("role")}
                >
                  {config?.selectRoles.roles.map((role, index) => (
                    <option key={index} value={role}>
                      {t(`role.${role}`)}
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

export default AdminUsersReport;
