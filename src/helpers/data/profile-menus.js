import React from "react";
import { useTranslation } from "react-i18next";
import { BsFillPersonFill, BsHeart, BsHouseDoor, BsListCheck, BsShieldLock } from "react-icons/bs";

const ProfileMenus = () => {
  const { t } = useTranslation();
   
  const admin = [
    {
      title: t("profileMenu.myProfile"),
      link: "/my-profile",
      icon: <BsFillPersonFill />
    },
    {
      title: t("profileMenu.myAdverts"),
      link: "/my-adverts",
      icon: <BsHouseDoor />
    },
    {
      title: t("profileMenu.myFavorites"),
      link: "/my-favorites",
      icon: <BsHeart />
    },
    {
      title: t("profileMenu.myTourRequests"),
      link: "/my-tour-requests",
      icon: <BsListCheck />
    },
    {
      title: t("profileMenu.controlPanel"),
      link: "/dashboard",
      icon: <BsShieldLock />
    }
  ];
  const manager = [
    {
      title: t("profileMenu.myProfile"),
      link: "/my-profile",
      icon: <BsFillPersonFill />
    },
    {
      title: t("profileMenu.myAdverts"),
      link: "/my-adverts",
      icon: <BsHouseDoor />
    },
    {
      title: t("profileMenu.myFavorites"),
      link: "/my-favorites",
      icon: <BsHeart />
    },
    {
      title: t("profileMenu.myTourRequests"),
      link: "/my-tour-requests",
      icon: <BsListCheck />
    },
    {
      title: t("profileMenu.controlPanel"),
      link: "/dashboard",
      icon: <BsShieldLock />
    }
  ];
  const customer = [
    {
      title: t("profileMenu.myProfile"),
      link: "/my-profile",
      icon: <BsFillPersonFill />
    },
    {
      title: t("profileMenu.myAdverts"),
      link: "/my-adverts",
      icon: <BsHouseDoor />
    },
    {
      title: t("profileMenu.myFavorites"),
      link: "/my-favorites",
      icon: <BsHeart />
    },
    {
      title: t("profileMenu.myTourRequests"),
      link: "/my-tour-requests",
      icon: <BsListCheck />
    },
  ];

  return { admin, manager, customer };
};

export default ProfileMenus;