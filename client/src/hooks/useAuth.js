import { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Импорт bcrypt для хеширования пароля


// Достаём переменную из окружения
const apiBaseUrl = 'http://localhost:5001/api'
console.log(apiBaseUrl)
// Используем переменную
console.log(apiBaseUrl);  // 
const useRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

    // Хешируем пароль перед отправкой
    const hashedPassword = bcrypt.hashSync(formData.password, bcrypt.genSaltSync(10));

    try {
      const response = await axios.post(`${apiBaseUrl}/users`, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: hashedPassword,
      });
      setMessage(response.data.message); // Успешное сообщение
      setLoading(false); // Заканчиваем загрузку
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
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

export default useRegistration;
