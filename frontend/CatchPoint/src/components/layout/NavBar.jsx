import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo caveat-500">
                CatchPoint
            </div>

            <ul className="navbar__menu">
                <li>
                    <NavLink to="/home">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/baits">Baits</NavLink>
                </li>
                <li>
                    <NavLink to="/license">License</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About Us</NavLink>
                </li>
            </ul>

        </nav>
    );
};

export default NavBar;
