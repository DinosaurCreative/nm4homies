import './App.scss';
import { Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
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
  const [warningMessage, setWarningMessage] = useState('');
  const [stickerArrNum, setStickerArrNum] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const [valuesForPopup, setValuesForPopup] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const number = searchParams.get('number') ?? arrNumber;
    setStickerArrNum(number);
  }, [stickers, arrNumber])
  
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

useEffect(() => {
  if(location.pathname !== '/') {
    setValuesForPopup([]);
  }
}, [location])

  const warningMessageHandler = msg => {
    setWarningMessage(msg);
    setTimeout(() => {
      setWarningMessage('');
    },2500)
  }

  return (
    <div className='App'>
      <div className={`App__warning-msg-container ${!warningMessage && 'App__warning-msg-container_hidden'}` }>
        <p className={`App__warning-msg`}>{warningMessage}</p>
      </div>
      <Popup show={popupVisible} setPopupVisible={setPopupVisible} />
      <DescriptionPopup message={message} setMessage={setMessage} elements={valuesForPopup}/>
      {tokenCheck && <CSpinner className='spinner' variant='grow'/>}
      {!tokenCheck && <>
      {!isLogged && <Login setIsLogged={setIsLogged} setTokenCheck={setTokenCheck} warningMessageHandler={warningMessageHandler}/>}
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
                                                       setMessage={setMessage}
                                                       warningMessageHandler={warningMessageHandler}
                                                       setValuesForPopup={setValuesForPopup}/>} />
          {(!!stickers.length && stickerArrNum) && <Route path='/item-list' element={<ItemList values={stickers} 
                                                                            valNum={arrNumber} 
                                                                            setStickers={setStickers} 
                                                                            setPopupVisible={setPopupVisible}
                                                                            setMessage={setMessage}
                                                                            warningMessageHandler={warningMessageHandler}
                                                                            />}/>}
        </Routes>
      </>}
    </>}
    </div>
  );
};

export default App;
