import React from 'react'
import Hero from "./../../Components/Hero/Hero"
import Menu from "./../../Components/Menu/Menu"
import Navbar from '../../Components/Navbar/Navbar'
import Video from '../../Components/video/Video'
import Blog from "../../Components/Blog/Blog"
import Timetable from '../../Components/Timetable/Timetable'
import "./Home.scss"

function Home() {
    return (
        <>
            {/* <Navbar /> */}

            <div id="home">


                <Hero />
            </div>

            <div id="bmi">

                <Blog />
            </div>

            <div id="video">
                <Video />
            </div>

            <div id="shop">
                <Menu />
            </div>

            <div id="timetable">
                <Timetable />
            </div>
        </>
    )
}

export default Home;
