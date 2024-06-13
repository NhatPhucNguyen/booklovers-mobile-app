import { apiUrl } from "@/config/apiUrl";
import axios from "axios";
import { getData } from "./storage";
const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getData("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance;