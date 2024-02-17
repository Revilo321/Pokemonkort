import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { setCartItems } from '../../features/cart/cartSlice'

export const useLoadUserCart = (userId) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) return

      const cartRef = doc(db, 'carts', userId)
      const docSnap = await getDoc(cartRef)

      if (docSnap.exists()) {
        dispatch(setCartItems(docSnap.data().items))
      } else {
        console.log('No cart found for user', userId)
      }
    }

    loadCart()
  }, [userId, dispatch])
}

export default useLoadUserCart
