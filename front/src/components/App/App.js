import './App.scss';
import { Routes, Route } from "react-router-dom";
import { ItemList } from '../ItemList/ItemList';
import { AddItemsForm } from '../AddItemsForm/AddItemsForm';
import { SideMenu } from '../SideMenu/SideMenu';
import { useState } from 'react';

function App() {
  const [itemType, setItemType] = useState();
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
