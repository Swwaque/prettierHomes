import React from 'react'
import MyResponse from './my-response';
import MyRequest from './my-request';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { MdRealEstateAgent } from "react-icons/md";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import "./my-tour-request.scss";

const MyTourRequest = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container className="tourrequest-container" >
        <Tabs
          defaultActiveKey='request'
          className='p-p-tabs mb-3'
          justify={true}
        >
          <Tab
            eventKey='request'
            title={<><FaPersonCircleQuestion title='My Request' /> <p>{t("myTourRequestPage.myReqiest")} </p></>}
          >
            <MyRequest />
          </Tab>

          <Tab
            eventKey='response'
            title={<><MdRealEstateAgent title='My Response' /> <p>{t("myTourRequestPage.myResponse")} </p></>}
          >
            <MyResponse />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default MyTourRequest