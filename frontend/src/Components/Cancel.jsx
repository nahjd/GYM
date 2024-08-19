import React from 'react'
import './Cancel.scss';
import { useNavigate } from 'react-router-dom';


const Cancel = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };
    return (
        <div className="alert-popup-container10">
            <div className="iconlar">
                <div className="error-crossmark">
                    <div className="cross-icon">
                        <span className="icon-line line-diagonal-left"></span>
                        <span className="icon-line line-diagonal-right"></span>
                    </div>
                </div>
                <div className="alert-popup-title1">Cancelled</div>
                <div className="alert-popup-message1">
                    Your action was cancelled.
                </div>
                <div className="alert-popup-confirm1">
                    <button onClick={handleClick}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default Cancel;