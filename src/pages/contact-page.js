import React from "react";
import PageHeader from "../components/common/page-header";
import Spacer from "../components/common/spacer";
import Contact from "../components/contact-page/contact";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("contactPageTranslations.contactPageTitle")} />
      <Spacer />
      <Contact />
      <Spacer />
    </>
  );
};

export default ContactPage;
