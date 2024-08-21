import React, { useState } from 'react';
import './Video.scss';
import video from './../../../images/Cinematic Fitness Video (Featuring DVTraining).mp4';
import { IoIosPlayCircle } from "react-icons/io";
import Timetable from '../Timetable/Timetable';

const Video = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handleClose = () => {
        setIsPlaying(false);
    };

    return (
        <div className="videosection">
            <div className="videosectcont">
                <div className={`video ${isPlaying ? 'playing' : ''}`}>
                    {!isPlaying && (
                        <div className="play-icon" onClick={handlePlay}>
                            <div className="icon-animation"><IoIosPlayCircle className='circle' /></div>
                        </div>
                    )}
                    {isPlaying && (
                        <div className="close-icon" onClick={handleClose}>
                            &times;
                        </div>
                    )}
                    <video controls={isPlaying} autoPlay={isPlaying}>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <Timetable />
        </div>
    );

}



export default Video;
