import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
const index = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/';
    return (
        <>

            <Outlet />
            {showNavbar && <Navbar />}
            <Footer />
        </>
    );
};

export default index;