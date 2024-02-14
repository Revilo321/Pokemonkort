import { useState } from 'react'
import { CartDropdown } from './CartDropdown'
import { CartIcon } from './CartIcon'

export const CartWrapper = () => {
  const [showDropdown, setShowDropdown] = useState()
  return (
    <>
      <div onClick={() => setShowDropdown(!showDropdown)}>
        <CartIcon />
      </div>
      {showDropdown && <CartDropdown setShowDropdown={setShowDropdown} />}
    </>
  )
}
