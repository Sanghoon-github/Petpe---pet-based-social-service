import axios from "../../node_modules/axios/index";


const BASE_URL = 'http://3.34.21.153';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});