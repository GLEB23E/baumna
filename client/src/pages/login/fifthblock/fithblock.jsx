import React from 'react';
import './fithblock.css'
// Простой функциональный компонент
function Fithblock() {
  return (
    <div className="fifth_container">
        <div className="fifth_content">
            <div className="fifth_block">
                <div className="fifth_block1"></div>
                <div className="fifth_block2"></div>
                <div className="fifth_block3"></div>
                <div className="fifth_block4"></div>
                <div className="fifth_block5"></div>
            </div>
            <div className="fith_info">
                <h1>Почему именно мы?</h1>
                <div className="fith_num">
                    <h1>01</h1>
                    <p>Широкий выбор предметов и только квалифицированные специалисты</p>
                </div>
                <div className="fith_num">
                    <h1>02</h1>
                    <p>Гибкое расписание, которое вы можете настроить под себя предварительно договорившись с преподавателем</p>
                </div>
                <div className="fith_num">
                    <h1>03</h1>
                    <p>Возможность привязать электронный журнал (МЭШ) для более быстрого выявления слабостей ребенка в той или иной сфере</p>
                </div>
                <button><h2>Посмотреть все</h2></button>
            </div>
        </div>
    </div>
  );
}

export default Fithblock;