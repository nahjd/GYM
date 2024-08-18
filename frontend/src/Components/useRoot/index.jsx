import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
const index = () => {

    // const location = useLocation();
    // const showNavbar = location.pathname !== '/';
    // const showNavbar1 = location.pathname !== '/register';



    return (
        <>

            <Outlet />
            {/* {showNavbar && showNavbar1 && detail < Navbar />} */}

            <Navbar />
            <Footer />
        </>
    );
};

export default index;