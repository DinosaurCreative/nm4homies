import './SideMenu.scss';
import { CButton, CSidebar, CSidebarBrand, CSidebarNav,  CSidebarToggler } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilHamburgerMenu} from '@coreui/icons';
import { useState } from 'react';
import { signout, setToken } from '../../api/api';

export const SideMenu = ({ setIsLogged, items, setArrNumber, setMessage}) => {
  const [menuHidden, setMenuHidden] = useState(true);
  const navigate = useNavigate();
  const hideMenuHandler = (e) => {
    if (e.target.id === 'open') {
      setMenuHidden(!menuHidden);
      return eventListenerHandler(e.target.id);
    };
    if(e.key === 'Escape' ||
    e.target.id === 'close' || 
    e.target.id === 'background' || 
    e.target.getAttribute('name') === 'link') {
      setMenuHidden(true);
      eventListenerHandler('close');
    };
  };
  const signOutHandler = () => {
    signout()
      .then(() => {
        setToken(null); // Удаляем токен из localStorage
        setIsLogged(false);
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
        setToken(null); // Удаляем токен даже при ошибке
        setIsLogged(false);
      });
  };
  
  const eventListenerHandler = (action) => {
    if(action === 'open') {
      document.addEventListener('click', hideMenuHandler);
      document.addEventListener('keydown', hideMenuHandler);
      setMessage('');
    };
    if(action === 'close') {
      document.removeEventListener('click', hideMenuHandler);
      document.removeEventListener('keydown', hideMenuHandler);
    };
  };
  const openStickerPack = e => {
    setArrNumber(e.target.id);
  };
  return (  
    <>
    <CSidebarToggler className={`side-menu side-menu__open-btn no-print  no-print` } onClick={hideMenuHandler}>
      <CIcon size='xxl' className='no-print' icon={cilHamburgerMenu} id='open'/>
    </CSidebarToggler>
    <div className={`side-menu__background no-print ${menuHidden && 'side-menu__background_hidden'}`} id='background'>
      <CSidebar className={`side-menu ${menuHidden && 'side-menu__hidden'}`}>
        <CSidebarBrand>навигатор</CSidebarBrand>
        <CSidebarNav className={`side-menu__nav ${menuHidden && 'side-menu__nav_hidden'}`}>
          <Link to='/' 
                onClick={hideMenuHandler} 
                name='link' 
                className='side-menu__link'>
                         Создать стикеры
          </Link>  
          {items.map((item, i) => {
            return (<Link to='/item-list'
                          key={item._id} 
                          onClick={openStickerPack}
                          name='link' 
                          id={i}
                          items={item}
                          className='side-menu__link' >
                      {item.setTitle ? `${item.setTitle} ${item.date}` : item.date}
                    </Link>)
          })}
        </CSidebarNav>
        <CButton color='dark' className={`side-menu__logout-btn ${menuHidden && 'side-menu__logout-btn_hidden'}`} onClick={signOutHandler}>Выйти</CButton>
        <CSidebarToggler onClick={hideMenuHandler} id='close'/>
      </CSidebar>
    </div>
  </>
  );
};