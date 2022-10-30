import { CSidebar, CSidebarBrand, CSidebarNav,  CSidebarToggler } from '@coreui/react';
import './SideMenu.scss';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilHamburgerMenu, cilChevronCircleRightAlt} from '@coreui/icons';
import {testValueArr} from "../../utils/constants";
import { useState } from 'react';

export const SideMenu = ({setItemType}) => {
  const [menuHidden, setMenuHidden] = useState(true);

  const hideMenuHandler = (e) => {
    if (e.target.id === "open") {
      setMenuHidden(false);
      return eventListenerHandler(e.target.id);
    }
    if(e.key === "Escape" ||
    e.target.id === "close" || 
    e.target.id === "background" || 
    e.target.getAttribute("name") === "link") {
      setMenuHidden(true);
      eventListenerHandler("close");
      setItemType(e.target.id)
    }
  }

  const eventListenerHandler = (action) => {
    if(action === "open") {
      document.addEventListener('click', hideMenuHandler);
      document.addEventListener('keydown', hideMenuHandler);
    }
    if(action === "close") {
      document.removeEventListener('click', hideMenuHandler);
      document.removeEventListener('keydown', hideMenuHandler);
    }
  }
  return (  
    <>
    <CSidebarToggler className={`side-menu side-menu__open-btn no-print ${!menuHidden && 'side-menu__hidden'}` } onClick={hideMenuHandler}>
      <CIcon size="xxl" className='no-print' icon={cilHamburgerMenu} id="open"/>
    </CSidebarToggler>
    <div className={`side-menu__background no-print ${menuHidden && 'side-menu__background_hidden'}`} id="background">
      <CSidebar className={`side-menu ${menuHidden && 'side-menu__hidden'}`}>
        <CSidebarBrand>навигатор</CSidebarBrand>
        <CSidebarNav className='side-menu__nav'>
          <Link to="/" 
                onClick={hideMenuHandler} 
                name="link" 
                className='side-menu__link'>
                  <CIcon customClassName="nav-icon" 
                         className='side-menu__link-icon' 
                         icon={cilChevronCircleRightAlt} />
                         Форма
          </Link>  
          {testValueArr.map((item, i) => {
            return (<Link to="/item-list"
                          key={i} 
                          onClick={hideMenuHandler} 
                          name="link" 
                          id={item.title}
                          className='side-menu__link' >
                      <CIcon customClassName="nav-icon" 
                             className='side-menu__link-icon' 
                             icon={cilChevronCircleRightAlt} />
                      {item.title}
                    </Link>)
          })}
        </CSidebarNav>
        <CSidebarToggler onClick={hideMenuHandler} id="close"/>
      </CSidebar>
    </div>
  </>
  )
}