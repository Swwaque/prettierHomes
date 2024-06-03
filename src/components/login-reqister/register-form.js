import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import ReactInputMask from "react-input-mask-next";
import PasswordSuggestion from '../common/password-suggestion'
import * as Yup from "yup";
import PasswordInput from "../common/password-input";
import ButtonLoader from "../common/button-loader";
import { Link, useNavigate } from "react-router-dom";
import { isValid, isInValid } from "../../helpers/function/forms";
import { register } from "../../api/auth-service";
import { useToast } from "../../store/providers/toast-provider";
import  SideContent  from "../../helpers/config/side-content";
import { HiEnvelope, HiUser, HiPhone } from "react-icons/hi2";
import { PiUserCirclePlusFill } from "react-icons/pi";
import "./auth-form.scss";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const {promotion} = SideContent();

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    email: "",
    confirmPassword: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(t("registerFormTranslations.requiredFirstName"))
      .min(1, t("registerFormTranslations.minLength", { min: 1 }))
      .max(50, t("registerFormTranslations.maxLength", { max: 50 })),
    lastName: Yup.string()
      .required(t("registerFormTranslations.requiredLastName"))
      .min(1, t("registerFormTranslations.minLength", { min: 1 }))
      .max(50, t("registerFormTranslations.maxLength", { max: 50 })),
    phone: Yup.string()
      .required(t("registerFormTranslations.requiredPhone"))
      .matches(/\(\d{3}\) \d{3}-\d{4}/g, t("registerFormTranslations.invalidPhone")),
    password: Yup.string()
      .required(t("registerFormTranslations.requiredPassword"))
      .min(8, t("registerFormTranslations.minLength", { min: 8 }))
      .max(30, t("registerFormTranslations.maxLength", { max: 30 }))
      .matches(/[a-z]+/g, t("registerFormTranslations.lowercasePassword"))
      .matches(/[A-Z]+/g, t("registerFormTranslations.uppercasePassword"))
      .matches(/[\d+]+/g, t("registerFormTranslations.numberPassword"))
      .matches(/[!@#$%^&*()_+\-={};':"|,.<>?]+/, t("registerFormTranslations.specialCharPassword")),
    email: Yup.string()
      .email(t("registerFormTranslations.invalidEmail"))
      .max(50, t("registerFormTranslations.maxEmail", { max: 50 }))
      .required(t("registerFormTranslations.requiredEmail")),
    confirmPassword: Yup.string()
      .required(t("registerFormTranslations.requiredConfirmPassword"))
      .oneOf([Yup.ref("password")], t("registerFormTranslations.oneOfConfirmPassword")),
    terms: Yup.bool().oneOf([true], t("registerFormTranslations.termsBoolOneOf")).required(),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await register(values);
      resetForm();
      showToast({
        severity: "success",
        summary: t('success.success'),
        detail: t("registerFormTranslations.detailSuccess"),
        sticky: true,
      })
      navigate("/login");
    } catch (error) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(error.response.data)[0],
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
  });

  return (
    <Container>
      <div className='auth-form-container'>
        <Row>
          <Col xs={12} lg={6} className='auth-form-main'>
            <div className="form-wrapper">
              <Form
                className="auth-form"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <InputGroup className="mb-4">
                  <InputGroup.Text className={`${isInValid(formik, "firstName") ? "invalid" : ""}`}>
                    <HiUser />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    type="text"
                    placeholder= {t("registerFormTranslations.firstNamePlaceholder")}
                    {...formik.getFieldProps("firstName")}
                    isInvalid={isInValid(formik, "firstName")}
                    isValid={isValid(formik, "firstName")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroup.Text className={`${isInValid(formik, "lastName") ? "invalid" : ""}`}>
                    <HiUser />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    type="text"
                    placeholder={t("registerFormTranslations.lastNamePlaceholder")}
                    {...formik.getFieldProps("lastName")}
                    isInvalid={isInValid(formik, "lastName")}
                    isValid={isValid(formik, "lastName")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroup.Text className={`${isInValid(formik, "phone") ? "invalid" : ""}`}>
                    <HiPhone />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    as={ReactInputMask}
                    mask="(999) 999-9999"
                    type="text"
                    placeholder="(XXX) XXX-XXXX"
                    autoComplete="off"
                    {...formik.getFieldProps("phone")}
                    isValid={isValid(formik, "phone")}
                    isInvalid={isInValid(formik, "phone")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.phone}
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroup.Text className={`${isInValid(formik, "email") ? "invalid" : ""}`}>
                    <HiEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    type="text"
                    placeholder={t("registerFormTranslations.emailPlaceholder")}
                    autoComplete="off"
                    {...formik.getFieldProps("email")}
                    isInvalid={isInValid(formik, "email")}
                    isValid={isValid(formik, "email")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </InputGroup>


                <PasswordInput
                  formik={formik}
                  field="password"
                  setFocus={setFocus}
                />

                <PasswordInput
                  placeholder={t("registerFormTranslations.confirmPasswordPlaceholder")}
                  formik={formik}
                  field="confirmPassword"
                />

                <div className="auth-form-terms-wrapper">
                  <Form.Check
                    type="checkbox"
                    id="terms"
                    {...formik.getFieldProps("terms")}
                    className={`${isInValid(formik, "terms") ? "invalid" : ""}`}
                    isInvalid={isInValid(formik, "terms")}
                    isValid={isValid(formik, "terms")}
                    checked={formik.values.terms}
                    label={
                      <>
                        <span>{t("registerFormTranslations.labelSpanAgree")} </span>
                        <Link
                          to="/term-of-use"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("registerFormTranslations.labelSpanTerms")}
                        </Link>
                        <span> {t("registerFormTranslations.labelSpanAnd")} </span>
                        <Link
                          to="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("registerFormTranslations.labelSpanPrivacy")}
                        </Link>
                      </>
                    }
                  />
                </div>


                <div className="form-submit-button">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="submit-button"
                    disabled={!formik.isValid || loading}
                  >
                    {loading ?
                      <ButtonLoader size={20} />
                      :
                      <PiUserCirclePlusFill size={20} />
                    }
                    {t("registerFormTranslations.registerButtonText")}
                  </Button>
                </div>

                <div className="have-account">
                  <div>
                    {t("registerFormTranslations.haveAccountText")}
                  </div>
                  <Link className="have-account-link" to="/login">{t("registerFormTranslations.loginLinkText")}</Link>
                </div>
              </Form>
            </div>
          </Col>
          <Col xs={12} lg={6} className='p-0'>
            {
              focus
                ?
                <PasswordSuggestion formik={formik} field={"password"} />
                :
                <div className='auth-form-side'>
                  <div className="brand-logo">
                    <Image src="/logos/logo.png" />
                    <div>
                      {t("registerFormTranslations.registerFormTitle")}
                    </div>
                  </div>
                  {promotion.map((item, index) => (
                    <div className="auth-form-side-item" key={index}>
                      <div className="auth-form-side-item-icon" style={item.iconStyle}>
                        {item.icon}
                      </div>
                      <div className="auth-form-side-item-text">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
            }
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RegisterForm;
