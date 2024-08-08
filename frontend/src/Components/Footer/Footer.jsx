import React from 'react'
import "./Footer.scss"
import img1 from "./../../../images/navleft.png";
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
                <div className="border" id='border'></div>
            </div>
        </>
    )
}

export default Footer