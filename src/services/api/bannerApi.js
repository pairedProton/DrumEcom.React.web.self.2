import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export const getHomeBanners = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.HOME_BANNERS);
  return response.data.data;
};