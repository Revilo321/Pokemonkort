import { useSelector } from 'react-redux'
import { CartItem } from './CarItem'

export const CartDropdown = () => {
  const cartItems = useSelector((state) => state.cart.items)

  return (
    <div className='absolute right-0 w-48 bg-white text-black shadow-lg mt-2'>
      {Object.entries(cartItems).length === 0 ? (
        <div className='p-4'>Your cart is empty.</div>
      ) : (
        Object.entries(cartItems).map(([id, item]) => (
          <CartItem key={id} item={item} />
        ))
      )}
    </div>
  )
}
