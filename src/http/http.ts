// src/axiosConfig.js
import axios, { AxiosError } from "axios";

// Create an Axios instance with custom configuration

const graphql = axios.create({
  baseURL: "http://localhost/scandiweb-php/server.php", // Replace with your API base URL
  timeout: 10000, // Optional timeout setting
  headers: {
    "Content-Type": "application/json",
  },
});

graphql.interceptors.response.use(
  (response) => {
    // Any response data transformations can go here
    return response;
  },
  (error: AxiosError) => {
    // Handle the response error (e.g., show toast notifications)
    console.error("Error response from Axios instance:", error);
    return Promise.reject(error);
  }
);

export default graphql;
