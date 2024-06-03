
import axios from "axios";
import { getAuthHeader } from "./auth-header";


const baseURL = process.env.REACT_APP_BASE_URL;

export const getTourRequestById = async (id) => {

  try {
    const resp = await axios.get(`${baseURL}/tour-requests/${id}/auth`, {
      headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}
export const tourRequestUpdate = async (id, payload) => {
  try {
    const resp = await axios.put(`${baseURL}/tour-requests/${id}/auth`, payload, {
      headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

export const tourRequestCancel = async (id) => {

  try {
    const resp = await axios.get(`${baseURL}/tour-requests/${id}/cancel`, {
      headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

//S01
export const getTourRequestGuest = async (page = 0, size = 20, sort = "createdAt", type = "desc") => {
  const resp = await axios.get(`${baseURL}/tour-requests/auth/guest?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
    headers: getAuthHeader(),
  });
  const data = resp.data;
  return data;
};


export const getTourRequestOwner = async (page = 0, size = 20, sort = "createdAt", type = "desc") => {
  const resp = await axios.get(`${baseURL}/tour-requests/auth/owner?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
    headers: getAuthHeader(),
  });
  const data = resp.data;
  return data;
};

export const getTourRequestCount = async (id) => {
  const resp = await axios.get(`${baseURL}/tour-requests/auth/count/${id}`, {
    headers: getAuthHeader(),
  });
  return resp.data;
};

// counter for tour request new method
export const getTourRequestCountCustomer = async () => {
  const resp = await axios.get(`${baseURL}/tour-requests/count`, {
    headers: getAuthHeader(),
  });
  return resp.data;
}
export const getTourRequestCountAdmin = async () => {
  const resp = await axios.get(`${baseURL}/tour-requests/admin/count`, {
    headers: getAuthHeader(),
  });
  return resp.data;
}




//s10  - delete
export const deleteTourRequest = async (id) => {
  const resp = await axios.delete(`${baseURL}/tour-requests/${id}`, {
    headers: getAuthHeader(),
  });
  const data = resp.data;
  return data;
};



export const getTourRequestByAdvert = async (
  advertId,
  page = 0,
  size = 10,
  sort = "tourDate",
  type = "DESC"
) => {
  const resp = await axios.get(
    `${baseURL}/tour-requests/page/${advertId}?page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

export const approveTourRequest = async (tourRequestId) => {
  const resp = await axios.get(
    `${baseURL}/tour-requests/${tourRequestId}/approve`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

export const declineTourRequest = async (tourRequestId) => {
  const resp = await axios.get(
    `${baseURL}/tour-requests/${tourRequestId}/decline`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

// S02 Get all tour request bt Admin and Manager
// for admin-tour-request
export const getAllTourRequestByAdminManager = async (
  page = 0,
  size = 10,
  sort = "tourDate",
  type = "desc",
  query
) => {

  const resp = await axios.get(`${baseURL}/tour-requests/admin?page=${page}&size=${size}&sort=${sort}&type=${type}&query=${query}`, {
    headers: getAuthHeader(),
  });

  const data = resp.data;
  return data;

}
export const getAllTourRequestsByUserId = async (id, page = 0, size = 20,) => {
  const resp = await axios.get(`${baseURL}/tour-requests/getAll/${id}?page=${page}&size=${size}`, {
    headers: getAuthHeader(),
  }
  );
  const data = await resp.data;
  return data;
};

