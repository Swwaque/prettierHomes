import { getFromLocalStorage } from "../helpers/function/encrypted-storage";


export const getAuthHeader =  () =>{
    const token = getFromLocalStorage("token");
    const selectedLanguage = localStorage.getItem("i18nextLng");
    // console.log(selectedLanguage)
    
    let header = {};
    if (token) {
       
        header = {
            Authorization: `Bearer ${token}`,
            'Accept-Language': selectedLanguage
        }
    }
    return header;
}




export const formdataHeader =  () =>{
    const token = getFromLocalStorage("token");
    const selectedLanguage = localStorage.getItem("i18nextLng");
    let header = {};
    if (token) {
       
        header = {
            Authorization:`Bearer ${token}` ,
            'Content-Type': 'multipart/form-data',
            'Accept-Language': selectedLanguage
        }
    }
    return header;
}