import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Intro from './pages/Intro/Intro'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App