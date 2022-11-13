import './ItemList.scss';

import { Item } from './Item/Item';
import { CButton } from '@coreui/react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { deleteStickerPack, getAllStickerPacks } from '../../api/api';


export const ItemList = ({ values, valNum, setStickers, setPopupVisible, setMessage, warningMessageHandler }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handlePrint = () => {
    setMessage('');
    window.print();
  }

  useEffect(() => {
    if(values.length === 0) {
      searchParams.delete('id');
      searchParams.delete('number');
      navigate('/');
    }
  }, []);
  
  const handleDelete = () => {
    setMessage('');
    deleteStickerPack(searchParams.get('id'))
      .then(() => {
        navigate('/');
        setPopupVisible(true);
        getAllStickerPacks()
          .then(res=> setStickers(res.data.data))
          .catch(e => console.log(e));
      })
      .catch((err) => {
        warningMessageHandler(err.response.data.message);
        navigate('/');
      });  
  };
  
  useEffect(() => {
    const id = searchParams.get('id') ?? values[valNum]?._id;
    const number = searchParams.get('number') ?? valNum;
    if(id === 'undefined') {
      return navigate('/');
    };
    setMessage(values[valNum]?.description ?? values[number]?.description);
    setSearchParams({id, number: valNum || number});
    setData({
      id,
      number: number || valNum,
    });
  }, [values, valNum]);


  const separate = useMemo(() => {  
    const response = [];
    values[+data.number]?.stickersArray.forEach(item => {
      let lenght = item.quantity; 
      for(let i = 0; i < lenght; i++) {
        response.push({
          date: values[+data.number].date,
          size: item.size,
          title: item.title,
          color: item.color,
        });
      }
    })
    return response;
  }, [values, valNum, data.number]);

  const prepareItems = (item, index) => (
    <Item key={index}
      number={1 + index}
      date={item.date} 
      title={item.title}
      color={item.color}
      size={item.size.toUpperCase()} />
  );

  return (
    <div className='grid__container'>
      <div className='grid__button-container no-print'>
        <CButton className='grid__button' color='warning' onClick={handleDelete}>Удалить</CButton>
        <CButton className='grid__button' color="info" onClick={handlePrint}>Печатать</CButton>
      </div>
      <div className='grid'>
        {separate.map((item, index) => prepareItems(item, index))}
      </div>
    </div>
  );
};
