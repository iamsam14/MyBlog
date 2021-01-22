import React, { useState } from 'react';

const NavigationBar = () => {
 const [open, setOpen] = useState(false);

 const toggleMenu = () => {
  setOpen(!open);
 };

 return (
  <header>
   <div className={open ? 'menu-button open' : 'menu-button'}>
    <span
     className={open ? 'menu-button-burger open' : 'menu-button-burger'}
     onClick={() => toggleMenu()}
    ></span>
   </div>
   <nav className={open ? 'nav open' : 'nav'}>
    <ul className={open ? 'menu-nav open' : 'menu-nav'}>
     <li className={open ? 'menu-nav-item open' : 'menu-nav-item'}>
      <a href="/" className="menu-nav-link">
       SignUp
      </a>
     </li>
     <li className={open ? 'menu-nav-item open' : 'menu-nav-item'}>
      <a href="/login" className="menu-nav-link">
       Login
      </a>
     </li>
    </ul>
   </nav>
  </header>
 );
};

export default NavigationBar;
