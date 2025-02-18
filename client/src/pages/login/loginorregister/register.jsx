
import './register.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
function Register() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [click, setClick] = useState('none');
  const [loading, setLoading] = useState(false);

  const onSubmitt = async (e) => {
    e.preventDefault();
    if (agree) {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        if (!response.ok) throw new Error('Registration failed');
        
        const data = await response.json();
        console.log('Registered with id:', data.id);
        if (data) {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    console.log(formData.email, formData.firstName, formData.lastName, formData.password);
  }


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAgreeClick = (e) => {
    e.preventDefault();
    setAgree(!agree);
  }

  useEffect(() => {
    if(agree) {
      setClick('flex');
    } else {
      setClick('none')
    }
  }, [agree])
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

        <form>
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
            <div className='password_field'>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9.50018C11.6648 9.47316 11.3278 9.51929 11.0122 9.63537C10.6967 9.75145 10.4101 9.93472 10.1723 10.1725C9.93453 10.4102 9.75127 10.6968 9.63519 11.0124C9.51911 11.328 9.47298 11.665 9.5 12.0002C9.47298 12.3353 9.51911 12.6724 9.63519 12.988C9.75127 13.3035 9.93453 13.5901 10.1723 13.8279C10.4101 14.0656 10.6967 14.2489 11.0122 14.365C11.3278 14.4811 11.6648 14.5272 12 14.5002C12.3352 14.5274 12.6723 14.4814 12.988 14.3653C13.3036 14.2493 13.5903 14.0661 13.8281 13.8283C14.0659 13.5905 14.2491 13.3038 14.3652 12.9881C14.4812 12.6725 14.5272 12.3354 14.5 12.0002C14.5268 11.6651 14.4806 11.3281 14.3645 11.0126C14.2483 10.6971 14.065 10.4106 13.8273 10.1729C13.5896 9.93514 13.3031 9.75187 12.9876 9.63573C12.6721 9.51958 12.3351 9.47334 12 9.50018Z" fill="#1E1919"/>
                    <path d="M20.177 11.678C20.067 11.446 17.41 6 12 6C6.58801 6 3.93301 11.446 3.82301 11.678L3.66901 12L3.82201 12.322C3.93301 12.554 6.58801 18 12 18C17.411 18 20.066 12.554 20.177 12.322L20.33 12L20.177 11.678ZM12 16.5C8.23001 16.5 5.97001 13.08 5.35001 12C5.97001 10.919 8.22801 7.5 12 7.5C15.771 7.5 18.028 10.918 18.65 12C18.028 13.082 15.77 16.5 12 16.5Z" fill="#1E1919"/>
              </svg>
            </div>
            </div>
            
            
          </div>
          <div className="input_row agreement">
            <button onClick={handleAgreeClick}>
              <img style={{display: click}} src="agree.png" alt="Agree" />
            </button>
          <p>Я хочу получать адресные рекламные письма с новостями от OnTutor</p>
          </div>
          <div className="input_row">
            <button
              onClick={onSubmitt}
              className="register_button"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Принять и зарегистрироваться'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
