import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../BackButton'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../AuthProvider'
import { clearCart } from '../../features/cart/cartSlice'

export const CheckoutPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const { currentUser } = useContext(AuthContext)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const navigate = useNavigate()

  const getTotalPrice = () => {
    return Object.values(cartItems)
      .reduce(
        (total, item) => total + item.quantity * item.data.sellingPrice,
        0
      )
      .toFixed(2)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userUid = currentUser ? currentUser.uid : null
    if (!userUid) {
      console.error('User is not logged in')
      return
    }

    const order = {
      userUid,
      items: Object.values(cartItems).map((item) => ({
        idDrink: item.data.idDrink,
        strDrink: item.data.strDrink,
        strDrinkThumb: item.data.strDrinkThumb,
        priceToMake: item.data.priceToMake,
        quantity: item.quantity,
        sellingPrice: item.data.sellingPrice,
        totalPrice: item.quantity * item.data.sellingPrice,
      })),
      total: getTotalPrice(),
      createdAt: new Date(),
    }
    try {
      const docRef = await addDoc(collection(db, 'orders'), order)
      dispatch(clearCart())
      navigate('/confirmation', { state: { orderId: docRef.id, ...order } })
    } catch (error) {
      console.error('Error placing order: ', error)
    }
  }

  return (
    <div className='pt-52'>
      <div className='max-w-5xl px-5 mx-auto'>
        <BackButton />
      </div>
      <div className='max-w-5xl px-5 mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className=' px-6 md:col-span-2'>
          <h2 className='text-2xl font-semibold mb-4'>Review Your Order</h2>
          <div className='text-right font-bold mt-4'>
            Total: ${getTotalPrice()}
          </div>
          <div className='divide-y divide-gray-200'>
            {Object.values(cartItems).map((item) => (
              <div
                key={item.data.idDrink}
                className='flex justify-between items-center py-4'
              >
                <div className='flex items-center'>
                  <img
                    src={item.data.strDrinkThumb}
                    alt={item.data.strDrink}
                    className='h-20 w-20 object-cover rounded-md mr-4'
                  />
                  <div>
                    <div className='font-medium text-gray-900'>
                      {item.data.strDrink}
                    </div>
                    <div className='text-sm text-gray-600'>
                      Quantity: {item.quantity}
                    </div>
                  </div>
                </div>
                <div className='text-lg font-medium text-gray-900'>
                  ${(item.quantity * item.data.sellingPrice).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='md:col-span-1 bg-white px-6  rounded-lg'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <h2 className='text-xl font-semibold mb-4'>Payment Details</h2>
            <div>
              <label
                htmlFor='cardNumber'
                className='block text-sm font-medium text-gray-700'
              >
                Card Number
              </label>
              <input
                type='text'
                name='cardNumber'
                id='cardNumber'
                value={customerInfo.cardNumber}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>
            <div className='flex gap-4'>
              <div>
                <label
                  htmlFor='expiryDate'
                  className='block text-sm font-medium text-gray-700'
                >
                  Expiry Date
                </label>
                <input
                  type='text'
                  name='expiryDate'
                  id='expiryDate'
                  placeholder='MM/YY'
                  value={customerInfo.expiryDate}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
              <div>
                <label
                  htmlFor='cvv'
                  className='block text-sm font-medium text-gray-700'
                >
                  CVV
                </label>
                <input
                  type='text'
                  name='cvv'
                  id='cvv'
                  value={customerInfo.cvv}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
