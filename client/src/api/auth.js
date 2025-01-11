import axios from 'axios';

const API_URL = 'http://localhost:5001'; // URL вашего бэкенда

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка регистрации');
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка входа');
  }
};
