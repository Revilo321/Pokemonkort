import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login')

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg'>
        <div className='flex justify-end'>
          <button onClick={onClose}>X</button>
        </div>
        <div className='flex justify-center space-x-4 mb-4'>
          <button
            className={`font-bold ${activeTab === 'login' ? 'underline' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`font-bold ${
              activeTab === 'register' ? 'underline' : ''
            }`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        {activeTab === 'login' ? (
          <LoginForm onClose={onClose} />
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  )
}
