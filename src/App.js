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
import { Toaster } from 'sonner'
import { DashboardPage } from './components/Dashboard/DashboardPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PokemonDetails } from './components/PokemonCards/PokemonDetails'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='w-full h-full'>
          <Toaster richColors />
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/card/:id' element={<PokemonDetails />} />
            <Route path='/cart' element={<CartPage />} />
            <Route
              path='/checkout'
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/confirmation'
              element={
                <ProtectedRoute>
                  <ConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
