import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
const index = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default index;