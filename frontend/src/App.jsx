import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing.jsx'
import Authentication from './pages/authentication.jsx'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/home" element={<LandingPage />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication/>}/>
          {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
