import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { TbFaceIdError } from 'react-icons/tb';
import { confirmationAccount } from '../api/auth-service';
import { useToast } from '../store/providers/toast-provider';
import { useTranslation } from 'react-i18next';

const AccountConfirmationPage = () => {
  const { token } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();  

  const loadConfirmation = async () => {
    try {
      await confirmationAccount(token);
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
      navigate("/");
    }
  };

  useEffect(() => {
    loadConfirmation();
    navigate("/login");
    // eslint-disable-next-line
  }, []);


  return (
    <></>
  )
}

export default AccountConfirmationPage
