import React from "react";
import { config } from "../helpers/config/index";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user-layout";
import AdminLayout from "../layouts/admin-layout";
import Error401Page from "../pages/errors/error-401-page";
import Error403Page from "../pages/errors/error-403-page";
import Error404Page from "../pages/errors/error-404-page";
import Error500Page from "../pages/errors/error-500-page";
import HomePage from "../pages/home-page";
import ContactPage from "../pages/contact-page";
import AboutPage from "../pages/about-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import ForgotPage from "../pages/dashboard/profile/forgot-page";
import ResetPasswordPage from "../pages/dashboard/profile/reset-password-page";
import ChangePasswordPage from "../pages/dashboard/profile/change-password-page";
import AdminDashboardPage from "../pages/dashboard/admin/admin-dashboard-page";
import PrivateRoute from "./private-route";
import MyProfilePage from "../pages/dashboard/profile/my-profile-page";
import MyAdvertsPage from "../pages/dashboard/profile/my-adverts-page";
import MyFavoritesPage from "../pages/dashboard/profile/my-favorites-page";
import MyTourRequestPage from "../pages/dashboard/profile/my-tour-request-page";
import AdvertDetailPage from "../pages/dashboard/profile/advert-detail-page";
import TourRequestDetailsPage from "../pages/dashboard/profile/tour-request-details-page";
import NewAdvertPage from "../pages/dashboard/profile/new-advert-page";
import EditAdvertPage from "../pages/dashboard/profile/edit-advert-page";
import AdvertPage from "../pages/advert-page";
import AdminAdvertTypeNew from "../components/dashboard/admin/advert-types/admin-advert-type-new";
import AdminAdvertsPage from "../pages/dashboard/admin/admin-adverts-page";
import AdminAdvertsEdit from "../components/dashboard/admin/adverts/admin-adverts-edit";
import AdminUserEditPage from "../pages/dashboard/admin/admin-user-edit-page";
import UsersPage from "../pages/dashboard/admin/admin-users-page";
import AdminReportsPage from "../pages/dashboard/admin/admin-reports-page";
import ResetDatabasePage from "../pages/dashboard/admin/reset-database-page";
import AdminContactMessagePage from "../pages/dashboard/admin/admin-contact-message-page";
import AdminCategoryListPage from "../pages/dashboard/admin/admin-category-list-page";
import AdminCategoryEditPage from "../pages/dashboard/admin/admin-category-edit-page";
import AdminCategoryCreatePage from "../pages/dashboard/admin/admin-category-create-page";
import AdminTourRequestPage from "../pages/dashboard/admin/admin-tour-request-page";
import AdminTourRequestDetail from "../components/dashboard/admin/tour-requests/admin-tour-request-detail";
import AccountConfirmationPage from "../pages/account-confirmation-page";
import AdminAdvertTypesPage from "../pages/dashboard/admin/admin-advert-types-page";
import TermOfUse from "../components/terms-and-privacy/term-of-use";
import PrivacyPolicy from "../components/terms-and-privacy/privacy-policy";
import MobileApps from "../components/mobile-apps/mobile-apps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "ad/:query",
        element: <AdvertPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "confirm/:token",
        element: <AccountConfirmationPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "term-of-use",
        element: <TermOfUse />

      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "mobile",
        element: <MobileApps />

      },
      {
        path: "forgot-password",
        element: <ForgotPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute roles={config.pageRoles.myProfile}>
            <MyProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-adverts",
        element: (
          <PrivateRoute roles={config.pageRoles.myAdverts}>
            <MyAdvertsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-favorites",
        element: (
          <PrivateRoute roles={config.pageRoles.myFavorites}>
            <MyFavoritesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tour-requests",
        element: (
          <PrivateRoute roles={config.pageRoles.myFavorites}>
            <MyTourRequestPage />
          </PrivateRoute>
        ),
      },
      {
        path: "tour-request-details",
        element: <TourRequestDetailsPage />,
      },
      {
        path: "/ad",
        element: (
          <PrivateRoute roles={config.pageRoles.myAdverts}>
            <NewAdvertPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/advert/:slug",
        element: <AdvertDetailPage />,
      },
      {
        path: "/ad/edit",
        element: (
          <PrivateRoute roles={config.pageRoles.myAdverts}>
            <EditAdvertPage />
          </PrivateRoute>
        ),
      },
      {
        path: "unauthorized",
        element: <Error401Page />,
      },
      {
        path: "forbidden",
        element: <Error403Page />,
      },
      {
        path: "not-found",
        element: <Error404Page />,
      },
      {
        path: "server-error",
        element: <Error500Page />,
      },
      {
        path: "*",
        element: <Error404Page />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute roles={config.pageRoles.dashboard}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: <AdminCategoryListPage />,
          },
          {
            path: "create",
            element: <AdminCategoryCreatePage />,
          },
          {
            path: "edit",
            element: <AdminCategoryEditPage />,
          },
        ],
      },
      {
        path: "tour-requests",
        children: [
          {
            index: true,
            element: <AdminTourRequestPage />,
          },
          {
            path: "details",
            element: <AdminTourRequestDetail />,
          },
        ],
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "advert-types",
        children: [
          {
            index: true,
            element: <AdminAdvertTypesPage />,
          },
          {
            path: "new",
            element: <AdminAdvertTypeNew />,
          },
        ],
      },
      {
        path: "adverts",
        children: [
          {
            index: true,
            element: <AdminAdvertsPage />,
          },
          {
            path: "edit",
            element: <AdminAdvertsEdit />,
          },
        ],
      },
      {
        path: "users/edit",
        element: <AdminUserEditPage />,
      },
      {
        path: "reports",
        element: <AdminReportsPage />,
      },
      {
        path: "settings",
        element: (
          <PrivateRoute roles={["ADMIN"]}>
            <ResetDatabasePage />
          </PrivateRoute>
        ),
      },
      {
        path: "contact-messages",
        element: <AdminContactMessagePage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;