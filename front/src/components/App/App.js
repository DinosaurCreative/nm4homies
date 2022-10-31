import './App.scss';
import { Routes, Route } from "react-router-dom";
import { ItemList } from '../ItemList/ItemList';
import { AddItemsForm } from '../AddItemsForm/AddItemsForm';
import { SideMenu } from '../SideMenu/SideMenu';
import { useEffect, useState } from 'react';
import { getAllStickerPacks, login, checkToken, signout } from '../../api/api';

function App() {
  const [itemType, setItemType] = useState();
  const [userLoogged, setUserLogged] = useState(false);

  useEffect(() => {
    // signout()
    // login({password: "4229421!"})
      // .then(() => setUserLogged(true))
      // .catch(() => console.log("Авторизуйтесь"))
  },[])

  return (
    <div className="App">
      <SideMenu setItemType={setItemType}/>
      <Routes>
        <Route exact path="/" element={<AddItemsForm />} />
        <Route path="/item-list" element={<ItemList  value={itemType}/>}/>
      </Routes>
    </div>
  );
}

export default App;
