import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-api-ashen.vercel.app",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export const get = async (url) => {
  try {
    const response = await instance.get(url);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const post = async (url, data) => {
  try {
    const response = await instance.post(url, data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const put = async (url, data) => {
  try {
    const response = await instance.put(url, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const remove = async (url) => {
  try {
    const response = await instance.delete(url);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
