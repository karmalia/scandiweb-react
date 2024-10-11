// src/axiosConfig.js
import axios, { AxiosError } from "axios";

const graphql = axios.create({
  baseURL: "http://46.31.77.136/scandiweb-php/server.php",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

graphql.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("Error response from Axios instance:", error);
    return Promise.reject(error);
  }
);

export default graphql;
