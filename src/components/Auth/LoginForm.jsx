import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../features/cart/cartSlice'
import { mergeCarts } from '../../utils/mergeCarts'
import { AuthContext } from '../../AuthProvider'

export const LoginForm = ({ onClose }) => {
  const { currentUser } = useContext(AuthContext)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      await mergeCarts(auth.currentUser.uid, cartItems, dispatch)
      onClose()
      console.log('login success')
    } catch (error) {
      console.error('Login failed:', error.message)
    }
    console.log('Login submitted with:', email, password)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      // Clear the local cart state after logout
      dispatch(clearCart()) // Assuming clearCart is an action to reset the cart state
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
          />
        </div>
        {!currentUser && (
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Log In
          </button>
        )}
      </form>
      <button
        onClick={() => handleLogout()}
        className='w-full flex justify-center'
      >
        Log ud
      </button>
    </div>
  )
}
