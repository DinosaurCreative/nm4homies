import './DescriptionPopup.scss'

import { CCloseButton } from '@coreui/react'

export const DescriptionPopup = ({message, setMessage}) => {
  return message && (
      <div className='description-popup no-print'>
        <CCloseButton className='description-popup__close-btn' onClick={() => setMessage('')}/>
        <p className='description-popup__message'>{message}</p>
      </div>
  );
};