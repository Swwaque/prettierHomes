import axios from "axios";

import { getAuthHeader } from "./auth-header";

const baseURL = process.env.REACT_APP_BASE_URL;

// K01 It will get authenticated user`s favorites
export const getFavorites = async () => {
    const resp = await axios.get(`${baseURL}/favorites/auth`, {
        headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
};

// Delete favorite
export const deleteFavorite = async (id) => {
    const resp =  await axios.delete(`${baseURL}/favorites/${id}`, {
         headers: getAuthHeader(),
     });
     const data = resp.data;
     return data;
 };

 // Delete favorite for Admin and Manager
export const deleteFavoriteAdmin = async (id) => {
    const resp =  await axios.delete(`${baseURL}/favorites/admin/delete/${id}`, {
         headers: getAuthHeader(),
     });
     const data = resp.data;
     return data;
 };

// total fav count for the spesific user's advert
export const getFavoritesCount = async (id) => {
    const resp = await axios.get(`${baseURL}/favorites/auth/countFav/${id}`, {
        headers: getAuthHeader(),
    });
    return resp.data;
}

export const getFavoritesCountCustomer = async () => {
    const resp = await axios.get(`${baseURL}/favorites/countFav`, {
        headers: getAuthHeader(),
    });
    return resp.data;
}

export const getFavoritesCountAdmin = async () => {
    const resp = await axios.get(`${baseURL}/favorites/admin/countFav`, {
        headers: getAuthHeader(),
    });
    return resp.data;
}

export const getAllFavoritesByUserId = async (id,page = 0, size = 20,) => {
    const resp = await axios.get(`${baseURL}/favorites/getAll/${id}?page=${page}&size=${size}`,{
        headers: getAuthHeader(),
      }
    );
    const data = await resp.data;
    return data;
  };




// K03 it will add or remove a favorite
export const toggleFavorite = async (id) => {
    const resp =  await axios.get(`${baseURL}/favorites/${id}/auth`, {
         headers: getAuthHeader(),
     });
     const data = resp.data;
     return data;
 };

