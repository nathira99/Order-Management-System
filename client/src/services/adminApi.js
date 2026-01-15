import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getStats = (token) =>
  axios.get(`${API}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getPayments = (token, page = 1, limit = 10) =>
  axios.get(`${API}/payments?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });