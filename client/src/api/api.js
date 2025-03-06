import axios from "axios";

const api = axios.create({
  baseURL: "https://younglabs-api.onrender.com", 
});

export default api;
