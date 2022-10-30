import './ItemList.scss';

import { Item } from './Item/Item';
import values from "../../utils/constants";
import { CButton } from '@coreui/react';

export const ItemList = ({value}) => {

  const handlePrint = () => {
    window.print();
  }
  const handleDelete = () => {

  }
  return (
    <div className='grid__container'>
      <div className="grid">
        {values[value]?.map((vla, indx) => (
          <Item key={indx}
          number={1 + indx}
          date={vla.date} 
          title={vla.title}
          color={vla.color}
          size={vla.size} />
          ) )}
      </div>
      <div className='grid__button-container'>
        <CButton className="no-print grid__button" color="danger" onClick={handleDelete}>Удалить</CButton>
        <CButton className="no-print grid__button" color="secondary" onClick={handlePrint}>распечатать</CButton>
      </div>
    </div>
  )
}
