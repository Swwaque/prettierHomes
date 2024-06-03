import axios from "axios";
import { getAuthHeader } from "./auth-header";

const baseURL = process.env.REACT_APP_BASE_URL;
// TODO J02 SEND MESSAGE
export const sendMessage = async (payload) => {
  const resp = await axios.post(`${baseURL}/contact-messages/save`, payload, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO J01 - GetAll()
export const getAllContactMessage = async (query, status, startDate, endDate, page = 0, size = 20, sort = "createdAt", type = "DESC") => {
  const resp = await axios.get(`${baseURL}/contact-messages?${query && `query=${query}&`}${status && `status=${status}&`}${startDate && `startDate=${startDate}&`}${endDate && `endDate=${endDate}&`}page=${page}&size=${size}&sort=${sort}&type=${type}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO J06 - updateStatus()
export const toggleReadStatus = async (id) => {
  const resp = await axios.patch(`${baseURL}/contact-messages/${id}`, {}, {
    headers: getAuthHeader(),
  });

  const data = resp.data;
  return data;
};

export const deleteMessage = async (id) => {
  const resp = await axios.delete(`${baseURL}/contact-messages/${id}`, {
    headers: getAuthHeader(),
  });

  const data = resp.data;
  return data;
};