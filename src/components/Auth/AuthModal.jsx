import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export const AuthModal = ({ isOpen, onClose, message }) => {
  const [activeTab, setActiveTab] = useState('login')

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white p-10 rounded-lg relative'>
        <div className='flex justify-end absolute top-2 right-3'>
          <button onClick={onClose}>x</button>
        </div>
        <div className='max-w-2xl pb-2'>
          <p>{message}</p>
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
