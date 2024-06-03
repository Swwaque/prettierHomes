import React from "react";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import ResetPasswordForm from "../../../components/dashboard/profile/password-profile/reset-password-form";
import { useTranslation } from "react-i18next";

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title= {t("resetPasswordPageTranslations.pageHeaderTitle")} />
      <Spacer />
      <ResetPasswordForm />
      <Spacer />
    </>
  );
};

export default ResetPasswordPage;
