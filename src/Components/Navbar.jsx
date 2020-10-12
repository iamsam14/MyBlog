import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        Recipe Blog
      </Link>
      <div className="collapse navbar-collapse"></div>
    </nav>
  );
};

export default Navbar;
