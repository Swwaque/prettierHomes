import axios from "axios";
import { formdataHeader, getAuthHeader } from "./auth-header";
import { prepareRequestParams } from "../helpers/function/request-param-converter";

const baseURL = process.env.REACT_APP_BASE_URL;

export const getAdvertsBySlug = async (slug) => {
  // Send a GET request to the API endpoint with the provided slug
  const resp = await axios.get(`${baseURL}/adverts/details/${slug}`, {
    headers: getAuthHeader(),
  });

  // Extract the data from the response
  const data = resp.data;

  // Return the extracted data
  return data;
};
export const saveTourRequest = async (payload) => {
  try {
    const resp = await axios.post(`${baseURL}/tour-requests`, payload, {
      headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAllImagesByAdvertId = async (id) => {
  try {
    const resp = await axios.get(`${baseURL}/images/advert/${id}`, {
      headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//A05 get all adverts of the authenticated user
export const getAdverts = async (
  page = 0,
  size = 20,
  sort = "category_id",
  type = "asc"
) => {
  const resp = await axios.get(
    `${baseURL}/adverts/auth?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );

  const data = await resp.data;
  return data;
};

// TODO T01 GET ADVERT TYPES

export const getAdvertTypes = async () => {
  const resp = await axios.get(`${baseURL}/advert-types/all`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO C01 GET CATEGORIES
export const getCategories = async () => {
  const resp = await axios.get(`${baseURL}/categories/all`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO  U01 GET ALL COUNTRIES
export const getAllCountries = async () => {
  const resp = await axios.get(`${baseURL}/countries/all`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO   GET ALL CITIES BY COUNTRY
export const getAllCityByCountry = async (countryId) => {
  const resp = await axios.get(`${baseURL}/cities/search/${countryId}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO   GET ALL DISTRICTS BY CITY
export const getAllDistrictsByCity = async (cityId) => {
  const resp = await axios.get(`${baseURL}/districts/search/${cityId}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

//A13- delete advert
export const deleteAdvert = async (id) => {
  const resp = await axios.delete(`${baseURL}/adverts/${id}`, {
    headers: getAuthHeader(),
  });

  const data = resp.data;
  return data;
};

//A11- update advert for customer
export const updateAdvert = async (id, payload) => {
  const resp = await axios.put(`${baseURL}/auth/${id}`, payload, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO   GET ALL PROPERTIES
export const getCategoryPropertyKeysByCategory = async (categoryId) => {
  const resp = await axios.get(
    `${baseURL}/categoriesKey/${categoryId}/properties`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

// TODO A10  SAVE ADVERT
export const saveAdvert = async (formdata) => {
  const resp = await axios.post(`${baseURL}/adverts`, formdata, {
    headers: formdataHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A08  GET ADVERT
export const getAdvertById = async (advertId) => {
  const resp = await axios.get(`${baseURL}/adverts/${advertId}/auth`, {
    headers: formdataHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A11  UPDATE ADVERT
export const updateAdvertByCustomer = async (advertId, values) => {
  const resp = await axios.put(`${baseURL}/adverts/auth/${advertId}`, values, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const getByAdvertsPage = async (
  search,
  page = 0,
  size = 20,
  sort = "category.id",
  type = "asc"
) => {
  const queryString = prepareRequestParams(search);
  const separator = queryString ? "&" : "";
  const resp = await axios.get(
    `${baseURL}/adverts/search?${queryString}${separator}page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

// TODO A02  GET ADVERTS BY CITIES
export const getAdvertsByCities = async (limit) => {
  const resp = await axios.get(`${baseURL}/adverts/cities/${limit}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A03  GET ADVERTS BY CATEGORIES
export const getAdvertsByCategories = async () => {
  const resp = await axios.get(`${baseURL}/adverts/categories`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A04 GET MOST POPULAR ADVERTS
export const getMostPopularAdverts = async (amount, type) => {
  const resp = await axios.get(`${baseURL}/adverts/popular/${type}/${amount}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

//TODO getAdvertsForAdminPage
export const getAdvertsForAdmin = async (
  values,
  page = 0,
  size = 10,
  sort = "category.id",
  type = "asc"
) => {
  const queryString = prepareRequestParams(values);
  const resp = await axios.get(
    `${baseURL}/adverts/admin?${queryString}&page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

// TODO A09 GET ADVERT FOR ADMIN
export const findAdvertForAdmin = async (id) => {
  const resp = await axios.get(`${baseURL}/adverts/${id}/admin`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A12  UPDATE ADVERT FOR ADMİN
export const updateAdvertByAdmin = async (advertId, values) => {
  const resp = await axios.put(`${baseURL}/adverts/admin/${advertId}`, values, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};
export const getAllAdvertsByUserId = async (id, page = 0, size = 20) => {
  const resp = await axios.get(
    `${baseURL}/adverts/getAll/${id}?page=${page}&size=${size}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};
