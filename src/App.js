import React from 'react'

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { Header } from './components/Header'

function App() {
  return (
    <Router>
      <div className='w-full h-full'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
