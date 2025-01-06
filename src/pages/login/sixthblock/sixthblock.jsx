import React from 'react';
import './sixthblock.css'
// Простой функциональный компонент
function Sixthblock() {
  return (
    <div className="sixth_container">
        <div className="sixth_content">
            <div className="sixth_info">
                <h1>Присоединяйтесь к OnTutor сейчас</h1>
                <p>Зарегистрируйтесь, выберите направление в котором хотите работать  и приступайте. Присоединяясь к нашему проекту, вы становитесь частью сообщества, где можете обмениваться опытом и получать поддержку от других учеников и преподавателей.</p>
                <button><h2>Все предметы</h2></button>
            </div>
        </div>
        <div className="sixth_girl">
            <img src="girlwithmacbook.png" alt="" />
        </div>
    </div>
  );
}

export default Sixthblock;