import React from 'react';
import './fourthblock.css'
// Простой функциональный компонент
function Fourthblock() {
  return (
    <div className="fourth_container">
        <div className="fourth_content">
            <div className="fourth_info">
                <h1>Предметы</h1>
                <p>На нашей платформе вы сможете выбрать любой предмет по школьной програме для классов младшей средней и старшей школы, так же вы можете найти репетитора для подготовки к какому либо экзамену. У нас широкий выбор предметов среди которых вы сможете найти что нибудь подходящее для вас</p>
                <p>У нас можно найти репетитора для игры на музыкальном инструменте, или даже репетитора по внеурочной деятельности, интересующей вас сфере</p>
                <button><h2>Все предметы</h2></button>
            </div>
            <div className="fourth_carousel">
                <img className='fourth_arrow'  src="leftarrow.png" alt="" />
                <div class="fourth_carousel_subjects">
                    <div class="fourth_carousel_subjects_1">
                        <img src="math.png" alt="" />
                        <h1>Математика</h1>
                    </div>
                    <div class="fourth_carousel_subjects_2">
                        <img src="chemistry.png" alt="" />
                        <h1>Химия</h1>
                    </div>
                    <div class="fourth_carousel_subjects_1">
                        <img src="phisiks.png" alt="" />
                        <h1>Физика</h1>
                    </div>
                    <div class="fourth_carousel_subjects_2">
                        <img src="english.png" alt="" />
                        <h1>Англиский язык</h1>
                    </div>
                    <div class="fourth_carousel_subjects_1">
                        <img src="biology.png" alt="" />
                        <h1>Биология</h1>
                    </div>
                    <div class="fourth_carousel_subjects_2">
                        <img src="history.png" alt="" />
                        <h1>История</h1>
                    </div>
                </div>
                <img className='fourth_arrow' src="rightarrow.png" alt="" />
            </div>
        </div>
    </div>
  );
}

export default Fourthblock;