import axios from "axios";
import { getAuthHeader } from "./auth-header";


const baseURL = process.env.REACT_APP_BASE_URL;

export const getLogs = async (id, page=0, size=20, sort="id", type="asc") => {
    const resp = await axios.get(`${baseURL}/logs/${id}?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
      headers: getAuthHeader(),
    });
    const data =  resp.data;
    return data;
  };