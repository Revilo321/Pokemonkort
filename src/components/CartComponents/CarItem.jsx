import { useDispatch } from 'react-redux'
import {
  decrementQuantityAsync,
  deleteFromCartAsync,
  incrementQuantityAsync,
} from '../../features/cart/cartSlice'
import { useState } from 'react'
import { ConfirmationDialog } from '../ConfirmationDialog'

export const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleIncrement = () => {
    dispatch(incrementQuantityAsync(item.data.id))
  }

  const handleDecrement = () => {
    if (item.quantity === 1) {
      setShowConfirmation(true)
    } else {
      dispatch(decrementQuantityAsync(item.data.id))
    }
  }

  const confirmDeletion = () => {
    dispatch(deleteFromCartAsync(item.data.id))
    setShowConfirmation(false)
  }

  const cancelDeletion = () => {
    setShowConfirmation(false)
  }

  return (
    <div className='flex items-center p-2 hover:bg-gray-100 container mx-auto'>
      <img
        src={item.data.image}
        alt={item.data.name}
        className='w-10 h-10 rounded-full'
      />
      <div className='ml-2 flex-grow'>
        <div className='text-sm font-medium'>{item.data.name}</div>
        <div className='text-xs text-gray-600'>Qty: {item.quantity}</div>
      </div>
      <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
        <div className='flex items-center border-gray-200'>
          <button
            onClick={() => handleDecrement(item.data.id)}
            className='cursor-pointer rounded-l bg-gray-200 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
          >
            -
          </button>
          <p className='px-3'>{item.quantity}</p>
          <button
            onClick={() => handleIncrement(item.data.id)}
            className='cursor-pointer rounded-r bg-gray-200 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
          >
            +
          </button>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          open={showConfirmation}
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
          message='Are you sure you want to remove this item from the cart?'
        />
      )}
    </div>
  )
}
