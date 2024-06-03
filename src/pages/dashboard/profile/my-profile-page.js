import React from 'react'; //1
import PageHeader from '../../../components/common/page-header';
import Spacer from '../../../components/common/spacer';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { BsPersonVcard } from 'react-icons/bs';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import { AiOutlineDelete } from 'react-icons/ai';
import ProfileForm from '../../../components/dashboard/profile/password-profile/profile-form';
import ChangePasswordForm from '../../../components/dashboard/profile/password-profile/change-password-form';
import DeleteAccount from '../../../components/dashboard/profile/password-profile/delete-account';
import ProfilePhoto from '../../../components/dashboard/profile/password-profile/profile-photo';
import { useTranslation } from 'react-i18next';
import '../../../components/dashboard/profile/password-profile/my-profile-page.scss';

const MyProfilePage = () => {
  const location = useLocation();
  const activePanel = location?.state?.activePanel;
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title= {t('myProfilePageTranslations.pageHeaderTitle')} />
      <Spacer minHeight={30} />
      <Container className='profile-page-container'>
        <Tabs
          defaultActiveKey={activePanel || 'profile'}
          className='p-p-tabs mb-3'
          justify={true}
        >
          <Tab eventKey='profile' title={<><BsPersonVcard /> <p>{t('myProfilePageTranslations.tabProfile')} </p></>}>
          <ProfileForm /> 
          </Tab>
          <Tab
            eventKey='change-password'
            title={<><LiaExchangeAltSolid /> <p>{t('myProfilePageTranslations.tabChangePassword')} </p></>}
          >
             <ChangePasswordForm /> 
          </Tab>
          <Tab
            eventKey='profile-photo'
            title={<><MdOutlineAddAPhoto /> <p>{t('myProfilePageTranslations.tabProfilePhoto')} </p></>}
          >
            <ProfilePhoto />
          </Tab>
          <Tab
            eventKey='delete-account'
            title={<><AiOutlineDelete /> <p>{t('myProfilePageTranslations.tabDeleteAccount')} </p></>}
          >
            <DeleteAccount />
          </Tab>
        </Tabs>
      </Container>
      <Spacer minHeight={30} />
    </>
  );
};

export default MyProfilePage;
