import React from 'react'
import PageHeader from '../../../components/common/page-header'
import Spacer from '../../../components/common/spacer'
import TourRequestDetails from '../../../components/dashboard/profile/tour-request-detail/tour-request-details';
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'


const TourRequestDetailsPage = () => {
  const location = useLocation();
  const tr = location.state;

  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t("tourRequestDetailsPageTranslations.pageHeaderTitle")} />
      <Spacer />
      <TourRequestDetails />
      <Spacer />
    </>
  )
}

export default TourRequestDetailsPage