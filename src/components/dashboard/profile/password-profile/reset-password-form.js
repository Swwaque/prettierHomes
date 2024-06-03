import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import PasswordInput from "../../../common/password-input";
import ButtonLoader from "../../../common/button-loader";
import PasswordSuggestion from "../../../common/password-suggestion";
import { resetPassword } from "../../../../api/auth-service";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { useNavigate } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { useToast } from "../../../../store/providers/toast-provider";
import "../../../login-reqister/auth-form.scss";
import { useTranslation } from "react-i18next";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {t} = useTranslation();

  const initialValues = {
    code: "",
    password: "",
  };

  const validationSchema = Yup.object({
    code: Yup.string().required(t("resetPasswordFormTranslations.codeRequired")),
    password: Yup.string()
      .required(t("resetPasswordFormTranslations.passwordRequired"))
      .min(8, t("resetPasswordFormTranslations.minPassword", { min: 8 }))
      .max(30, t("resetPasswordFormTranslations.maxPassword", { max: 30 }))
      .matches(/[a-z]+/g, t("resetPasswordFormTranslations.matchesPasswordlower"))
      .matches(/[A-Z]+/g, t("resetPasswordFormTranslations.matchesPasswordUpper"))
      .matches(/[\d+]+/g, t("resetPasswordFormTranslations.matchesPasswordOneNumber"))
      .matches(/[!@#$%^&*()_+\-={};':"|,.<>?]+/, t("resetPasswordFormTranslations.matchesPasswordSpecial")),
    confirmPassword: Yup.string()
      .required(t("resetPasswordFormTranslations.confirmPasswordRequired"))
      .oneOf([Yup.ref("password")], t("resetPasswordFormTranslations.oneOfConfirmPassword")),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await resetPassword(values);
      resetForm();
      navigate("/login");
    } catch (error) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(error.response.data)[0],
        life: 3000,
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
    <Container>
      <div className='auth-form-container'>
        <Row>
          <Col xs={12} lg={5} className='p-0'>
            <PasswordSuggestion formik={formik} field={"password"} />
          </Col>
          <Col xs={12} lg={7} className='auth-form-main'>
            <div className="form-wrapper">
              <Form
                className="auth-form"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <InputGroup className="mb-4" >
                  <InputGroup.Text className={`${isInValid(formik, "code") ? "invalid" : ""}`}>
                    <MdPassword />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    type="text"
                    placeholder= {t("resetPasswordFormTranslations.placeholderCode")}
                    {...formik.getFieldProps("code")}
                    isInvalid={isInValid(formik, "code")}
                    isValid={isValid(formik, "code")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.code}
                  </Form.Control.Feedback>
                </InputGroup>

                <PasswordInput
                  formik={formik}
                  field="password"
                />

                <PasswordInput
                  placeholder= {t("resetPasswordFormTranslations.placeholderConfirmPassword")}
                  formik={formik}
                  field="confirmPassword"
                />

                <div className="form-submit-button">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="submit-button"
                    disabled={!formik.isValid || loading}
                  >
                    {loading ? (
                      <ButtonLoader size={20} />
                    ) : (
                      <MdLockReset size={20} />
                    )}
                    {t("resetPasswordFormTranslations.buttonResetPassword")}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ResetPasswordForm;
