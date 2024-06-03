import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// PrivateRoute:
// 1- kullanicinin login olup olmadigini kontrol edecek
// 2- kullnicinin yetkisi olup olmadigini kontrol edecek
const PrivateRoute = ({ children, roles }) => {

  const { isUserLogin, user } = useSelector((state) => state.auth);// merkezi state 'e baglanip kullaniciyi ve login olup olmadigi cekmeliyim

  if (!isUserLogin) return <Navigate to="/login" />;// kullnici giris yapmamissa login sayfasina yonlendiriyoruz
  if (!roles || !Array.isArray(roles) || !roles.includes(user.role))// rolu yoksa, array degilse? istedigim role sahip degilse
    return <Navigate to="/unauthorized" />;

  return children;// controllerden gectiyse gitmek istedigi sayfayi veriyoruz.
};

export default PrivateRoute;