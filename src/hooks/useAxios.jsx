// src/hooks/useAxios.js
import axios from 'axios';
import { getToken } from '../hooks/useLocalStorage';
import { BASE_URL } from "../constants/apiUrl";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  });

  return axiosInstance;
};

export default useAxios;


/*import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { BASE_URL } from "../constants/apiUrl";

const useAxiosWithAuth = () => {
  const { auth } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
       "Content-Type": "application/json",
    },
  });

  //
  axiosInstance.interceptors.request.use(function (config) {
    const token = auth.accessToken;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return axiosInstance;
};

export default useAxiosWithAuth;*/
