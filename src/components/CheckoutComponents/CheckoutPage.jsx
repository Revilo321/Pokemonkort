import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    email: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/confirmation')
  }
  return (
    <div className='max-w-7xl mx-auto my-10 py-32'>
      <div className='flex w-full'>
        <div className='w-full'>
          <h2 className='text-2xl font-semibold mb-4'>Review Your Order</h2>
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
        <div className='ml-5 w-1/2'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={customerInfo.name}
                onChange={handleChange}
                required
                className='mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Address
              </label>
              <input
                type='text'
                name='address'
                id='address'
                value={customerInfo.address}
                onChange={handleChange}
                required
                className='mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={customerInfo.email}
                onChange={handleChange}
                required
                className='mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>
            <button
              onClick={() =>
                navigate('/confirmation', { state: { cartItems } })
              }
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
