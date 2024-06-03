import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  InputGroup,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonLoader from "../../../common/button-loader";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import ReactInputMask from "react-input-mask-next";
import { updateUser } from "../../../../api/auth-service";
import { useDispatch, useSelector } from "react-redux";
import { HiEnvelope, HiUser, HiPhone } from "react-icons/hi2";
import { login as loginSuccess } from "../../../../store/slices/auth-slice";
import { useToast } from "../../../../store/providers/toast-provider";
import { PiUserCircleGear } from "react-icons/pi";
import  SideContent  from "../../../../helpers/config/side-content";
import { useTranslation } from "react-i18next";

const ProfileForm = () => { 
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { profileForm } = SideContent();
  const { t } = useTranslation();
  const role = user?.role; 

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(t("profileFormTranslations.firstNameRequired"))
      .min(1, t("profileFormTranslations.minFirstName", { min: 1 }))
      .max(50, t("profileFormTranslations.maxFirstName", { max: 50 })),
    lastName: Yup.string()
      .required(t("profileFormTranslations.lastNameRequired"))
      .min(1, t("profileFormTranslations.minLastName", { min: 1 }))
      .max(50, t("profileFormTranslations.maxLastName", { max: 50 })),
    email: Yup.string()
      .email(t("profileFormTranslations.invalidEmail", { email: "email" }))
      .max(50, t("profileFormTranslations.maxEmail", { max: 50 }))
      .required(t("profileFormTranslations.emailRequired")),
    phone: Yup.string()
      .required(t("profileFormTranslations.phoneRequired"))
      .matches(/\(\d{3}\) \d{3}-\d{4}/g, t("profileFormTranslations.phoneMatches")),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await updateUser({ 
        firstName: values.firstName, 
        lastName: values.lastName, 
        email: values.email, 
        phone: values.phone,  
        role: role, 
      }); 
      dispatch(loginSuccess(resp));
      showToast({
        severity: "success",
        summary: t("profileFormTranslations.summarySuccess"),
        detail: t("profileFormTranslations.detailSuccess"),
        life: 1500,
      });
    } catch (error) {
      showToast({
        severity: "error",
        summary: t("error.error"),
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
    enableReinitialize: true,
  });

  return (
    <div className='profile-form-container'>
      <Row>
        <Col xs={12} lg={7} className='profile-form-main'>
          <div className="form-wrapper">
            <Form
              className="profile-form"
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
                  placeholder= {t("profileFormTranslations.placeholderFirstName")}
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
                  placeholder= {t("profileFormTranslations.placeholderLastName")}
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
                  autoComplete="off"
                  type="text"
                  placeholder="(XXX) XXX-XXXX"
                  {...formik.getFieldProps("phone")}
                  isValid={isValid(formik, "phone")}
                  isInvalid={isInValid(formik, "phone")}
                />
                <Form.Control.Feedback type="invalid" className="form-feedback">
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </InputGroup>

              <InputGroup className="mb-4" >
                <InputGroup.Text className={`${isInValid(formik, "email") ? "invalid" : ""}`}>
                  <HiEnvelope />
                </InputGroup.Text>
                <Form.Control
                  className="user-input"
                  autoComplete="off"
                  type="text"
                  placeholder= {t("profileFormTranslations.placeholderEmail")}
                  {...formik.getFieldProps("email")}
                  isInvalid={isInValid(formik, "email")}
                  isValid={isValid(formik, "email")}
                />
                <Form.Control.Feedback type="invalid" className="form-feedback">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </InputGroup>

              <div className="form-submit-button">
                <Button
                  variant="secondary"
                  type="submit"
                  className="submit-button"
                  disabled={!formik.isValid || loading}
                >
                  {loading ? <ButtonLoader size={20} /> : <PiUserCircleGear size={20} />} {t("profileFormTranslations.buttonUpdate")}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col xs={12} lg={5} className='p-0'>
          <div className='profile-form-side'>
            {
             profileForm.map((item, index) => (
                <div className="profile-form-side-item" key={index}>
                  <div className="profile-form-side-item-icon" style={item.iconStyle}>
                    {item.icon}
                  </div>
                  <div className="profile-form-side-item-text">
                    {item.text}
                  </div>
                </div>
              ))
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileForm;
