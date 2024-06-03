import axios from "axios";
import { getAuthHeader } from "./auth-header";

const baseURL = process.env.REACT_APP_BASE_URL;

// G01 -- admin manager
export const getStatistics = async () => {
    const resp = await axios.get(`${baseURL}/report`, {
        headers: getAuthHeader()
    });
    const data = resp.data;
    return data;
};
export const getAllAdvertsReport = async (payload) => {
    const response = await axios.get(`${baseURL}/report/adverts?startDate=${payload.startDate}&endDate=${payload.endDate}&category=${payload.category}&type=${payload.type}&status=${payload.status}`, {
        headers: getAuthHeader(),
        responseType: 'blob',
    });

    const fileName = 'filtered-adverts.xlsx';

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
};

export const getMostPopularReport = async (amount) => {
    const response = await axios.get(`${baseURL}/report/most-popular?amount=${amount}`, {
        headers: getAuthHeader(),
        responseType: 'blob',
    });

    const fileName = 'most-popular-' + amount + '-advert' + (amount > 1 ? 's' : '') + '.xlsx';

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
};


export const getUsers = async (role) => {
    const response = await axios.get(`${baseURL}/report/users?role=${role}`, {
        headers: getAuthHeader(),
        responseType: 'blob',
    });

    const fileName = role + '.xlsx';

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
};

export const getTourRequests = async (payload) => {
    const response = await axios.get(`${baseURL}/report/tour-requests?startDate=${payload.startDate}&endDate=${payload.endDate}&status=${payload.status}`, {
        headers: getAuthHeader(),
        responseType: 'blob',
    });

    const fileName = 'filtered-tour-requests.xlsx';

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
};

export const getDailyReport = async () => {
    const resp = await axios.get(`${baseURL}/daily-report`, {
        headers: getAuthHeader()
    });
    const data = resp.data;
    return data;
};
