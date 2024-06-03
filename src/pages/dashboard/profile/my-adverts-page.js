import React from 'react'
import PageHeader from '../../../components/common/page-header';
import Spacer from '../../../components/common/spacer';
import MyAdverts from '../../../components/dashboard/profile/my-adverts';
import { useTranslation } from 'react-i18next';

const MyAdvertsPage = () => {
  const {t} = useTranslation();
  return (
    <>
      <PageHeader title= {t("myAdvertsPagetranslations.pageHeaderTitle")} />
      <Spacer minHeight={50} />
      <MyAdverts/>
      <Spacer />
    </>
  );
}

export default MyAdvertsPage; 