import React from 'react'
import { Outlet } from 'react-router-dom'

const Proected = () => {

    const token = localStorage.getItem('token')
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Proected