import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Success.scss";

const Success = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="alert-popup-container10">
            <div className="iconlar">
                <div className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
                <div className="alert-popup-title">Success!!!</div>
                <div className="alert-popup-message">
                    Your imaginary file is safe :)
                </div>
                <div className="alert-popup-confirm">
                    <button onClick={handleClick}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default Success;
