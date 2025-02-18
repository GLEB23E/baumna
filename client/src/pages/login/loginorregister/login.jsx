import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom'; 


const apiBaseUrl = 'http://localhost:5001/api';
console.log(apiBaseUrl);

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  
  const [loading, setLoading] = useState(false); 
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
    setLoading(true);
    setError(''); 
    setMessage(''); 

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      }) 
      if (!response.ok) {
        throw new Error('Failed')
      }
      const data =  await response.json()
      console.log(data.userId)
      
      await localStorage.setItem('_Id', data.userId);
      navigate('/main');

      setLoading(false); 
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
      setLoading(false); 
    }
  };

  return (
    <div className="loginorregister_container">
      <header>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <img src="logo.png" alt="Logo" />
          <h1>OnTutor</h1>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M12.25 4.5C7.035 4.5 4.5 7.035 4.5 12.25C4.5 17.465 7.035 20 12.25 20C17.465 20 20 17.465 20 12.25C20 7.035 17.465 4.5 12.25 4.5ZM17.964 9H15.37C15.3004 8.07007 15.0903 7.15604 14.747 6.289C15.4649 6.44099 16.1341 6.768 16.6952 7.24095C17.2562 7.71391 17.6917 8.31817 17.963 9H17.964ZM18.5 12.25C18.502 12.836 18.458 13.421 18.367 14H15.47C15.492 13.421 15.5 12.833 15.5 12.25C15.5 11.667 15.492 11.079 15.47 10.5H18.367C18.457 11.079 18.502 11.664 18.5 12.25ZM12.25 18.5C11.634 18.5 10.95 18.09 10.652 15.5H13.848C13.55 18.09 12.866 18.5 12.25 18.5ZM10.538 14C10.514 13.476 10.5 12.9 10.5 12.25C10.5 11.6 10.514 11.024 10.538 10.5H13.962C13.986 11.024 14 11.6 14 12.25C14 12.9 13.986 13.476 13.962 14H10.538ZM6 12.25C5.998 11.664 6.042 11.079 6.133 10.5H9.03C9.008 11.079 9 11.667 9 12.25C9 12.833 9.008 13.421 9.03 14H6.133C6.04244 13.4211 5.99797 12.8359 6 12.25ZM12.25 6C12.866 6 13.55 6.41 13.848 9H10.652C10.95 6.41 11.634 6 12.25 6ZM9.753 6.289C9.40966 7.15603 9.19961 8.07006 9.13 9H6.536C6.80734 8.31804 7.24301 7.71371 7.80425 7.24075C8.3655 6.76778 9.03492 6.44084 9.753 6.289ZM6.536 15.5H9.13C9.2 16.43 9.41 17.344 9.753 18.211C9.03507 18.0591 8.36581 17.7321 7.80474 17.2591C7.24366 16.7862 6.80818 16.1819 6.537 15.5H6.536ZM14.746 18.211C15.0897 17.344 15.3001 16.43 15.37 15.5H17.964C17.6927 16.182 17.257 16.7863 16.6957 17.2593C16.1345 17.7322 15.4641 18.0592 14.746 18.211Z" fill="#1E1919"/>
        </svg>
      </header>

      <div className="registration_block">
        <h1>Войти или зарегистрироваться</h1>
        <div className="input_row">
          <div className="loginwithgoogole">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M8.99996 3.5625C10.3275 3.5625 11.5162 4.02 12.4537 4.9125L15.0225 2.34375C13.4625 0.8925 11.4262 0 8.99996 0C5.48246 0 2.44121 2.0175 0.959961 4.9575L3.95246 7.27875C4.66121 5.145 6.65246 3.5625 8.99996 3.5625Z" fill="#EA4335"/>
            <path d="M17.6175 9.20625C17.6175 8.6175 17.5612 8.0475 17.475 7.5H9V10.8825H13.8525C13.635 11.9925 13.005 12.9375 12.06 13.575L14.9588 15.825C16.65 14.2575 17.6175 11.94 17.6175 9.20625Z" fill="#4285F4"/>
            <path d="M3.94875 10.7213C3.76875 10.1775 3.66375 9.60002 3.66375 9.00002C3.66375 8.40002 3.765 7.82252 3.94875 7.27877L0.95625 4.95752C0.345 6.17252 0 7.54502 0 9.00002C0 10.455 0.345 11.8275 0.96 13.0425L3.94875 10.7213Z" fill="#FBBC05"/>
            <path d="M9.00005 17.9998C11.43 17.9998 13.4738 17.201 14.9588 15.821L12.06 13.571C11.2538 14.1148 10.215 14.4335 9.00005 14.4335C6.65255 14.4335 4.6613 12.851 3.9488 10.7173L0.956299 13.0385C2.4413 15.9823 5.48255 17.9998 9.00005 17.9998Z" fill="#34A853"/>
          </svg>
            <h2>Continue with Google</h2>
          </div>
        </div>
        <div className="input_row">
          <div className="loginwithgoogole_line">
            <div></div>
            <h2>или</h2>
            <div></div>
          </div>
        </div>
        <div className="input_row">
          <div>
            <p>Почта</p>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="input_row">
          <div>
            <p>Пароль</p>
            <div className="password_field">
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              </svg>
            </div>
          </div>
        </div>
        <div className="input_row">
          <button className="register_button" onClick={handleSubmit}>
            <h1>{loading ? 'Загрузка...' : 'Продолжить'}</h1>
          </button>
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
