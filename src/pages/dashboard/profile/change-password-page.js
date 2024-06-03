import React from "react";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import ChangePasswordForm from "../../../components/dashboard/profile/password-profile/change-password-form";
import { useTranslation } from "react-i18next";


const ChangePasswordPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title= {t("changePasswordPage.title")} />
      <Spacer />
      <ChangePasswordForm />
      <Spacer />
    </>
  );
};

export default ChangePasswordPage;
