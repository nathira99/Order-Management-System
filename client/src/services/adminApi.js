import axios from "axios";
import API from "../config/api";
// const API = process.env.REACT_APP_API_URL;

export const getStats = (token) =>
  axios.get(`${API}/api/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getPayments = (token, page = 1, limit = 10) =>
  axios.get(`${API}/api/admin/payments?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });