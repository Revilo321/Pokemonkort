import React from 'react'

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { Header } from './components/Header'
import { CocktailDetails } from './components/CocktailComponents/CocktailDetails'
import { CartPage } from './components/CartPage'
import { CheckoutPage } from './components/CheckoutComponents/CheckoutPage'
import { ConfirmationPage } from './components/ConfirmationPage'
import { AuthProvider } from './AuthProvider'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='w-full h-full'>
          <Header />
          <Routes>
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/cocktail/:id' element={<CocktailDetails />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/confirmation' element={<ConfirmationPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
