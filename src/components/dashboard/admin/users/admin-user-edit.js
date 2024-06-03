import React, { useState } from "react";
import ReactInputMask from "react-input-mask-next";
import ButtonLoader from "../../../common/button-loader";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateOneUser } from "../../../../api/user-service";
import { config } from "../../../../helpers/config";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { prettyConfirm } from '../../../../helpers/function/toast-confirm';
import { useToast } from '../../../../store/providers/toast-provider';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { HiArrowUturnLeft, HiOutlineTrash } from "react-icons/hi2";
import { useLocation } from 'react-router-dom';
import { TbFaceIdError } from "react-icons/tb";
import { PiHandPalmDuotone, PiUserSwitchFill } from 'react-icons/pi';
import "./admin-user-edit.scss";
import { useTranslation } from "react-i18next";
 
const AdminUserEdit = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const { t } = useTranslation();

  const initialValues = {
    firstName: location.state?.firstName,
    lastName: location.state?.lastName,
    phone: location.state?.phone,
    email: location.state?.email,
    role: location.state?.role
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(t("adminUserEditTranslations.firstNameRequired"))
      .min(1, t("adminUserEditTranslations.minFirstName", { min: 1 }))
      .max(50, t("adminUserEditTranslations.maxFirstName", { max: 50 })),
    lastName: Yup.string()
      .required(t("adminUserEditTranslations.lastNameRequired"))
      .min(1, t("adminUserEditTranslations.minLastName", { min: 1 }))
      .max(50, t("adminUserEditTranslations.maxLastName", { max: 50 })),
    phone: Yup.string()
      .required(t("adminUserEditTranslations.phoneRequired"))
      .matches(/\(\d{3}\) \d{3}-\d{4}/g, t("adminUserEditTranslations.phoneMatches")),
    email: Yup.string()
      .email(t("adminUserEditTranslations.email"))
      .max(50, t("adminUserEditTranslations.maxEmail", { max: 50 }))
      .required(t("adminUserEditTranslations.emailRequired", )),
    role: Yup.string().required(t("adminUserEditTranslations.roleRequired")),
  });
  
  const handleDelete = async (event) => {
    prettyConfirm({
      event: event,
      message: t("adminUserEditTranslations.prettyConfirmMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: 'danger',
      handleAccept: () => confirmDelete(),
      handleReject: () => {
        showToast({
          severity: 'warn',
          summary: t('adminUserEditTranslations.summaryWarn'),
          detail: t('adminUserEditTranslations.detailWarn'),
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(id);
      showToast({
        severity: 'success',
        summary: t('adminUserEditTranslations.summarySuccessDeleted'),
        detail: t('adminUserEditTranslations.detailSuccessDeleted'),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      })
      formik.resetForm();
      navigate("/dashboard/users");
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await updateOneUser(id, values);
      await showToast({
        severity: "success",
        summary: t("adminUserEditTranslations.summarySuccessSave"),
        detail: t("adminUserEditTranslations.detailSuccessSave"),
        life: 2000,
      });
      navigate("/dashboard/users");
    } catch (err) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(err.response.data)[0],
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
    enableReinitialize: true,
  });

  return (
    <div className="admin-user-edit-container">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row className="admin-user-edit-form">
          <Col xs={12} lg={6} className="input-group-wrapper">
            <Form.Group controlId="firstName" className="user-edit-input-group">
              <Form.Label className="">{t("adminUserEditTranslations.labelFirstName")} </Form.Label>
              <Form.Control
                className="user-edit-input"
                type="text"
                {...formik.getFieldProps("firstName")}
                isInvalid={isInValid(formik, "firstName")}
                isValid={isValid(formik, "firstName")}
              />
              <Form.Control.Feedback type="invalid" className="formik-feedback">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} lg={6} className="input-group-wrapper">
            <Form.Group controlId="lastName" className="user-edit-input-group">
              <Form.Label className="">{t("adminUserEditTranslations.labelLastName")} </Form.Label>
              <Form.Control
                className="user-edit-input"
                type="text"
                {...formik.getFieldProps("lastName")}
                isInvalid={isInValid(formik, "lastName")}
                isValid={isValid(formik, "lastName")}
              />
              <Form.Control.Feedback type="invalid" className="formik-feedback">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {/* </Row>
        <Row className="row-cols-1 row-cols-lg-3 me-0 mb-4"> */}
          <Col xs={12} lg={4} className="input-group-wrapper">
            <Form.Group controlId="phone" className="user-edit-input-group">
              <Form.Label>{t("adminUserEditTranslations.labelPhone")} </Form.Label>
              <Form.Control
                className="user-edit-input"
                as={ReactInputMask}
                mask="(999) 999-9999"
                type="text"
                placeholder="(XXX) XXX-XXXX"
                autoComplete="off"
                {...formik.getFieldProps("phone")}
                isValid={isValid(formik, "phone")}
                isInvalid={isInValid(formik, "phone")}
              />
              <Form.Control.Feedback type="invalid" className="formik-feedback">
                {formik.errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} lg={4} className="input-group-wrapper">
            <Form.Group controlId="email" className="user-edit-input-group">
              <Form.Label>{t("adminUserEditTranslations.labelEmail")}</Form.Label>
              <Form.Control
                className="user-edit-input"
                type="text"
                placeholder="Email"
                autoComplete="off"
                {...formik.getFieldProps("email")}
                isInvalid={isInValid(formik, "email")}
                isValid={isValid(formik, "email")}
              />
              <Form.Control.Feedback type="invalid" className="formik-feedback">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} lg={4} className="input-group-wrapper">
            <Form.Group controlId="role" className="user-edit-input-group">
              <Form.Label>{t("adminUserEditTranslations.labelRoles")}</Form.Label>
              <Form.Select
                className="user-edit-input"
                {...formik.getFieldProps("role")}
                isInvalid={isInValid(formik, "role")}
                isValid={isValid(formik, "role")}>
                {config?.selectRoles.roles.map((role) => (
                  <option key={role} value={role} >{role}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <div className='user-edit-button-wrapper'>
          <Button
            className="back-button"
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            <HiArrowUturnLeft size={20} />{t("adminUserEditTranslations.buttonBack")}
          </Button>
          <Button
            className="delete-button"
            type="button"
            onClick={(e) => {
              handleDelete(e);
            }}
            disabled={!formik.isValid || loading}
          >
            {loading ? <ButtonLoader /> : <HiOutlineTrash size={20} />} {t("adminUserEditTranslations.buttonDelete")}
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="update-button"
            disabled={!formik.isValid || loading}
          >
            {loading ? <ButtonLoader /> : <PiUserSwitchFill size={20} />} {t("adminUserEditTranslations.buttonUpdate")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminUserEdit;