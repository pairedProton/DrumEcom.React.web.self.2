import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export const getHomeCategories = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.HOME_CATEGORIES);
    return response.data.data;
}