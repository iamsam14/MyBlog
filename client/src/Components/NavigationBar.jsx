import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { useHistory } from "react-router-dom";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AppContext);
  const history = useHistory();
  const toggleMenu = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    axios.post("/users/api/logout");
    history.push("/login");
  };

  return (
    <nav>
      <div className={open ? "menu-button open" : "menu-button"}>
        <span
          className={open ? "menu-button-burger open" : "menu-button-burger"}
          onClick={() => toggleMenu()}
        ></span>
      </div>
      <nav className={open ? "nav open" : "nav"}>
        <ul className={open ? "menu-nav open" : "menu-nav"}>
          {currentUser ? (
            <>
              <li className={open ? "menu-nav-item open" : "menu-nav-item"}>
                <a href="/home" className="menu-nav-link">
                  Home
                </a>
              </li>
              <li className={open ? "menu-nav-item open" : "menu-nav-item"}>
                <a href="/articles" className="menu-nav-link">
                  Recipes
                </a>
              </li>
              <li className={open ? "menu-nav-item open" : "menu-nav-item"}>
                <a href="#" className="menu-nav-link">
                  Search
                </a>
              </li>
              <li className={open ? "menu-nav-item open" : "menu-nav-item"}>
                <a
                  onClick={() => handleLogout()}
                  href="/login"
                  className="menu-nav-link"
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li className={open ? "menu-nav-item open" : "menu-nav-item"}>
                <a href="/" className="menu-nav-link">
                  SignUp
                </a>
              </li>
              <li className={open ? "menu-nav-item open" : "menu-nav-item"}>
                <a href="/login" className="menu-nav-link">
                  Login
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </nav>
  );
};

export default NavigationBar;
