import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
import { BiBasket, BiHeart } from 'react-icons/bi';
import { MdOutlineLogin } from "react-icons/md";
import { RiMenuFill, RiCloseFill } from 'react-icons/ri';
import img1 from "./../../../images/navleft.png";
import { RiAdminFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { Link as ScrollLink } from 'react-scroll';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const wishlistCount = useSelector((state) => state.gym.wishlist.length);
    const basketCount = useSelector((state) => state.gym.basket.length);

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
                    <li>

                        <ScrollLink
                            to="hero"
                            smooth={true}
                            duration={500}
                            offset={-70}
                        >
                            HOME
                        </ScrollLink>


                    </li>
                    <li>
                        <ScrollLink
                            to="bmi"
                            smooth={true}
                            duration={500}
                            offset={-70}
                        >
                            BMI
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="video"
                            smooth={true}
                            duration={500}
                            offset={-70}
                        >
                            VIDEO
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="shop"
                            smooth={true}
                            duration={500}
                            offset={-70}
                        >
                            SHOP
                        </ScrollLink>
                    </li>
                    <Link to="/wishlist">
                        <BiHeart style={{ color: "white", fontSize: "25px" }} />
                        {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
                    </Link>
                    <Link to="/basket">
                        <BiBasket style={{ color: "white", fontSize: "25px" }} />
                        {basketCount > 0 && <span className="count-badge">{basketCount}</span>}
                    </Link>
                </ul>
                <div className="rightnav">
                    <Link to="/admin/login">
                        <RiAdminFill style={{ color: "white", marginBottom: "15px" }} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
