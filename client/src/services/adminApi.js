import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getStats = (token) =>
  axios.get(`${API}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getPayments = (token) =>
  axios.get(`${API}/payments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });