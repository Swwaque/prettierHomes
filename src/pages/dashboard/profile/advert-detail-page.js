import React, { useEffect, useState } from "react";
import Spacer from "../../../components/common/spacer";
import AdvertDetailPageHeader from "../../../components/dashboard/profile/advert-detail/advert-detail-page-header";
import AdvertDetailsTourRequest from "../../../components/dashboard/profile/advert-detail/advert-details-tour-request";
import AdvertDetailsDescription from "../../../components/dashboard/profile/advert-detail/advert-details-description";
import AdvertDetailsProperties from "../../../components/dashboard/profile/advert-detail/advert-details-properties";
import AdvertDetailsImage from "../../../components/dashboard/profile/advert-detail/advert-details-image";
import AdvertDetailsLocation from "../../../components/dashboard/profile/advert-detail/advert-details-location";
import AdvertDetailsUserProfile from "../../../components/dashboard/profile/advert-detail/advert-details-user-profile";
import PageLoading from "../../../components/loading/PageLoading";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { getAdvertsBySlug } from "../../../api/adverts-service";
import { useDispatch, useSelector } from "react-redux";
import { setAdvertDetails } from "../../../store/slices/misc-slice";
import { useToast } from "../../../store/providers/toast-provider";
import { TbFaceIdError } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const AdvertDetailPage = () => {
  const { slug } = useParams();
  const { advertDetails } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);
  const { showToast } = useToast();
  const [showTourRequest, setShowTourRequest] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loadAdvert = async () => {
    try {
      const advert = await getAdvertsBySlug(slug);
      if (user?.id !== advert?.user?.id) {
        setShowTourRequest(true);
      }
      dispatch(setAdvertDetails(advert));
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
      navigate("/not-found");
    }
  };
  useEffect(() => {
    loadAdvert();
    return () => {
      dispatch(setAdvertDetails(null));
    }
    // eslint-disable-next-line
  }, []);


  if (advertDetails === null) {
    return <PageLoading size={80} />
  }

  return (

    <Container className="max-width-lg min-width-lg">

      <AdvertDetailPageHeader slug={slug} />
      <Row>
        <Col className="" lg={8} xl={9}>
          <AdvertDetailsImage />
          <AdvertDetailsDescription />
          <AdvertDetailsProperties />
          <AdvertDetailsLocation />
        </Col>
        <Col lg={4} xl={3}>
          <Row style={{ marginTop: "22px" }}>
            <Col xs={12} md={showTourRequest ? 6 : 12} lg={12}>
              <AdvertDetailsUserProfile />
            </Col>
            {showTourRequest &&
              <Col xs={12} md={6} lg={12}>
                <AdvertDetailsTourRequest />
              </Col>}
          </Row>
        </Col>
        <Spacer />
      </Row>
    </Container>
  );
};

export default AdvertDetailPage;
