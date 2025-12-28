import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/homePage/HomePage'
import BaitsPage from "./pages/baitsPage/BaitsPage"
import LicensePage from "./pages/licensePage/LicensePage"
import Intro from './pages/Intro/Intro'
import AboutPage from './pages/aboutPage/AboutPage'
import BackgroundMusic from './components/layout/BackgroundMusic'

const App = () => {
  return (
    <div>
      <BackgroundMusic />
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/baits" element={<BaitsPage />} />
        <Route path="/license" element={<LicensePage />} />
      </Routes>
    </div>
  )
}

export default App