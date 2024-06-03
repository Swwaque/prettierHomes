import axios from "axios";
import { getAuthHeader } from "./auth-header";

const baseURL = process.env.REACT_APP_BASE_URL;

export const login = async (payload) => {
  // const selectedLanguage = localStorage.getItem("i18nextLng") ;
  const resp = await axios.post(`${baseURL}/users/login`, payload, {
    headers: {
      'Accept-Language': localStorage.getItem("i18nextLng")
    }
  });
  const data = await resp.data;
  return data;
};

export const register = async (payload) => {
  const resp = await axios.post(`${baseURL}/users/register`,
    payload, {
    headers: {
      'Accept-Language':  localStorage.getItem("i18nextLng")
    }
  });
  const data = await resp.data;
  return data;
};

export const forgotPassword = async (payload) => {
  const resp = await axios.post(`${baseURL}/users/forgot-password`, payload, {
    headers: {
      'Accept-Language':  localStorage.getItem("i18nextLng")
    }
  });
  const data = await resp.data;
  return data;
};
export const resetPassword = async (payload) => {
  const resp = await axios.post(`${baseURL}/users/reset-password`, payload, {
    headers: {
      'Accept-Language': localStorage.getItem("i18nextLng")
    }
  });
  const data = await resp.data;
  return data;
};

// get  the authenticated user.
export const getUser = async () => {
  const resp = await axios.get(`${baseURL}/users/auth`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
}
export const changePassword = async (payload) => {
  const resp = await axios.patch(`${baseURL}/users/change-password`, payload,{ 
    headers: getAuthHeader()
  });
  const data = await resp.data;
  return data;
};
export const updateUser= async (payload) => {
  const resp = await axios.patch(`${baseURL}/users/auth`, payload,{
    headers: getAuthHeader()
  });
  const data = await resp.data;
  return data;
};
export const deleteUser = async ()=> {
  const resp = await axios.delete(`${baseURL}/users/auth`,{
    headers: getAuthHeader()
  });
  const data = await resp.data;
  return data;
};

export const confirmationAccount = async (token) => {
  const resp = await axios.get(`${baseURL}/users/register/confirm?token=${token}`, {
    headers: {
      'Accept-Language':  localStorage.getItem("i18nextLng")
    }
  });
  const data = await resp.data;
  return data;
};
