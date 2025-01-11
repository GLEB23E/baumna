import React from 'react';
import './register.css';
import useRegistration from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    message,
    error,
  } = useRegistration();

  // Обработчик формы
  const onSubmit = async (event) => {
    await handleSubmit(event); // handleSubmit вызовет preventDefault внутри себя
    if (!error && !loading) {
      navigate('/home'); // Перенаправление при успешной регистрации
    }
  };

  return (
    <div className="loginorregister_container">
      <header>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <img src="logo.png" alt="Logo" />
          <h1>OnTutor</h1>
        </div>
      </header>
      <div className="registration_block">
        <h1>Зарегистрироваться бесплатно</h1>

        <form onSubmit={onSubmit}>
          <div className="input_row">
            <div>
              <p>Почта</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input_row double_input">
            <div>
              <p>Имя</p>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Фамилия</p>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input_row">
            <div>
              <p>Пароль</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input_row">
            <button
              type="submit"
              className="register_button"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Принять и зарегистрироваться'}
            </button>
          </div>
          {message && <p className="success_message">{message}</p>}
          {error && <p className="error_message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
