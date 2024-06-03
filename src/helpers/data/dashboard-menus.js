import { PiPresentationChartFill, PiUsersThreeFill } from "react-icons/pi";
import { RiAdvertisementFill, RiShapesFill } from "react-icons/ri";
import { MdRealEstateAgent } from "react-icons/md";
import { HiDocumentChartBar, HiChatBubbleLeftRight, HiCog8Tooth } from "react-icons/hi2";
import { FaTags } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DashboardMenus = () => {
  const { t } = useTranslation();

  const admin = [
    {
      title: t("dashboardMenu.dashboard"),
      link: "/dashboard",
      icon: <PiPresentationChartFill />
    },
    {
      title: t("dashboardMenu.Adverts"),
      link: "/dashboard/adverts",
      icon: <RiAdvertisementFill />
    },
    {
      title: t("dashboardMenu.Categories"),
      link: "/dashboard/categories",
      icon: <RiShapesFill />
    },
    {
      title: t("dashboardMenu.AdvertTypes"),
      link: "/dashboard/advert-types",
      icon: <FaTags />
    },
    {
      title: t("dashboardMenu.Users"),
      link: "/dashboard/users",
      icon: <PiUsersThreeFill />
    },
    {
      title: t("dashboardMenu.TourRequests"),
      link: "/dashboard/tour-requests",
      icon: <MdRealEstateAgent />
    },
    {
      title: t("dashboardMenu.Reports"),
      link: "/dashboard/reports",
      icon: <HiDocumentChartBar />
    },
    {
      title: t("dashboardMenu.ContactMessages"),
      link: "/dashboard/contact-messages",
      icon: <HiChatBubbleLeftRight />
    },
    {
      title: t("dashboardMenu.Settings"),
      link: "/dashboard/settings",
      icon: <HiCog8Tooth />
    },
  ];

  const manager = [
    {
      title: t("dashboardMenu.dashboard"),
      link: "/dashboard",
      icon: <PiPresentationChartFill />
    },
    {
      title: t("dashboardMenu.Adverts"),
      link: "/dashboard/adverts",
      icon: <RiAdvertisementFill />
    },
    {
      title: t("dashboardMenu.Categories"),
      link: "/dashboard/categories",
      icon: <RiShapesFill />
    },
    {
      title: t("dashboardMenu.AdvertTypes"),
      link: "/dashboard/advert-types",
      icon: <FaTags />
    },
    {
      title: t("dashboardMenu.Users"),
      link: "/dashboard/users",
      icon: <PiUsersThreeFill />
    },
    {
      title: t("dashboardMenu.TourRequests"),
      link: "/dashboard/tour-requests",
      icon: <MdRealEstateAgent />
    },
    {
      title: t("dashboardMenu.Reports"),
      link: "/dashboard/reports",
      icon: <HiDocumentChartBar />
    },
    {
      title: t("dashboardMenu.ContactMessages"),
      link: "/dashboard/contact-messages",
      icon: <HiChatBubbleLeftRight />
    },
  ];

  return {
    admin, manager
  };

}

export default DashboardMenus;