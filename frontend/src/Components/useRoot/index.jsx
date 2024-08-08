import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
const index = () => {
    return (
        <>

            <Outlet />
            <Navbar />
            <Footer />
        </>
    );
};

export default index;