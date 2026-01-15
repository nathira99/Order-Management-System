const API = process.env.REACT_APP_API_URL;

if (!API) {
  console.error("REACT_APP_API_URL is not defined");
}

export default API;