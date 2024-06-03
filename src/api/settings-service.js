import axios from "axios";
import { getAuthHeader } from "./auth-header";
const baseURL = process.env.REACT_APP_BASE_URL;
// G01 -- admin manager
export const resetDatabase = async () => {
    const resp = await axios.delete(`${baseURL}/settings/db-reset`, {
        headers:  getAuthHeader()
        
    });
    const data =  resp.data;
    return data;
};