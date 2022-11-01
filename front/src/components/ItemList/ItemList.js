import './ItemList.scss';

import { Item } from './Item/Item';
import { CButton } from '@coreui/react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { deleteStickerPack, getAllStickerPacks } from '../../api/api';


export const ItemList = ({ values, valNum, setStickers, setPopupVisible, setMessage }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState({})
  
  const handlePrint = () => {
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
    deleteStickerPack(searchParams.get('id'))
      .then(() => {
        setPopupVisible(true);
        setTimeout(()=>{
          setPopupVisible(false)
        } , 1000)
        getAllStickerPacks()
          .then(res=> {
            setStickers(res.data.data)
          })
      })
      .then(() => {
        navigate('/');
      })
      .catch((e) => console.log(e))
      
  }

  useEffect(() => {
    const id = searchParams.get('id') ?? values[valNum]._id;
    const number = searchParams.get('number') ?? valNum;
    setMessage(values[valNum]?.description ?? values[number]?.description)
    setSearchParams({id, number: valNum || number});
    setData({
      id,
      number: number || valNum,
    })

  }, [values, valNum])

  const separate = useMemo(() => {  
    const response = [];
    const valLength = Math.ceil(values[+data.number]?.quantity / 21);
    let lenght = values[+data.number]?.quantity; 

    for(let i = 0; i < valLength; i++) {
      let arr = [];
      let t = 0;
      while(t < 21 && t < lenght) {
        arr.push({
          date: values[+data.number].date,
          size: values[+data.number].size,
          title: values[+data.number].title,
          color: values[+data.number].color,
        })
        t++
      }
        lenght = lenght - 21
        response.push(arr);
    }
    return response
  }, [values, valNum, data.number])

  const prepareItems = (item, index) => (
    <Item key={index}
      number={1 + index}
      date={item.date} 
      title={item.title}
      color={item.color}
      size={item.size.toUpperCase()} />
  )

  return (
    <div className='grid__container'>
      <div className='grid__button-container no-print'>
        <CButton className="grid__button" color="danger" onClick={handleDelete}>Удалить</CButton>
        <CButton className="grid__button" color="secondary" onClick={handlePrint}>Печатать</CButton>
      </div>
      {separate.map((item ,index ) => item ? (
          <div className="grid" key={index}>
            {item?.map((i, indx) => prepareItems(i, indx))}
          </div>
        ) : ""
      )}

    </div>
  )
}
