import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Calendar from './pages/Calendar';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Calendar/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        <Footer/>
      </Router>
      {/* <LifeCalendar /> */}
      
    </div>
  );
}

export default App;
