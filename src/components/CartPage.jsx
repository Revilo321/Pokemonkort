import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { CartPageItemCard } from './CartPageItemCard'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AuthModal } from './Auth/AuthModal'
import { AuthContext } from '../AuthProvider'
import { BackButton } from './BackButton'

export const CartPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)

  const getTotalPrice = () => {
    return Object.values(cartItems)
      .reduce((total, item) => total + item.quantity * item.data.price, 0)
      .toFixed(2)
  }

  if (Object.keys(cartItems).length === 0) {
    return <div>Your cart is empty</div>
  }

  const handleCheckout = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true)
    } else {
      navigate('/checkout')
    }
  }

  return (
    <div className='min-h-screen bg-main pt-32'>
      <div className='pt-5'>
        <div className='max-w-5xl mx-auto px-5'>
          <BackButton />
        </div>
        <h1 className='mb-10 text-center text-2xl font-bold'>Cart Items</h1>
        <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
          <div className='rounded-lg md:w-2/3'>
            <div>
              {Object.values(cartItems).map((item, idx) => {
                return <CartPageItemCard key={idx} item={item} />
              })}
            </div>
          </div>
          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
            <div className='flex justify-between'>
              <p className='text-gray-700'>Shipping</p>
              <p className='text-gray-700'>$4.99</p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <p className='text-lg font-bold'>Total</p>
              <div className=''>
                <p className='mb-1 text-lg font-bold'>${getTotalPrice()}</p>
              </div>
            </div>
            <button
              onClick={() => handleCheckout()}
              className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'>
              Check out
            </button>
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              message={
                'You need to log in to be able to continue with your checkout, you can log in to an existing account or register as a new user'
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
