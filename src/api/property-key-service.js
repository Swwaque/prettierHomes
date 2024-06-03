import axios from "axios";
import { getAuthHeader } from "./auth-header";

const baseURL = process.env.REACT_APP_BASE_URL;

//C08
export const savePropertyKey = async (id, payload) => {
   const resp = await axios.post(`${baseURL}/categoriesKey/${id}/properties`, payload, {
      headers: getAuthHeader(),
   });
      
   const data = resp.data;
   return data;
} 

// C07
export const getPropertyKeysOfCategory = async (id) => {
   const resp = await axios.get(`${baseURL}/categoriesKey/${id}/properties`, {
      headers: getAuthHeader(),
   });
      
   const data = resp.data;
   return data;
} 

//C09
export const updatePropertyKey = async (id, payload) => {
   const resp = await axios.put(`${baseURL}/categoriesKey/properties/${id}`, payload, {
      headers: getAuthHeader(),
   });
      
   const data = resp.data;
   return data;
};

//C10
export const deletePropertyKey = async (id) => {
   const resp= await axios.delete(`${baseURL}/categoriesKey/properties/${id}`, {
     headers: getAuthHeader()
   });
 
   const data = resp.data;
   return data;
 };