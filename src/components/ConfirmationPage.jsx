import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const ConfirmationPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const cartItems = state?.cartItems || []
  if (!cartItems) return <div>No items in cart..</div>

  return (
    <div className='max-w-md mx-auto my-10 text-center'>
      <h1 className='text-2xl font-bold mb-4'>Thank you for your order!</h1>
      <ul>
        {Object.values(cartItems).map((item) => (
          <li key={item.data.idDrink} className='flex justify-between my-2'>
            <span>{item.data.strDrink}</span>
            <span>
              {item.quantity} x ${item.data.sellingPrice.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <p>Your cocktails are on their way.</p>
      <button
        onClick={() => navigate('/')}
        className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
      >
        Go to Homepage
      </button>
    </div>
  )
}
