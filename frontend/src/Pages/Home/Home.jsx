import React from 'react'
import Hero from "./../../Components/Hero/Hero"
import Menu from "./../../Components/Menu/Menu"
import Navbar from '../../Components/Navbar/Navbar'
import Video from '../../Components/video/Video'
import Blog from "../../Components/Blog/Blog"
import "./Home.scss"
function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Menu />
            <Video />
            <Blog />


        </>


    )
}

export default Home