import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from '../../../common/password-input';
import { deleteUser } from '../../../../api/auth-service';
import { AiOutlineUserDelete } from "react-icons/ai";
import ButtonLoader from '../../../common/button-loader';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../../store/providers/toast-provider';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { TbFaceIdError } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../store/slices/auth-slice';
import { prettyDialog } from '../../../../helpers/function/toast-confirm';
import { ImUserMinus } from "react-icons/im";
import { useTranslation } from 'react-i18next';

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string().required(t('deleteAccountTranslations.passwordRequired')),
  });

  const onSubmit = async (values) => {
    prettyDialog({
      message: t('deleteAccountTranslations.messageDialog'),
      header: t('deleteAccountTranslations.headerDialog'),
      handleAccept: async () => {
        try {
          await deleteUser(values);
          dispatch(logout());
          navigate('/');
          showToast({
            severity: 'success',
            summary: t('deleteAccountTranslations.summarySuccess'),
            detail: t('deleteAccountTranslations.detailSuccess'),
            icon: <IoMdCheckmarkCircleOutline size={50} />,
            life: 1500,
          });
        } catch (error) {
          showToast({
            severity: "error",
            summary: t('error.error'),
            detail: Object.values(error.response.data)[0],
            icon: <TbFaceIdError size={50} />,
            life: 1500,
          });
        } finally {
          setLoading(false);
        }
      },
    });
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
          <div className='profile-form-side'>
            <ImUserMinus size={100} />
            <div className='text-center'>
              <p className='m-0'>{t('deleteAccountTranslations.pTitle')} </p>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={7} className='profile-form-main'>
          <div className="form-wrapper">
            <div className='text-center text-danger'>
              <h4>{t('deleteAccountTranslations.h4Title')} </h4>
              <h6>{t('deleteAccountTranslations.h6Title')} </h6>
            </div>
            <br />
            <Form
              className="profile-form"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <InputGroup className="mb-4">
                <PasswordInput
                  placeholder= {t('deleteAccountTranslations.placeholderPassword')}
                  formik={formik}
                  field="password"
                />
              </InputGroup>

              <div className="form-submit-button">
                <Button
                  variant="secondary"
                  type="submit"
                  className="submit-button"
                  disabled={!formik.isValid || loading || user.builtIn}
                >
                  {loading ? <ButtonLoader size={20} /> : <AiOutlineUserDelete size={20} />} {t('deleteAccountTranslations.buttonDelete')}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteAccount;
