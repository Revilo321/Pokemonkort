import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const ConfirmationPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  return (
    <div className='pt-32 max-w-7xl mx-auto my-10'>
      <div
        className='text-center bg-green-100 border-l-4 border-green-500 text-green-700 p-4'
        role='alert'
      >
        <h1 className='text-2xl font-bold mb-4'>Thank you for your order!</h1>
        <p>Your cocktails are on their way.</p>
      </div>
      <div className='mt-6 px-5'>
        <h2 className='text-lg font-semibold text-center mb-4'>
          Order Summary
        </h2>
        <ul className='max-w-xl mx-auto divide-y divide-gray-200'>
          {state.items?.map((item) => (
            <li
              key={item.idDrink}
              className='flex justify-between items-center py-4'
            >
              <div className='flex items-center space-x-4'>
                <img
                  src={item.strDrinkThumb}
                  alt={item.strDrink}
                  className='h-16 w-16 object-cover rounded-full'
                />
                <div>
                  <h3 className='text-sm font-bold'>{item.strDrink}</h3>
                  <p className='text-xs text-gray-600'>
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <span className='text-sm font-semibold'>
                ${(item.quantity * item.sellingPrice).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='text-center mt-6'>
        <button
          onClick={() => navigate('/homepage')}
          className='inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Go to Homepage
        </button>
      </div>
    </div>
  )
}
