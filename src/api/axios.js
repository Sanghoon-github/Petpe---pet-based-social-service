import axios from "../../node_modules/axios/index";


const BASE_URL = 'http://3.39.181.250';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});