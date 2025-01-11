import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Импортируем useNavigate

// Достаём переменную из окружения
const apiBaseUrl = 'http://localhost:5001/api';

const useLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Инициализируем useNavigate для перенаправления

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Начинаем загрузку
    setError(''); // Сбрасываем ошибки
    setMessage(''); // Сбрасываем сообщения

    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Сохраняем токен в sessionStorage или localStorage
      sessionStorage.setItem('token', response.data.token);
      
      setMessage('Вход выполнен успешно');
      setLoading(false); // Заканчиваем загрузку

      // Перенаправление после успешного входа
      navigate('/home'); // Перенаправляем на страницу /home (или на нужную вам)
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
      setLoading(false); // Заканчиваем загрузку в случае ошибки
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    message,
    error,
  };
};

export default useLogin;
