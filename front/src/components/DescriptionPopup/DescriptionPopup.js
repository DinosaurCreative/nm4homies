import './DescriptionPopup.scss'

import { CCloseButton } from '@coreui/react'

export const DescriptionPopup = ({message, setMessage, elements}) => {
  const addItem = ({ title, quantity, size, color }) => (
    <div className='description-popup__container'>
      <p className='description-popup__container_item'>Изделие: {title}</p>
      <p className='description-popup__container_item'>Цвет: {color}</p>
      <p className='description-popup__container_item'>Размер: {size}</p>
      <p className='description-popup__container_item'>Кол-во: {quantity}</p>
    </div>
  )

  return (message || !!elements.length) && (
      <div className={`description-popup no-print ${!!elements.length && 'description-popup__item-list'}`}>
        {elements.length ? 
            elements.map(item => addItem(item)) :
          <>
            <CCloseButton className='description-popup__close-btn' onClick={() => setMessage('')}/>
            <p className='description-popup__message'>{message}</p>
          </>  
        }
      </div>
  );
};