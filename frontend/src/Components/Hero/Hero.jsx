import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import './Hero.scss';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Hero() {
    return (
        <div >
            <Swiper
                spaceBetween={0}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="hero">
                        <div className="main">
                            <div className="text1">
                                <h1> JOIN US ON OUR <br />FITNESS JOURNEY   </h1>


                                <p>Lorem ipsum dolor sit amet.</p> <br />
                                <button>
                                    READ MORE
                                </button>
                            </div>
                        </div>

                    </div>




                </SwiperSlide>
                <SwiperSlide>

                    <div className="hero hero1">
                        <div className="main">
                            <div className="text1">
                                <h1> JOIN US ON OUR <br />FITNESS JOURNEY   </h1>


                                <p>Lorem ipsum dolor sit amet.</p> <br />
                                <button>
                                    READ MORE
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide> <div className="hero hero2">
                    <div className="main">
                        <div className="text1">
                            <h1> JOIN US ON OUR <br />FITNESS JOURNEY   </h1>


                            <p>Lorem ipsum dolor sit amet.</p> <br />
                            <button>
                                READ MORE
                            </button>
                        </div>
                    </div>
                </div>
                </SwiperSlide>

            </Swiper>

        </div>
    );
}

export default Hero;