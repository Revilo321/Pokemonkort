import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { toast } from 'sonner'

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(item))
    toast.success('Item was added to your cart!')
  }

  return (
    <button
      onClick={handleAddToCart}
      className='mt-4 px-4 py-2 bg-secondary rounded hover:bg-tertiary'>
      Add to Cart
    </button>
  )
}

export default AddToCartButton
