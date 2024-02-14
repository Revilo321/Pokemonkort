import { useSelector } from 'react-redux'
import { CartItem } from './CarItem'
import { useNavigate } from 'react-router-dom'

export const CartDropdown = ({ setShowDropdown }) => {
  const cartItems = useSelector((state) => state.cart.items)
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('/cart')
    setShowDropdown(false)
  }

  return (
    <div className='absolute -right-5 top-9 w-48 bg-white text-black shadow-lg mt-2'>
      {Object.entries(cartItems).length === 0 ? (
        <div className='p-4'>Your cart is empty.</div>
      ) : (
        <div className='py-4'>
          {Object.entries(cartItems).map(([id, item]) => (
            <CartItem key={id} item={item} />
          ))}
          <div className='px-2'>
            <button
              onClick={() => handleNavigation()}
              className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'
            >
              Go to cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
