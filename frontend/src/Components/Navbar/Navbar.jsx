import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import { BiBasket, BiHeart } from 'react-icons/bi';
import { RiMenuFill, RiCloseFill } from 'react-icons/ri';
import img1 from "./../../../images/navleft.png";
import { RiAdminFill } from "react-icons/ri";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="container">
            <div className="Navbar">
                <div className="leftnav">
                    <img src={img1} alt="Logo" className="logo" />
                </div>
                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <RiCloseFill /> : <RiMenuFill />}

                </div>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/blog">BLOG</Link></li>
                    <li><Link to="/portfolio">PORTFOLIO</Link></li>
                    <li><Link to="/shop">SHOP</Link></li>
                    <li><Link to="/wishlist"><BiHeart style={{ color: "white", fontSize: "25px" }} /> </Link></li>
                    <li>  <Link to="/basket" ><BiBasket style={{ color: "white", fontSize: "25px" }} /></Link></li>



                </ul>
                <div className="rightnav">

                    <Link to="/admin/login">
                        <RiAdminFill style={{ color: "white", marginBottom: "15px" }} /></Link>
                </div>
            </div>
        </div>

    );
}

export default Navbar;