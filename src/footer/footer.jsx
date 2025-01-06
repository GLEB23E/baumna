import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_links">
            <div className="footer_f">
                <div className="footer_logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                        <path d="M0 0.171387H18.0955C21.5998 0.171387 24.4407 3.01224 24.4407 6.51661H6.34523C2.84086 6.51661 0 3.67576 0 0.171387Z" fill="#FA9F42"/>
                        <path d="M15.3931 25.4849L15.3931 14.49C15.3931 10.9856 12.5522 8.14476 9.04787 8.14476L9.04787 19.1396C9.04787 22.644 11.8887 25.4849 15.3931 25.4849Z" fill="#FA9F42"/>
                    </svg>
                    <h1>OnTutor</h1>
                </div>
                <div className="footer_f_info">
                    Образовательная онлайн-платформа для поиска репетитора и учеников
                </div>
                <img src="icons.png" alt="" />
            </div>
            <div className="footer_s">
                <h2>Навигация по сайту</h2>
                <div className="footer_s_flex">
                    <h3>О нас</h3>
                    <h3>Предметы</h3>
                    <h3>Почему мы?</h3>
                    <h3>Подход к образованию</h3>
                </div>
            </div>
            <div className="footer_t">
                <h4>Возникли вопросы?
                пишите нам на почту</h4>
                <h5 className="gmail">
                    glebpitushok2008@gmail.com
                </h5>
            </div>
        </div>
        <div className="footer_policy">
            <h1>Политика обработки персональных данных</h1>
            <h1>Публичная оферта</h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
