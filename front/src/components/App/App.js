import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ItemList } from '../ItemList/ItemList';
import { AddItemsForm } from '../AddItemsForm/AddItemsForm';
import { Login } from '../Login/Login';
import { SideMenu } from '../SideMenu/SideMenu';
import  { Popup } from '../Popup/Popup';
import { DescriptionPopup } from '../DescriptionPopup/DescriptionPopup';
import { useEffect, useState } from 'react';
import { getAllStickerPacks, checkToken } from '../../api/api';
import { CSpinner } from '@coreui/react';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [tokenCheck, setTokenCheck] = useState(true);
  const [stickers, setStickers] = useState([]);
  const [arrNumber, setArrNumber] = useState();
  const [popupVisible, setPopupVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [fail, setFail] = useState(false);

  useEffect(() => {
    checkToken()
      .then(() => {
        setIsLogged(true);
        getAllStickerPacks()
          .then(e => setStickers(e.data.data))
          .catch(e => console.log(e))
      })
      .catch(() => setIsLogged(false))
      .finally(() => setTokenCheck(false));
  },[]);

  return (
    <div className='App'>
      <Popup show={popupVisible} fail={fail}/>
      <DescriptionPopup message={message} setMessage={setMessage}/>
      {tokenCheck && <CSpinner className='spinner' variant='grow'/>}
    {!tokenCheck && <>
      {!isLogged && <Login setIsLogged={setIsLogged} setTokenCheck={setTokenCheck} setPopupVisible={setPopupVisible} setFail={setFail}/>}
      {isLogged && <>
        <SideMenu setIsLogged={setIsLogged} 
                  items={stickers} 
                  setArrNumber={setArrNumber}
                  setMessage={setMessage}
                  />
        <Routes>
          <Route exact path='/' element={<AddItemsForm setStickers={setStickers} 
                                                       setTokenCheck={setTokenCheck} 
                                                       setPopupVisible={setPopupVisible}
                                                       setMessage={setMessage}/>} />
          {!!stickers.length && <Route path='/item-list' element={<ItemList values={stickers} 
                                                                            valNum={arrNumber} 
                                                                            setStickers={setStickers} 
                                                                            setPopupVisible={setPopupVisible}
                                                                            setMessage={setMessage}/>}/>}
        </Routes>
      </>}
    </>}
    </div>
  );
};

export default App;
