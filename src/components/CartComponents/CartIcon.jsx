import { useSelector } from 'react-redux'

export const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const totalItems = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <div className='cursor-pointer'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 14 14'
        height='20'
        width='20'
      >
        <g id='shopping-cart-1--shopping-cart-checkout'>
          <path
            id='Union'
            fill='#000'
            fill-rule='evenodd'
            d='M3.844 0.753a0.75 0.75 0 0 0 -0.747 -0.675H0.77a0.75 0.75 0 0 0 0 1.5h1.649l0.252 2.506c0 0.017 0 0.035 0.002 0.052l0.482 4.795a1.431 1.431 0 0 0 1.431 1.241h5.852a1.431 1.431 0 0 0 1.416 -0.973l0 -0.002 1.24 -3.724 0 -0.001a1.431 1.431 0 0 0 -0.2 -1.286 1.431 1.431 0 0 0 -1.216 -0.6h-7.55L3.844 0.753Zm7.58 12.07a1.178 1.178 0 1 0 -2.355 0 1.178 1.178 0 0 0 2.356 0Zm-6.323 -1.179a1.178 1.178 0 1 1 0 2.356 1.178 1.178 0 0 1 0 -2.356Z'
            clip-rule='evenodd'
            stroke-width='1'
          ></path>
        </g>
      </svg>
      <span className='absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full'>
        {totalItems}
      </span>
    </div>
  )
}
