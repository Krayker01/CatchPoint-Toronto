import React from 'react'
import Footer from '../../components/layout/Footer.jsx'
import NavBar from '../../components/layout/NavBar.jsx'
import FishLocationSelector from './FishLocationSelector.jsx'
import "./HomePage.css"

const HomePage = () => {
    return (
        <div className="background-wrapper">
            <div className="background">
                <NavBar />
                <div className="content">
                    <div className="content-left">
                        <FishLocationSelector />
                    </div>
                    <div className="content-right">

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default HomePage
