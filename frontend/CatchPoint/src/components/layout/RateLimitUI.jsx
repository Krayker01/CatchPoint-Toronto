import React from 'react'
import "./RateLimitUI.css"

const RateLimitUI = () => {
    return (
        <div className="rate-limit-wrapper">
            <h2 className="rate-limit-title tagesschrift-regular">Too Many Requests</h2>
            <p className="rate-limit-text tagesschrift-regular">
                Please wait a moment and try again.
            </p>
        </div>
    );
};

export default RateLimitUI;