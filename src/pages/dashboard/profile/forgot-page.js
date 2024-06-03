import React from "react";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import ForgotForm from "../../../components/dashboard/profile/password-profile/forgot-form";
import { useTranslation } from "react-i18next";

const ForgotPage = () => {
  const {t} = useTranslation();
  return (
    <>
      <PageHeader title= {t("forgotPageTranslations.pageHeaderTitle")} />
      <Spacer minHeight={50}/>
      <ForgotForm/>
      <Spacer />
    </>
  );
};

export default ForgotPage;