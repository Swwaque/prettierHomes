import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import PasswordInput from "../../../common/password-input";
import { changePassword } from "../../../../api/auth-service";
import ButtonLoader from "../../../common/button-loader";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../../../../store/providers/toast-provider";
import { MdOutlineSyncLock } from "react-icons/md";
import { HiKey, HiLockClosed, HiArrowPathRoundedSquare } from "react-icons/hi2";
import PasswordSuggestion from "../../../common/password-suggestion";
import { logout } from "../../../../store/slices/auth-slice"; 
import { useTranslation } from "react-i18next";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {t} = useTranslation();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: ""
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(t("changePasswordFormTranslations.currentPasswordRequired")),
    newPassword: Yup.string()
      .required(t("changePasswordFormTranslations.newPasswordRequired"))
      .matches(/[a-z]+/g, t("changePasswordFormTranslations.newPasswordMatchesLowerCase"))
      .matches(/[A-Z]+/g, t("changePasswordFormTranslations.newPasswordMatchesUpperCase"))
      .matches(/[\d+]+/g, t("changePasswordFormTranslations.newPasswordMatchesNumber"))
      .matches(/[!@#$%^&*()_+\-={};':"|,.<>?]+/, t("changePasswordFormTranslations.newPasswordMatchesSpecial"))
      .min(8, t("changePasswordFormTranslations.newPasswordMin", { min: 8 }))
      .max(30, t("changePasswordFormTranslations.newPasswordMax", { max: 30 })),
    repeatNewPassword: Yup.string()
      .required(t("changePasswordFormTranslations.repeatNewPasswordRequired"))
      .oneOf([Yup.ref("newPassword")], t("changePasswordFormTranslations.repeatNewPasswordOneOf")),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      resetForm();
      dispatch(logout()); 
      navigate("/login");
    } catch (error) {
      showToast({
        severity: "error",
        summary: t("changePasswordFormTranslations.summaryError"),
        detail: Object.values(error.response.data)[0],
        life: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className='profile-form-container'>
      <Row>
        <Col xs={12} lg={5} className='p-0'>
          <PasswordSuggestion formik={formik} field={"newPassword"} />
        </Col>
        <Col xs={12} lg={7} className='profile-form-main'>
          <div className="form-wrapper">
            <Form
              className="profile-form"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <PasswordInput
                placeholder= {t("changePasswordFormTranslations.placeholderPassword")}
                formik={formik}
                field="currentPassword"
              >
                <HiKey />
              </PasswordInput>
              <PasswordInput
                placeholder={t("changePasswordFormTranslations.placeholderNewPassword")}
                formik={formik}
                field="newPassword"
              >
                <HiLockClosed />
              </PasswordInput>
              <PasswordInput
                placeholder= {t("changePasswordFormTranslations.placeholderConfirmPassword")}
                formik={formik}
                field="repeatNewPassword"
              >
                <HiArrowPathRoundedSquare />
              </PasswordInput>
              <div className='form-submit-button'>
                <Button
                  variant="secondary"
                  type="submit"
                  className="submit-button"
                  disabled={!(formik.isValid) || loading}>
                  {loading ? <ButtonLoader size={20} /> : <MdOutlineSyncLock size={20} />} {t("changePasswordFormTranslations.buttonChange")}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePasswordForm;