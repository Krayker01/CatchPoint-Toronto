import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import "../layout/NavBar.css";
import "../layout/NavBarButton.css";

const NavBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <nav className="navbar">
            {/* Burger */}
            <button
                className="navbar-button navbar__hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <Menu size={32} />
            </button>

            {/* Logo */}
            <div className="navbar__logo caveat-500">
                CatchPoint
            </div>

            {/* Menu */}
            <ul className={`navbar__menu ${mobileMenuOpen ? "open" : ""}`}>
                <li>
                    <NavLink to="/home" onClick={closeMenu}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/baits" onClick={closeMenu}>
                        Baits
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/license" onClick={closeMenu}>
                        License
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" onClick={closeMenu}>
                        About Us
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
