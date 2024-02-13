import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const CartDropdown = () => {
  const cartItems = useSelector((state) => state.cart.items)

  return (
    <div className='absolute right-0 w-48 bg-white text-black shadow-lg mt-2'>
      {Object.entries(cartItems).length === 0 ? (
        <div className='p-4'>Your cart is empty.</div>
      ) : (
        Object.entries(cartItems).map(([id, item]) => (
          <Link
            to={`/cocktail/${id}`}
            key={id}
            className='flex items-center p-2 hover:bg-gray-100'
          >
            <img
              src={item.data.strDrinkThumb}
              alt={item.data.strDrink}
              className='w-10 h-10 rounded-full'
            />
            <div className='ml-2'>
              <div className='text-sm font-medium'>{item.data.strDrink}</div>
              <div className='text-xs text-gray-600'>Qty: {item.quantity}</div>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
