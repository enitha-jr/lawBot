import axios from "axios";
import {store} from "../store/store";

const apiInstance = axios.create({
    baseURL: "http://localhost:8000/api"
})

apiInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiInstance;