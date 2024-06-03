import React from 'react'
import PageHeader from '../../../components/common/page-header';
import Spacer from '../../../components/common/spacer';
import MyFavorites from '../../../components/dashboard/profile/my-favorites'
import { useTranslation } from 'react-i18next';

const MyFavoritesPage = () => {
  const { t } = useTranslation();
  return (
    <>
    <PageHeader title= {t("myFavoritesPageTranslations.pageHeaderTitle")}/>
    <Spacer minHeight={50} />
    <MyFavorites/>
    <Spacer />
  </>
  )
}

export default MyFavoritesPage