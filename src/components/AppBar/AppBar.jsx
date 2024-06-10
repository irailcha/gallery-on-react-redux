import React from "react";
import "./AppBar.css";
import { NavLink, Outlet } from "react-router-dom";

const AppBar = () => {
  return (
    <div>
      <div className="app-bar">
        <NavLink to="/images">Images</NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default AppBar;
