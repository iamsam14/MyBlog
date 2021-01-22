import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { useHistory } from 'react-router-dom';

const NavigationBar = () => {
 const [open, setOpen] = useState(false);
 const { setCurrentUser } = useContext(AppContext);
 const history = useHistory();

 const toggleMenu = () => {
  setOpen(!open);
 };

 const handleLogout = (e) => {
  axios
   .post('/api/users/logout', { withCredentials: true })
   .then(() => {
    setCurrentUser(null);
    sessionStorage.removeItem('user');
    history.push('/login');
   })
   .catch((error) => console.log(error));
 };

 return (
  <nav>
   <div className={open ? 'menu-button open' : 'menu-button'}>
    <span
     className={open ? 'menu-button-burger open' : 'menu-button-burger'}
     onClick={() => toggleMenu()}
    ></span>
   </div>
   <nav className={open ? 'nav open' : 'nav'}>
    <ul className={open ? 'menu-nav open' : 'menu-nav'}>
     <li className={open ? 'menu-nav-item open' : 'menu-nav-item'}>
      <a className="menu-nav-link" href="/home">
       Home
      </a>
     </li>
     <li className={open ? 'menu-nav-item open' : 'menu-nav-item'}>
      <a href="/articles" className="menu-nav-link">
       Recipes
      </a>
     </li>
     <li className={open ? 'menu-nav-item open' : 'menu-nav-item'}>
      <a href="/search" className="menu-nav-link">
       Search
      </a>
     </li>
     <li className={open ? 'menu-nav-item open' : 'menu-nav-item'}>
      <a href="#0" onClick={() => handleLogout()} className="menu-nav-link">
       Logout
      </a>
     </li>
    </ul>
   </nav>
  </nav>
 );
};

export default NavigationBar;
