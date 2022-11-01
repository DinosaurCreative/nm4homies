import './SideMenu.scss';
import { CButton, CSidebar, CSidebarBrand, CSidebarNav,  CSidebarToggler } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilHamburgerMenu, cilChevronCircleRightAlt} from '@coreui/icons';
import { useState } from 'react';
import { signout } from '../../api/api';

export const SideMenu = ({ setIsLogged, items, setItems, setArrNumber, setMessage}) => {
  const [menuHidden, setMenuHidden] = useState(true);
  const navigate = useNavigate();
  const hideMenuHandler = (e) => {
    if (e.target.id === 'open') {
      setMenuHidden(!menuHidden);
      return eventListenerHandler(e.target.id);
    }
    if(e.key === 'Escape' ||
    e.target.id === 'close' || 
    e.target.id === 'background' || 
    e.target.getAttribute('name') === 'link') {
      setMenuHidden(true);
      eventListenerHandler('close');
    }
  }
  const signOutHandler = () => {
    signout()
      .then(() => {
        setIsLogged(false);
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
      })
  }
  
  const eventListenerHandler = (action) => {
    if(action === 'open') {
      document.addEventListener('click', hideMenuHandler);
      document.addEventListener('keydown', hideMenuHandler);
      setMessage('');
    }
    if(action === 'close') {
      document.removeEventListener('click', hideMenuHandler);
      document.removeEventListener('keydown', hideMenuHandler);
    }
  }
  const openStickerPack = e => {
    setArrNumber(e.target.id);
    setItems({number: e.target.id});
  }
  return (  
    <>
    <CSidebarToggler className={`side-menu side-menu__open-btn no-print ${!menuHidden && 'side-menu__hidden'} no-print` } onClick={hideMenuHandler}>
      <CIcon size='xxl' className='no-print' icon={cilHamburgerMenu} id='open'/>
    </CSidebarToggler>
    <div className={`side-menu__background no-print ${menuHidden && 'side-menu__background_hidden'}`} id='background'>
      <CSidebar className={`side-menu ${menuHidden && 'side-menu__hidden'}`}>
        <CSidebarBrand>навигатор</CSidebarBrand>
        <CSidebarNav className='side-menu__nav'>
          <Link to='/' 
                onClick={hideMenuHandler} 
                name='link' 
                className='side-menu__link'>
                  <CIcon customClassName='nav-icon side-menu__nav-icon' 
                         className='side-menu__link-icon' 
                         icon={cilChevronCircleRightAlt} />
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
                      <CIcon customClassName='nav-icon side-menu__nav-icon' 
                             className='side-menu__link-icon' 
                             icon={cilChevronCircleRightAlt} />
                      {`${item.color} ${item.title} ${item.date}`}
                    </Link>)
          })}
        </CSidebarNav>
        <CButton color='dark' className={`side-menu__logout-btn ${menuHidden && 'side-menu__logout-btn_hidden'}`} onClick={signOutHandler}>Выйти</CButton>
        <CSidebarToggler onClick={hideMenuHandler} id='close'/>
      </CSidebar>
    </div>
  </>
  )
}