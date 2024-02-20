import { useUserContext } from "../context/hooks";
import apiClient from "./client";
const getAuthHeader = (token) => ({ Authorization: `Token ${token}` });

export const useUser = () => {
  const { setUser, token, setToken, clearToken, user } = useUserContext();
  const login = (data) => apiClient.post("users/login/", data);
  const register = (data) => apiClient.post("users/register/", data);
  const logout = () => clearToken(true);
  const getUser = async () => {
    if (user) {
      return;
    }
    const resposnse = await apiClient.get(
      "users/profile/",
      {},
      {
        headers: getAuthHeader(token),
      }
    );
    if (!resposnse.ok) {
      console.log("apiHooks->useUser", resposnse.problem);
    }
    setUser(resposnse.data);
  };
  const putUser = async (userData) =>
    await apiClient.put("users/profile/", userData, {
      headers: {
        ...getAuthHeader(token),
        "Content-Type": "multipart/form-data",
      },
    });
  const getOrders = (token, params) =>
    apiClient.get("orders/", params, { headers: getAuthHeader(token) });
  const getPayments = (token, params) =>
    apiClient.get("payments/", params, { headers: getAuthHeader(token) });
  return { login, logout, getUser, register, putUser, getOrders, getPayments };
};

export const httpService = {
  get: apiClient.get,
  post: apiClient.post,
  put: apiClient.put,
};
export const useShop = () => {
  const endPoint = "shop/";
  const getCategories = (params) =>
    apiClient.get(`${endPoint}categories/`, params);
  const getProducts = (params) => apiClient.get(endPoint, params);
  const getTags = (params) => apiClient.get(`${endPoint}tags/`, params);
  const postOrder = (token, data) =>
    apiClient.post("orders/", data, { headers: {...getAuthHeader(token)} });
  const getReviews = (params) => apiClient.get(`${endPoint}reviews/`, params);
  const addReview = (token, data) =>
    apiClient.post(`${endPoint}reviews/`, data, {
      headers: getAuthHeader(token),
    });
  return {
    getProducts,
    getCategories,
    getTags,
    postOrder,
    getReviews,
    addReview,
  };
};
