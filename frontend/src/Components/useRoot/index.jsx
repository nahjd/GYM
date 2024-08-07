import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
const index = () => {
    return (
        <>

            <Outlet />
            <Navbar />
        </>
    );
};

export default index;