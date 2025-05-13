import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Calendar from './pages/Calendar/Calendar'
import Profile from './pages/Profile/Profile'

import './App.css'

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <main className='main__container'>
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
