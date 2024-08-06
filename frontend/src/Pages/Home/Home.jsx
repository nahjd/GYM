import React from 'react'
import Hero from "./../../Components/Hero/Hero"
import Menu from "./../../Components/Menu/Menu"
import Navbar from '../../Components/Navbar/Navbar'
import Video from '../../Components/video/Video'
import "./Home.scss"
function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Menu />
            <Video />


        </>


    )
}

export default Home