import { useDispatch } from 'react-redux'
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../features/cart/cartSlice'
import { useState } from 'react'
import { ConfirmationDialog } from '../ConfirmationDialog'

export const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.data.idDrink))
  }

  const handleDecrement = () => {
    if (item.quantity === 1) {
      setShowConfirmation(true)
    } else {
      dispatch(decrementQuantity(item.data.idDrink))
    }
  }

  const confirmDeletion = () => {
    dispatch(removeFromCart(item.data.idDrink))
    setShowConfirmation(false)
  }

  const cancelDeletion = () => {
    setShowConfirmation(false)
  }

  return (
    <div className='flex items-center p-2 hover:bg-gray-100'>
      <img
        src={item.data.strDrinkThumb}
        alt={item.data.strDrink}
        className='w-10 h-10 rounded-full'
      />
      <div className='ml-2 flex-grow'>
        <div className='text-sm font-medium'>{item.data.strDrink}</div>
        <div className='text-xs text-gray-600'>Qty: {item.quantity}</div>
      </div>
      <div className='flex items-center'>
        <button
          onClick={handleIncrement}
          className='px-2 py-1 text-xs font-semibold text-blue-600'
        >
          +
        </button>
        <button
          onClick={handleDecrement}
          className='px-2 py-1 text-xs font-semibold text-red-600'
        >
          -
        </button>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
          message='Are you sure you want to remove this item from the cart?'
        />
      )}
    </div>
  )
}
