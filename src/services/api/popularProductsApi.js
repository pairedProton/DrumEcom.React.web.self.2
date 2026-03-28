import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export const getPopularProducts = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.POPULAR_PRODUCTS);
    return response.data.data;
}