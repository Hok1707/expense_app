import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-api-ashen.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
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
