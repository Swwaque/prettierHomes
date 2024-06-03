
import axios from "axios";
import { formdataHeader, getAuthHeader } from "./auth-header";
const baseURL = process.env.REACT_APP_BASE_URL;


export const getImageByAdvertId = async (id) => {
    const resp = await axios.get(`${baseURL}/images/advert/${id}`, {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
};
export const getImageById = async (id) => {
    const resp = await axios.get(`${baseURL}/images//${id}`, {
        headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
};



export const deleteImageByIds = async (imageIds) => {
  const resp = await axios.delete(`${baseURL}/images/${imageIds}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const updateImageById = async (payload) => {
  const resp = await axios.put(`${baseURL}/images`, payload, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;

  return data;
};

export const uploadImage = async (images) => {
  const resp = await axios.post(`${baseURL}/images`, images, {
    headers: formdataHeader(),
  });
  const data = await resp.data;
  return data;
};

