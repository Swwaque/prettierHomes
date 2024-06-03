import axios from "axios";
import { formdataHeader, getAuthHeader } from "./auth-header";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getFavoriteAdvertIdList = async () => {
  const resp = await axios.get(`${baseURL}/users/fav`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const getUsers = async (query, page = 0, size = 20, sort = "id", type = "asc") => {
  const resp = await axios.get(`${baseURL}/users/admin?q=${query}&page=${page}&size=${size}&sort=${sort}&type=${type}`, {

    headers: getAuthHeader(),
  }

  );
  const data = await resp.data;
  return data;
};

export const deleteUser = async (id) => {
  const resp = await axios.delete(`${baseURL}/users/${id}/admin`, {
    headers: getAuthHeader(),
  }
  );
  const data = await resp.data;
  return data;
};

export const getOneUser = async (id) => {
  const resp = await axios.get(`${baseURL}/users/${id}/admin`, {
    headers: getAuthHeader(),
  }
  );
  const data = await resp.data;
  return data;
};

export const updateOneUser = async (id, payload) => {
  const resp = await axios.patch(`${baseURL}/users/${id}/admin`, payload, {
    headers: getAuthHeader(),
  }
  );
  const data = await resp.data;
  return data;
};

export const updateProfilePhoto = async (formData) => {
  const resp = await axios.patch(`${baseURL}/users/photo`, formData, {
    headers: formdataHeader(),
  }
  );
  const data = await resp.data;
  return data;
};

export const deleteProfilePhoto = async () => {
  const resp = await axios.delete(`${baseURL}/users/photo`, {
    headers: getAuthHeader(),
  }
  );
  const data = await resp.data;
  return data;
};


