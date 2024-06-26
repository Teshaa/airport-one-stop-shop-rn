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
    apiClient.get("meals/orders/", params, { headers: getAuthHeader(token) });
  const makeOrderPayment = (token, id, data) =>
    apiClient.post(`meals/orders/${id}/make_payment/`, data, {
      headers: getAuthHeader(token),
    });
  const makeReservationPayment = (token, id, data) =>
    apiClient.post(`hotels/reservations/${id}/make_payment/`, data, {
      headers: getAuthHeader(token),
    });
  const getReservations = (token, params) =>
    apiClient.get("hotels/reservations/", params, {
      headers: getAuthHeader(token),
    });
  const getPayments = (token, params) =>
    apiClient.get("payments/", params, { headers: getAuthHeader(token) });
  return {
    login,
    logout,
    getUser,
    register,
    putUser,
    getOrders,
    getPayments,
    getReservations,
    makeOrderPayment,
    makeReservationPayment,
  };
};

export const httpService = {
  get: apiClient.get,
  post: apiClient.post,
  put: apiClient.put,
};
export const useShop = () => {
  const endPoint = "meals/";
  const getCategories = (params) =>
    apiClient.get(`${endPoint}food-types/`, params);
  const getRestaurants = (params) =>
    apiClient.get(`${endPoint}restaurants/`, params);
  const getProducts = (params) => apiClient.get(endPoint, params);
  const postOrder = (token, data) =>
    apiClient.post(`${endPoint}orders/`, data, {
      headers: { ...getAuthHeader(token) },
    });
  const getReviews = (params) => apiClient.get(`${endPoint}reviews/`, params);
  const addReview = (token, data) =>
    apiClient.post(`${endPoint}reviews/`, data, {
      headers: getAuthHeader(token),
    });
  return {
    getProducts,
    getCategories,
    postOrder,
    getReviews,
    addReview,
    getRestaurants,
  };
};

export const useAirpot = () => {
  const getServices = () => apiClient.get("services/");
  const getTerminal = () => apiClient.get("terminals/");
  return { getTerminal, getServices };
};

export const useAccomodation = () => {
  const endPoint = "hotels/";

  const getHotels = (params) => apiClient.get(endPoint, params);
  const getCategories = (params) =>
    apiClient.get(`${endPoint}rooms-types/`, params);
  const getRooms = (params) => apiClient.get(`${endPoint}rooms/`, params);
  const getTags = (params) => apiClient.get(`${endPoint}tags/`, params);
  const postOrder = (token, data) =>
    apiClient.post(`${endPoint}reservations/`, data, {
      headers: { ...getAuthHeader(token) },
    });
  const getReviews = (params) => apiClient.get(`${endPoint}reviews/`, params);
  const addReview = (token, data) =>
    apiClient.post(`${endPoint}reviews/`, data, {
      headers: getAuthHeader(token),
    });
  return {
    getRooms,
    getCategories,
    getTags,
    postOrder,
    getReviews,
    addReview,
    getHotels,
  };
};
