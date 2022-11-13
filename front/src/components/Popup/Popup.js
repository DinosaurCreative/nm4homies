import './Popup.scss';



export const Popup = ({show, setPopupVisible}) => {
  setTimeout(() => {
    setPopupVisible(false);
  } , 1500);
  return (<div className={`popup ${show && 'popup_visible'}`} >
    <div className={`popup__img`}></div>
  </div>)};

