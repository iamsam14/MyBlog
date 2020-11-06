import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <header>
      <div className={open ? "menu-button open" : "menu-button"}>
        <span
          className={open ? "menu-button-burger open" : "menu-button-burger"}
          onClick={() => toggleMenu()}
        ></span>
      </div>
      <nav className={open ? "nav open" : "nav"}>
        <ul className={open ? "menu-nav open" : "menu-nav"}>
          <li className={open ? "menu-nav-item open" : "menu-nav-item"}>
            <a onClick={() => history.push("/")} className="menu-nav-link">
              SignUp
            </a>
          </li>
          <li className={open ? "menu-nav-item open" : "menu-nav-item"}>
            <a onClick={() => history.push("/login")} className="menu-nav-link">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
