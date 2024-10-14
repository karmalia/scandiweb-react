// src/axiosConfig.js
import axios, { AxiosError } from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://e06f-46-31-77-136.ngrok-free.app/scandiweb-php/public/index.php"
    : "http://localhost/scandiweb-php/index.php";

const graphql = axios.create({
  baseURL,
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
