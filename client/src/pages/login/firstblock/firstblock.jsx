import React from 'react';
import './firstblock.css'
import { useNavigate } from 'react-router-dom'; 
// Простой функциональный компонент
function Firstblock() {
    const navigate = useNavigate();

    const loger = () => {
        navigate('/login')
    }
    const reg = () => {
        navigate('/register')
    }
    return (
    <div className="first_container">
        <header>
            <h1>О нас</h1>
            <h1>lorem</h1>
            <h1>Почему мы?</h1>
            <h1>Подход к образованиюю</h1>
            <div className="first_login">
                <h1 onClick={loger}>Войти</h1>
                <h1 onClick={reg}>Зарегистрироваться</h1>
            </div>
        </header>
        <div className="first_content">
            <div className="first_logo">
                <img src="logo.png" alt="logo" />
                <h2>OnTutor</h2>
            </div>
            <div className="first_cen">
                <h3>Онлайн-платформа<br></br>для занятия с репетитором</h3>
            </div>
            
            <p>Добро пожаловать на платформу OnTutor! Чтобы начать использовать сайт для поиска и бронирования репетиторов, вам нужно зарегистрироваться.</p>
            <button><p>Начать</p></button>
        </div>
        <div className="first_card">
            <img src="girl.png" alt="photo" />
        </div>
        <div className="first_card2">
            <img src="girl2.png" alt="photo" />
        </div>
    </div>
  );
}

export default Firstblock;
