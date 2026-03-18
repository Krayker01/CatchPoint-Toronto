import React, { useState } from 'react'
import Footer from '../../components/layout/Footer.jsx'
import NavBar from '../../components/layout/NavBar.jsx'
import RateLimitUI from '../../components/layout/RateLimitUI.jsx'
import FishLocationSelector from './FishLocationSelector.jsx'
import "./HomePage.css"
import FishCardMap from './FishCardMap.jsx'

const HomePage = () => {
    const [isRateLimited, setRateLimited] = useState(false);
    const handleRateLimit = () => {
        setRateLimited(true);
    };
    return (
        <div className="background-wrapper">
            <div className="background">
                <NavBar />

                {!isRateLimited ? <div className="content">
                    <div className="content-left">
                        <FishLocationSelector onRateLimit={handleRateLimit} />
                    </div>
                    <div className="content-right">
                        <FishCardMap />
                    </div>
                </div> : <RateLimitUI />}

                <Footer />
            </div>
        </div>
    )
}

export default HomePage
