import React from 'react';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    return error;
  }
);
export default axiosClient;
