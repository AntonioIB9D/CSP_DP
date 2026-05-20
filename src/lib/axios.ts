import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.190.10.14:3013/api",
});

// http://10.190.10.14:3013/api

export default axiosInstance;
