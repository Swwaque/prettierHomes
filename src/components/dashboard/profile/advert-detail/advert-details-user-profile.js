import React, { useState } from "react";
import AuthTourModal from "../../../common/auth-tour-modal";
import { Container, Button, Image, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HiEye, HiEyeSlash, HiPhoneArrowUpRight, HiPhone, HiEnvelope, HiEnvelopeOpen } from "react-icons/hi2";
import "./advert-details-user-profile.scss";
import { useTranslation } from "react-i18next";

const AdvertDetailsUserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const { advertDetails } = useSelector((state) => state.misc);
  const { isUserLogin } = useSelector((state) => state.auth);
  const {t} = useTranslation();

  const toggleMail = () => {
    setShowEmail(prev => !prev);
  };
  
  const togglePhone = () => {
    setShowPhone(prev => !prev);
  };

  return (
    <Container className="advert-details-owner-profile-container">
      <div className="advert-details-profile-image-wrapper">
        <Image
          className="advert-detail-user-image"
          src={advertDetails?.user?.profilePhoto ? `data:${advertDetails?.user?.profilePhoto?.type};base64, ${advertDetails?.user?.profilePhoto?.data}` : "/images/profile/user.jpg"}
          alt="owner-image"
          draggable={false}
          fluid
        />
      </div>

      <div className="advert-details-owner-name">{
        `${advertDetails?.user?.firstName} ${advertDetails?.user?.lastName}`}
      </div>

      <div className="advert-details-owner-phone">
        <ButtonGroup>
          <Button variant="danger">
            <a
              className="advert-detail-phone-link"
              href={isUserLogin && showPhone ? `tel:${advertDetails.user.phone}` : undefined}
            >
              {isUserLogin && showPhone ?
                <>
                  <span style={{ color: "orange" }}><HiPhoneArrowUpRight color="orange" /> {t("advertDetailUserProfileTranslations.call")} : </span>
                  <span>{advertDetails?.user?.phone}</span>
                </>
                :
                <>
                  <span><HiPhone /> </span>
                  <span>{t("advertDetailUserProfileTranslations.buttonPhoneNumber")} </span>
                </>
              }
            </a>
          </Button>
          <Button variant="danger" className="show-toggle" onClick={isUserLogin ? togglePhone : () => setShowModal(true)}>
            {isUserLogin && showPhone ? <HiEyeSlash /> : <HiEye />}
          </Button>
        </ButtonGroup>
      </div>

      <div className="advert-details-owner-mail">
        <ButtonGroup>
          <Button variant="danger">
            <a
              className="advert-detail-mail-link"
              href={isUserLogin && showEmail ? `mailto:${advertDetails.user.email}` : undefined}
            >
              {isUserLogin && showEmail ?
                <>
                  <span><HiEnvelopeOpen color="orange" /></span>
                  <span>{advertDetails?.user?.email}</span>
                </>
                :
                <>
                  <span><HiEnvelope /> </span>
                  <span>{t("advertDetailUserProfileTranslations.buttonSendMail")} </span>
                </>
              }
            </a>
          </Button>
          <Button variant="danger" className="show-toggle" onClick={isUserLogin ? toggleMail : () => setShowModal(true)}>
            {isUserLogin && showEmail ? <HiEyeSlash /> : <HiEye />}
          </Button>
        </ButtonGroup>
      </div>
      <AuthTourModal show={showModal} onHide={() => setShowModal(false)} />
    </Container>
  );
};

export default AdvertDetailsUserProfile;
