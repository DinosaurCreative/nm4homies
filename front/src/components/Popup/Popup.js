import './Popup.scss';



export const Popup = ({show, fail}) => (
  <div className={`popup ${show && 'popup_visible'}`} >
    <div className={`popup__img ${fail && 'popup__img_fail'}`}></div>
  </div>)

