import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/homePage/HomePage'
import Intro from './pages/Intro/Intro'
import AboutPage from './pages/aboutPage/AboutPage'
import BackgroundMusic from './pages/Intro/BackgroundMusic'

const App = () => {
  return (
    <div>
      <BackgroundMusic />
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App