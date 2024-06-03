import React from "react";

import PageHeader from "../components/common/page-header";
import Spacer from "../components/common/spacer";
import Properties from "../components/properties-page/properties";
import { useTranslation } from "react-i18next";

const AdvertPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("advertPageTranslations.advertPageTitle")} />
      <Spacer />
      <Properties />
      <Spacer />
    </>
  );
};

export default AdvertPage;
