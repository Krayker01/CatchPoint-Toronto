import React from 'react'
import Footer from '../../components/layout/Footer.jsx'
import NavBar from '../../components/layout/NavBar.jsx'

const HomePage = () => {
    return (
        <div className="background-wrapper">
            <div className="background">
                <NavBar />
                <Footer />
            </div>
        </div>
    )
}

export default HomePage
