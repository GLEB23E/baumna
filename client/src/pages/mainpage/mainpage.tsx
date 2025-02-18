import React, { useEffect } from "react"
import { useState } from "react"
import './mainpage.css'

const MainPage = () => {
    const [page, setPage] = useState(0)

    const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('File uploaded successfully!');
        console.log(result);
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('File upload failed');
    }
  };




    const inner = (name, surnname, descr, phone, price) => {
        const el = `<div class="infoi">
                        <img src="logo.png" alt="face" />
                        <div class="info_fo">
                            <div class="fullname">
                                <h2 class="namei">${name}</h2>
                                <h2 class="surnname">${surnname}</h2>
                            </div>
                            <div class="descri">
                                <p>${descr}</p>
                            </div>
                            <div class="proin">
                                <div class="phone">
                                    ${phone}
                                </div>
                                <div class="price">
                                    ${price}руб/ч
                                </div>
                            </div>
                        </div>
                    </div>`;
        return el
    }
    const getData = async () => {
        const response = await fetch('http://localhost:3001/api/store');
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json();
        return data 
    }

    useEffect(() => {
        const addCard = async () => {
            console.log(page)
            const data = await getData( )
            const block = document.getElementById('cards');
            const pages = document.getElementById('pages')
            if (block) {
                block.innerHTML = '';
            }
            if (data.length <= 3) {
                if(pages) {
                    pages.style.display = 'none'
                }
                data.forEach(element => {
                    if(block) {
                        const el = inner(element.name, element.surname, element.descr, element.phone, element.price)
                        block.innerHTML += el;
                    }
                });
            } else if (data.length > 3) {
                const mydata = data.slice(page, page+3);
                if(pages) {
                    pages.style.display = 'flex'
                }
                mydata.forEach(element => {
                    if(block) {
                        const el = inner(element.name, element.surname, element.descr, element.phone, element.price)
                        block.innerHTML += el;
                    }
                });
            }
            
        };
        addCard();
    }, [page])


    const pagead = (e) => {
        if (e.target.tagName === 'DIV') {
            console.log(e.target.textContent)
            if (Number(e.target.textContent) === 1) {
                setPage(0)
            } else {
                setPage((Number(e.target.textContent) - 1) * 3)
            }

            
            
        }
    }


    useEffect(() => {
        setPage(0)
    }, [])
    
    
    return (
        <div className="mainPage">
            <div className="profile">
                <div className="prof_info">
                    <div className="photo">
                        <img src="logo.png" alt="sur" />
                        <div className="nameinf">
                            <h2 className="name">
                                ИМЯ
                            </h2>
                            <h2 className="surname">
                                ФАМИЛИЯ
                            </h2>
                        </div>
                    </div>
                    <div className="line">
                    </div>
                    <div className="store">
                        <img src="logo.png" alt="store" />
                        <h2>БИРЖА</h2>
                    </div>
                    <div className="line2">
                    </div>
                    <div className="uppload">
                        <img src="logo.png" alt="plus" />
                        <h2>ДОБАВИТЬ  ОБЪЯВЛЕНИЕ</h2>
                    </div>
                    <div className="line2"></div>
                </div>
            </div>
            <div className="storei">
                <div className="input">
                    <input type="text" />
                    <img src="logo.png" alt="search" />
                </div>
                <div id='cards' className="cards"></div>
                <div onClick={pagead} id="pages" className="pagesofcards">
                        <div className="f">1</div>
                        <div className="s">2</div>
                        <div className="t">3</div>
                        <div className="fi">4</div>
                        <div className="s">5</div>
                        <div className="se">6</div>
                        <div className="e">7</div>
                </div>
            </div>
            <div className="add">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="image">Choose a file to upload:</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    )
}
export default MainPage;