import React, { useEffect } from "react"
import { useState } from "react"
import './mainpage.css'
import { useNavigate } from 'react-router-dom'; 
import { response } from "express"




const levenshtein = require('levenshtein');
const MainPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0)
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const id = localStorage.getItem('_Id');
    const [sear, setSearch] = useState()
    const [info, setInfo] = useState({
        descr: '',
        phone: '',
        price: '',
        name: '',
        surname: '',
        path: ''

    })
    const [screen, setScreen] = useState(true)
    
    const [best, setBest] = useState<{ key: string; value: string; distance: number }[]>([]);
//const block = document.getElementById('cards');
//block.innerHTML = '';
    useEffect(() => {
        const dop = async () => {
            setBest([])
            const data = await getData()
            const dataArray = Array.isArray(data) ? data : Object.values(data);
            const text_arr = {}
            if (dataArray){
                dataArray.forEach(element => {
                    if (element) {
                        text_arr[element.phone] = element.descr;
                    }
                });
            }
        
            if (sear) {
                const distances = Object.entries(text_arr).map(([key, value]) => {
                    
                    const distance = new levenshtein(value.toLowerCase(), sear.toLowerCase());
                    return { key, value, distance: distance.distance };
                });
                distances.sort((a, b) => a.distance - b.distance);
                setBest(distances.slice(0, 3));
            }
        }
        dop()
    }, [sear]);
    
    useEffect(() => {
        const block = document.getElementById('cards');
        const pages = document.getElementById('pages')
        let tt = []
        if(best && block && pages && sear) {
            console.log(best)
            block.innerHTML = '';
            pages.style.display = 'none'
            
            const show3 = async () => {
                tt = []
                let data = await getData()
    
                best.forEach((element) => {
                    block.innerHTML = '';
                    console.log(element)
                    tt.push(data.find(item => item.phone === element.key))
                })
    
                data = []
               
                tt.forEach(element => {

                    if(block) {
                        const el = inner(element.name, element.surname, element.descr, element.phone, element.price, element.imgpath)
            
                        block.innerHTML += el;
                    }
                });
                
            }
            show3()
        } else {
            
            
            const render = async () => {
                
                if (block) {
                    block.innerHTML = '';
                }
                
                const data = await getData()
                if (data.length > 3) {
                    pages.style.display = 'flex'
                }
                const data2 = data.slice(0, 3)
                block.innerHTML = '';
                data2.forEach(element => {
                    if(block) {
                        const el = inner(element.name, element.surname, element.descr, element.phone, element.price, element.imgpath)
                        block.innerHTML += el;
                    }
                });
                
            }
            render()
        }
    }, [best, sear]);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files.length > 0) {
        setFileName(e.target.files[0].name);
      }
  };
  
  const search = (e) => {
    setSearch(e.target.value)

  }


  const handleInfo = (e) => {
    setInfo({
        ...info, 
        [e.target.getAttribute('name')]: e.target.value
    })
  }


  useEffect(() => {
    const fs = document.getElementById('fs')
    const ss = document.getElementById('ss')
    if (fs && ss) {
        if (screen) {
            ss.style.display = 'none'
            fs.style.display = 'block'
            

        } else {
            fs.style.display = 'none'
            ss.style.display = 'block'
        }
    }
  }, [])
  useEffect(() => {
    const fs = document.getElementById('fs')
    const ss = document.getElementById('ss')
    if (fs && ss) {
        if (screen) {
            ss.style.display = 'none'
            fs.style.display = 'block'
            
        } else {
            fs.style.display = 'none'
            ss.style.display = 'block'
        }
    }
  }, [screen])

  const onsubs = () => {
    setScreen(true)
    window.location.reload();
  }
  const onsuba = () => {
    setScreen(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file  || !info.descr || !info.phone || !info.price) {
      alert('Заполните все данные');
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
        console.log(result.filePath)
        await setInfo({
            ...info,
            path: result.filePath
        })
        alert('File uploaded successfully!');
        
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('File upload failed');
    }
  };
  useEffect(() => {
    const all = async () => {
        const getname = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/userinfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id })  
                });
        
                if (response.ok) {
                    const data = await response.json();  
                    console.log(data);  
                    return data
    
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
        
        
        if (id) {
            const sn = await getname();
            console.log(sn)
            setInfo({
                ...info,
                name: sn.firstName,
                surname: sn.lastName
            })
        }
        
        if (info.path && info.descr && info.name && info.surname && info.phone && info.price) {
            const sendnewstore = async () => {
                const response = await fetch('http://localhost:3001/api/addstore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(info)
                }) 
                if (!response.ok) throw new Error('add failed');
        
            }
            sendnewstore()
        } else {
            return
        }
    } 
    all()
    
  }, [info.path])


    const inner = (name, surnname, descr, phone, price, path) => {
        
        const el = `<div class="infoi">
                        <img class="cover" src="http://localhost:3001${path}" alt="face" />
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
            const data = await getData()
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
                        const el = inner(element.name, element.surname, element.descr, element.phone, element.price, element.imgpath)
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
                        const el = inner(element.name, element.surname, element.descr, element.phone, element.price, element.imgpath)
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
    
    const LogOut = () => {
        localStorage.clear();
        navigate('/home')
    }
    
    return (
        <div className="mainPage">
            <div className="profile">
                <div className="prof_info">
                    <div className="photo">
                        <img onClick={LogOut} style={{width: '30px', height: '30px'}} src="exit.png" alt="sur" />
                        <div className="nameinf">
                            <h2 className="name">
                                {info.name}
                            </h2>
                            <h2 className="surname">
                                {info.surname}
                            </h2>
                        </div>
                    </div>
                    <div className="line">
                    </div>
                    <div onClick={onsubs} className="store">
                        <img style={{width: '30px', height: '30px'}} src="store.png" alt="store" />
                        <h2>БИРЖА</h2>
                    </div>
                    <div className="line2">
                    </div>
                    <div onClick={onsuba} className="uppload">
                        <img style={{width: '30px', height: '30px'}} src="plus.png" alt="plus" />
                        <h2>ДОБАВИТЬ  ОБЪЯВЛЕНИЕ</h2>
                    </div>
                    <div className="line2"></div>
                </div>
            </div>
            <div id='fs' className="storei">
                <div className="input">
                    <input onChange={search} type="text" />
                    <img style={{width: '30px', height: '30px'}} src="search.png" alt="search" />
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
            <div  id='ss' className="add">
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    <label htmlFor="image" className="file-label">
                        {fileName ? fileName : "Загрузите изображение"}
                    </label>
                    <textarea
                        id="descr"
                        name="descr"
                        onChange={handleInfo}
                        className="descr-input"
                        placeholder="Описание"
                    />
                    <div className="df">
                        <input
                            type="text"
                            id="num"
                            name="phone"
                            accept="number"
                            onChange={handleInfo}
                            className="num-input"
                            placeholder="телеграм / номер"
                        />
                        <input
                            type="number"
                            id="price"
                            name="price"
                            accept="number"
                            onChange={handleInfo}
                            className="price-input"
                            placeholder="цена в руб"
                        />
                    </div>
                    <button className="sendButton" type="submit">Загрузить</button>
                </form>
                
            </div>
        </div>
    )
}
export default MainPage;