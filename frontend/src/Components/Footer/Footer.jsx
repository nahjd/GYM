import React from 'react'
import "./Footer.scss"
import img1 from "./../../../images/navleft.png";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaVimeoV } from "react-icons/fa";
const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="upfooter">
                    <div className="upleft">
                        <img src={img1} alt="" />
                    </div>
                    <div className="upright">
                        <h1>
                            Start exercising!

                            <div className="squad">

                            </div>

                        </h1>
                    </div>

                </div> <br /> <br />
                <div className="border" id='border'></div> <br /><br />
                <div className="footerss">
                    <div className="footleft">
                        <span>
                            CONTACT US
                        </span>
                        <h1>
                            hello@example.com <br />

                            + 381 123 4567
                        </h1>
                        <p>FOLLOW US</p>
                        <div className="footicon">
                            <li>
                                <a href="https://www.twiter.com"><FaTwitter /></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com"><FaInstagram /></a>
                            </li>

                            <li><a href="https://www.facebook.com"><RiFacebookBoxFill /></a></li>
                            <li>  <a href="https://www.vimeo.com"><FaVimeoV /></a></li>

                        </div>
                    </div>
                    <div className="footright">
                        <div className="footbir">
                            <div className="newyork" id='nmlw'>
                                <span>OUR LOCATIONS</span> <br /> <br />
                                <h1>New York</h1>
                                <pre>45 Grand Ventral <br />
                                    New York, NY 10017</pre>
                            </div>
                            <div className="mondayfriday " id='nmlw'>
                                <span>WORKING HOURS</span> <br /> <br />
                                <h1>Monday - Friday</h1>
                                <pre>Our doors are open <br />
                                    07:00 - 22:00</pre>
                            </div>
                        </div>
                        <div className="footiki">
                            <div className="losangeles " id='nmlw'>
                                <h1>Los Angeles</h1>
                                <pre>10 Port Hueneme <br />
                                    Los Angeles, CA 10088</pre>
                            </div>
                            <div className="weekends" id='nmlw'>
                                <h1>Weekends</h1>
                                <pre>Our doors are open <br />
                                    10:00 - 17:00</pre>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Footer