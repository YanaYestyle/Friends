import axios, { AxiosError } from "axios";
import { getShowError } from "@/utils/ErrorContext/ErrorContext";
import { getShowLoader, getHideLoader } from "@/utils/LoaderContext/LoaderContext";

const apiClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const showLoader = getShowLoader();
        if (showLoader) showLoader();
        return config;
    },
    (error) => {
        const hideLoader = getHideLoader();
        if (hideLoader) hideLoader();
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        const hideLoader = getHideLoader();
        if (hideLoader) hideLoader();
        return response;
    },
    (error: AxiosError) => {
        const hideLoader = getHideLoader();
        const showError = getShowError();

        if (hideLoader) hideLoader();
        if (showError) showError(error.message || 'An unexpected error occurred.');

        return Promise.reject(error);
    }
);

export default apiClient;