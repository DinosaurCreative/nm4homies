import './ItemList.scss';

import { Item } from './Item/Item';
import {firstValue} from "../../utils/constants";
import { CButton } from '@coreui/react';
import { useMemo } from 'react';
export const ItemList = ({value}) => {

  const handlePrint = () => {
    window.print();
  }
  const handleDelete = () => {

  }
  const separate = useMemo(() => {  
    const response = [];
    const valLength = Math.ceil(firstValue?.length / 20);

    for(let i = 0; i < valLength; i++) {
      console.log(i)
      response.push([firstValue.slice(i * 21, + (i * 21 + 21))]);
    }

    return response
  }, [firstValue])

  const prepareItems = (items, i) => (
            items.map((item, index) => 
              (
              <Item key={index}
                number={1 + index}
                date={item.date} 
                title={item.title}
                color={item.color}
                size={item.size} />
            )))

  return (
    <div className='grid__container'>
      {separate.map((item ,index ) => item[0].length ? (
          <div className="grid" key={index}>
            {item.map((i, indx) => prepareItems(i, indx))}
          </div>
        ) : ""
      )}
    <div className='grid__button-container'>
        <CButton className="no-print grid__button" color="danger" onClick={handleDelete}>Удалить</CButton>
        <CButton className="no-print grid__button" color="secondary" onClick={handlePrint}>распечатать</CButton>
      </div>
    </div>
  )
}
