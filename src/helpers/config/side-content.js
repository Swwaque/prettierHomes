import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEye } from 'react-icons/ai';
import { IoIosImages } from "react-icons/io";
import { CiFloppyDisk } from "react-icons/ci";
import { PiUserFocusFill, PiCameraSlashBold, PiEnvelopeOpenLight } from "react-icons/pi";
import { HiOutlineIdentification, HiOutlineListBullet, HiOutlineHeart, HiOutlineMagnifyingGlass, HiOutlineChatBubbleLeftRight, HiOutlineStar } from "react-icons/hi2";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";

const SideContent = () => {
  const { t } = useTranslation();

  const profilePhoto = [
    {
      row: 1,
      icon: <IoIosImages className="icon" size={25} />,
      iconStyle: { color: "#16339c" },
      text: t("sideContent.text1"),
    },
    {
      row: 2,
      icon: <CiFloppyDisk className="icon" size={25} />,
      text: t("sideContent.text2"),
    },
    {
      row: 3,
      icon: <PiUserFocusFill className="icon" size={25} />,
      iconStyle: { color: "#5a9c44" },
      text: t("sideContent.text3"),
    },
    {
      row: 4,
      icon: <AiOutlineEye className="icon" size={25} />,
      text: t("sideContent.text4"),
    },
    {
      row: 5,
      icon: <PiCameraSlashBold className="icon" size={25} />,
      iconStyle: { color: "#c21d1d" },
      text: t("sideContent.text5"),
    },
  ];

  const profileForm = [
    {
      row: 1,
      icon: <HiOutlineIdentification className="icon" size={25} />,
      text: t("sideContent.text6"),
    },
    {
      row: 2,
      icon: <MdOutlineMobileFriendly className="icon" size={25} />,
      iconStyle: { color: "#5a9c44" },
      text: t("sideContent.text7"),
    },
    {
      row: 3,
      icon: <PiEnvelopeOpenLight className="icon" size={25} />,
      iconStyle: { color: "#c21d1d" },
      text: t("sideContent.text8"),
    },
  ];

  const authForm = [
    {
      row: 1,
      icon: <HiOutlineListBullet className="icon" size={25} />,
      text: t("sideContent.text9"),
    },
    {
      row: 2,
      icon: <HiOutlineHeart className="icon" size={25} />,
      iconStyle: { color: "#c21d1d" },
      text: t("sideContent.text10"),
    },
    {
      row: 3,
      icon: <HiOutlineMagnifyingGlass className="icon" size={25} />,
      text: t("sideContent.text11"),
    },
    {
      row: 4,
      icon: <HiOutlineChatBubbleLeftRight className="icon" size={25} />,
      iconStyle: { color: "#5a9c44" },
      text: t("sideContent.text12"),
    },
  ];

  const promotion = [
    {
      row: 1,
      icon: <HiOutlineListBullet className="icon" size={25} />,
      text: t("sideContent.text13"),
    },
    {
      row: 2,
      icon: <HiOutlineHeart className="icon" size={25} />,
      iconStyle: { color: "#c21d1d" },
      text: t("sideContent.text14"),
    },
    {
      row: 3,
      icon: <HiOutlineChatBubbleLeftRight className="icon" size={25} />,
      iconStyle: { color: "#5a9c44" },
      text: t("sideContent.text15"),
      
    },
    {
      row: 4,
      icon: <TbHomeSearch className="icon" size={25} />,
      text: t("sideContent.text16"),
    },
    {
      row: 5,
      icon: <HiOutlineStar className="icon" size={25} />,
      iconStyle: { color: "#fcad03" },
      text: t("sideContent.text17"),
    },
  ];

  return {
    profilePhoto,
    profileForm,
    authForm,
    promotion,
  };
};

export default SideContent;
