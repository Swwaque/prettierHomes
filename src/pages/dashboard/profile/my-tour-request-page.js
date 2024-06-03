import React from 'react'
import MyTourRequest from '../../../components/dashboard/profile/my-tour-request';
import Spacer from '../../../components/common/spacer';
import PageHeader from '../../../components/common/page-header';
import { useTranslation } from 'react-i18next';

const MyTourRequestPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t('myTourRequestPageTranslations.pageHeaderTitle')} />
      <Spacer minHeight={50} />
      <MyTourRequest />
      <Spacer />
    </>
  )
}

export default MyTourRequestPage;