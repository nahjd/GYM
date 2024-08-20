import React from 'react'
import Hero from "./../../Components/Hero/Hero"
import Menu from "./../../Components/Menu/Menu"
import Navbar from '../../Components/Navbar/Navbar'
import Video from '../../Components/video/Video'
import Blog from "../../Components/Blog/Blog"
import "./Home.scss"
import Timetable from '../../Components/Timetable/Timetable'
function Home() {
    return (
        <>

            <Hero />
            <Blog />
            <Video />
            <Menu />
            <Timetable />


        </>


    )
}

export default Home