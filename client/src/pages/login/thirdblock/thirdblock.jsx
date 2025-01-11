import React from 'react';
import './thirdblock.css'
// Простой функциональный компонент
function Thirdblock() {
  return (
    <div className="third_container">
        <div className="third_content">
            <div className="third_card">
                <img src="girl4.png" alt="" />
            </div>
            <div className="third_info">
                <h1>Выбирайте свой формат обучения</h1>
                <p>Онлайн-уроки Уроки через видеосвязь, что позволяет учиться из любой точки мира. Удобно для занятых людей или тех, кто живет в удаленных районах.</p>
                <p>Очные занятия Личное взаимодействие с репетитором в удобном месте, что может быть полезно для практических занятий или лабораторных работ.</p>
                <button><h2>Все предметы</h2></button>
            </div>
        </div>
    </div>
  );
}

export default Thirdblock;