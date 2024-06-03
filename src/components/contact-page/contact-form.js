import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useToast } from '../../store/providers/toast-provider';
import { isInValid, isValid } from '../../helpers/function/forms';
import ReCAPTCHA from 'react-google-recaptcha';
import ButtonComponent from '../common/button-component';
import { RiMailSendLine } from 'react-icons/ri'
import { sendMessage } from '../../api/contact-messages';
import { useFormik } from "formik";
import * as Yup from "yup";
import './contact-form.scss';
import { useTranslation } from 'react-i18next';

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);
  const { showToast } = useToast();
  const {t} = useTranslation();
  

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  }

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(t('contactForm.requiredFirstName'))
      .min(2, t('contactForm.minLength', { min: 2 }))
      .max(50, t('contactForm.maxLength', { max: 50 })),
    lastName: Yup.string()
      .required(t('contactForm.requiredLastName'))
      .min(2, t('contactForm.minLength', { min: 2 }))
      .max(50, t('contactForm.maxLength', { max: 50 })),
    email: Yup.string()
      .email(t('contactForm.invalidEmail'))
      .max(50, t('contactForm.maxLength', { max: 50 }))
      .required(t('contactForm.requiredEmail')),
    message: Yup.string()
      .required(t('contactForm.requiredMessage'))
      .min(2, t('contactForm.minLength', { min: 2 }))
      .max(250, t('contactForm.maxLength', { max: 250 })),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const resp = await sendMessage(values);
      resetForm();
      showToast({
        severity: 'success',
        summary: t('contactForm.summarySuccess'),
        detail: resp,
        icon: <RiMailSendLine size={50} />,
      });
    } catch (error) {
      showToast({
        severity: "error",
        summary: t('error.error'),
        detail: Object.values(error.response.data)[0],
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  const handleRecaptcha = () => {
    setRecaptcha(!recaptcha);
  }

  return (
    <div className="contact-form">
      <Form noValidate onSubmit={formik.handleSubmit} className='form'>
        <h5>{t('contactForm.titleForm')} </h5>

        <Form.Group className="form-input-group" controlId="firstName">
          <Form.Label>{t('contactForm.firstNameForm')} </Form.Label>
          <Form.Control type="text"
            isInvalid={isInValid(formik, "firstName")}
            isValid={isValid(formik, "firstName")}
            {...formik.getFieldProps("firstName")}
          />
          <Form.Control.Feedback type="invalid" className="formik-feedback">
            {formik.errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-input-group" controlId="lastName">
          <Form.Label>{t('contactForm.lastNameForm')} </Form.Label>
          <Form.Control type="text"
            isInvalid={isInValid(formik, "lastName")}
            isValid={isValid(formik, "lastName")}
            {...formik.getFieldProps("lastName")}
          />
          <Form.Control.Feedback type="invalid" className="formik-feedback">
            {formik.errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-input-group" controlId="email">
          <Form.Label>{t('contactForm.emailForm')} </Form.Label>
          <Form.Control type="email"
            autoComplete="off"
            isInvalid={isInValid(formik, "email")}
            isValid={isValid(formik, "email")}
            {...formik.getFieldProps("email")}
          />
          <Form.Control.Feedback type="invalid" className="formik-feedback">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-input-group" controlId="message">
          <Form.Label>{t('contactForm.messageForm')} </Form.Label>
          <Form.Control as="textarea"
            rows={3}
            placeholder={t('contactForm.placeholderMessage')}
            isInvalid={isInValid(formik, "message")}
            isValid={isValid(formik, "message")}
            {...formik.getFieldProps("message")}
          />
          <Form.Control.Feedback type="invalid" className="formik-feedback">
            {formik.errors.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className='recaptcha-wrapper'>
          <ReCAPTCHA
            className={recaptcha ? "d-none" : ""}
            sitekey={recaptchaKey}
            onChange={handleRecaptcha}
            hl='en'
          />
        </div>
        {
          recaptcha
          &&
          <ButtonComponent
            formik={formik}
            loading={loading}
            type="submit"
            text={t('contactForm.send')}
            style={{ borderRadius: "10px", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}
          >
            <RiMailSendLine />
          </ButtonComponent>
        }
      </Form>
    </div>
  );
};
export default ContactForm;