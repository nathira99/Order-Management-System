import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const getRole = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role;
};