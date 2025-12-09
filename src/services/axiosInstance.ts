import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://my-backend-sxqn.onrender.com", // your backend URL
  timeout: 100000,
});

export default axiosInstance;
